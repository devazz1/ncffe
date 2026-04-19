"use client";

import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createDonation, createPaymentOrder } from "@/lib/api";
import { formatCurrencyINR, toNumber } from "@/lib/format";
import type { CampaignProduct } from "@/lib/types";
import { useRouter } from "next/navigation";
import { openRazorpayCheckout } from "@/lib/razorpay/open-checkout";
import {
  EMPTY_PRODUCT_UNITS,
  getUnitsForCampaign,
  useCampaignProductCartStore,
} from "@/stores/campaign-product-cart-store";

type DonationFormProps = {
  campaignName: string;
  campaignId: number;
  products: CampaignProduct[];
};

export function DonationForm({ campaignName, campaignId, products }: DonationFormProps) {
  const router = useRouter();
  const units = useCampaignProductCartStore(
    (s) => s.unitsByCampaign[campaignId] ?? EMPTY_PRODUCT_UNITS,
  );
  const removeProduct = useCampaignProductCartStore((s) => s.removeProduct);
  const clearCampaign = useCampaignProductCartStore((s) => s.clearCampaign);

  const [tab, setTab] = useState<"once" | "monthly">("once");
  const [amount, setAmount] = useState<number>(0);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [is80GRequested, setIs80GRequested] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isIndian, setIsIndian] = useState(true);
  const [pan, setPan] = useState("");
  const [address, setAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const productTotal = useMemo(() => {
    return products.reduce((sum, product) => {
      const qty = units[product.campaignProductId] ?? 0;
      return sum + qty * toNumber(product.unitPrice);
    }, 0);
  }, [products, units]);

  const total = productTotal + amount;

  const selectedProductsForSummary = useMemo(() => {
    return products.filter((p) => (units[p.campaignProductId] ?? 0) > 0);
  }, [products, units]);

  const createDonationMutation = useMutation({
    mutationFn: async () => {
      const cartUnits = getUnitsForCampaign(campaignId);
      const selectedProducts = Object.entries(cartUnits)
        .map(([id, quantity]) => ({
          campaignProductId: Number(id),
          quantity,
        }))
        .filter((item) => item.quantity > 0);

      const donation = await createDonation({
        campaignId,
        amount,
        products: selectedProducts.length > 0 ? selectedProducts : undefined,
        currency: "INR",
        isMonthly: tab === "monthly",
        displayPublicly: !isAnonymous,
        fullName,
        email,
        phone,
        isIndian,
        is80GRequested,
        pan: is80GRequested ? pan : undefined,
        address: is80GRequested ? address : undefined,
      });

      const order = await createPaymentOrder(donation.data.donationId);

      return {
        donation,
        order,
      };
    },
    onSuccess: async ({ donation, order }) => {
      const receiptNumber = donation.data.receiptNumber;
      const statusUrl = `/donations/status?receipt=${receiptNumber}`;

      setIsCheckoutOpen(true);
      setErrorMessage(null);

      try {
        await openRazorpayCheckout({
          keyId: order.data.keyId,
          gatewayOrderId: order.data.gatewayOrderId,
          amountMinorUnits: order.data.amount,
          currency: order.data.currency,
          prefill: {
            name: fullName,
            email,
            contact: phone,
          },
          description: `${campaignName} Donation`,
          onClosed: () => {
            setIsCheckoutOpen(false);
            clearCampaign(campaignId);
            router.push(statusUrl);
          },
          onError: (e) => {
            setIsCheckoutOpen(false);
            setErrorMessage(e.message || "Payment UI failed to open.");
          },
        });
      } catch (e) {
        setIsCheckoutOpen(false);
        setErrorMessage(e instanceof Error ? e.message : "Payment UI failed to open.");
      }
    },
    onError: (err: unknown) => {
      setErrorMessage(err instanceof Error ? err.message : "Donation failed");
    },
  });

  function validateBeforeSubmit() {
    const hasProducts = Object.values(units).some((q) => q > 0);
    if (!hasProducts && amount <= 0) {
      setErrorMessage("Please select products or enter a custom amount.");
      return false;
    }
    if (total < 300) {
      setErrorMessage("Total donation amount must be at least INR 300.");
      return false;
    }
    if (!fullName || !email || !phone) {
      setErrorMessage("Full name, email, and phone are required.");
      return false;
    }
    if (is80GRequested && (!pan || !address)) {
      setErrorMessage("PAN and address are required for 80G.");
      return false;
    }
    setErrorMessage(null);
    return true;
  }

  return (
    <section className="rounded-lg border border-zinc-200 bg-white p-4">
      <h3 className="text-lg font-semibold">Donate</h3>
      <p className="text-sm text-zinc-800">Choose products and/or add custom amount.</p>

      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => setTab("once")}
          className={`rounded px-3 py-1 text-sm ${tab === "once" ? "bg-zinc-900 text-white" : "border border-zinc-300"}`}
        >
          Donate once
        </button>
        <button
          type="button"
          onClick={() => setTab("monthly")}
          className="rounded border border-zinc-300 px-3 py-1 text-sm opacity-60"
          title="Monthly flow not implemented yet"
        >
          Donate monthly
        </button>
      </div>

      <div className="mt-4 space-y-2">
        <label className="block text-sm font-medium">Donation Amount</label>
        <input
          type="number"
          min={0}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value || 0))}
          className="w-full rounded border border-zinc-300 px-3 py-2"
        />
      </div>

      {selectedProductsForSummary.length > 0 && (
        <div className="mt-4 space-y-3">
          <p className="text-sm font-medium text-zinc-900">Selected products</p>
          {selectedProductsForSummary.map((product) => {
            const qty = units[product.campaignProductId] ?? 0;
            const lineTotal = qty * toNumber(product.unitPrice);
            return (
              <div
                key={product.campaignProductId}
                className="rounded border border-zinc-200 p-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-xs text-zinc-600">
                      {formatCurrencyINR(toNumber(product.unitPrice))} × {qty} ={" "}
                      {formatCurrencyINR(lineTotal)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      removeProduct(campaignId, product.campaignProductId)
                    }
                    className="shrink-0 text-sm text-red-600 underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-4 space-y-2">
        <label className="block text-sm font-medium">Your Details</label>
        <div className="grid gap-2">
          <input
            placeholder="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded border border-zinc-300 px-3 py-2"
          />
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border border-zinc-300 px-3 py-2"
          />
          <input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded border border-zinc-300 px-3 py-2"
          />
        </div>
        {is80GRequested && (
          <div className="grid gap-2">
            <input
              placeholder="PAN"
              value={pan}
              onChange={(e) => setPan(e.target.value)}
              className="w-full rounded border border-zinc-300 px-3 py-2"
            />
            <textarea
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full rounded border border-zinc-300 px-3 py-2"
            />
          </div>
        )}
      </div>

      <label className="mt-3 flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={is80GRequested}
          onChange={(e) => setIs80GRequested(e.target.checked)}
        />
        Request 80G
      </label>

      <label className="mt-3 flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={isAnonymous}
          onChange={(e) => setIsAnonymous(e.target.checked)}
        />
        Make my donation Anonymous
      </label>

      <fieldset className="mt-3 space-y-2 border-0 p-0">
        <legend className="sr-only">Donor residency</legend>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="radio"
            name="isIndian"
            checked={isIndian}
            onChange={() => setIsIndian(true)}
          />
          Indian Individual
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="radio"
            name="isIndian"
            checked={!isIndian}
            onChange={() => setIsIndian(false)}
          />
          Not an Indian Individual
        </label>
      </fieldset>

      <div className="mt-4 rounded border border-zinc-200 bg-zinc-50 p-3">
        <p className="text-sm text-zinc-900">Product total: {formatCurrencyINR(productTotal)}</p>
        <p className="font-semibold">Total: {formatCurrencyINR(total)}</p>
        <p className="text-xs text-zinc-800">Minimum total: INR 300</p>
      </div>

      <button
        type="button"
        className="mt-4 w-full rounded bg-zinc-900 px-4 py-2 text-white disabled:opacity-50"
        disabled={createDonationMutation.isPending || isCheckoutOpen}
        onClick={() => {
          if (validateBeforeSubmit()) {
            createDonationMutation.reset(); // clear previous error state
            createDonationMutation.mutate();
          }
        }}
      >
        {isCheckoutOpen ? "Opening checkout..." : "Proceed to checkout"}
      </button>

      {errorMessage ? <p className="mt-3 text-sm text-red-600">{errorMessage}</p> : null}
    </section>
  );
}
