"use client";

import { useMemo, useState } from "react";
import { Trash2 } from "lucide-react";
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

const DONATION_AMOUNT_PRESETS = [300, 500, 1000, 1500] as const;

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
    <section id="donation" className="rounded-lg border border-zinc-200 bg-white p-4 self-start">
      <h3 className="text-lg font-semibold text-center">Donation</h3>

      <div className="mt-3 flex justify-center">
        <button
          type="button"
          onClick={() => setTab("once")}
          className={`rounded-l px-3 py-1 text-sm ${tab === "once" ? "bg-cta-gradient text-white" : "border border-zinc-300"}`}
        >
          One Time
        </button>
        <button
          type="button"
          onClick={() => setTab("monthly")}
          className="rounded-r border border-zinc-300 px-3 py-1 text-sm opacity-60"
          title="Monthly flow not implemented yet"
        >
          Monthly
        </button>
      </div>

      <div className="mt-4 grid gap-2 md:grid-cols-2 md:items-start md:gap-4">
        {/* section for donation amount and products */}
        <div className="flex flex-col gap-4 h-full">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Donation Amount</label>
            <input
              type="number"
              min={0}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value || 0))}
              className="w-full rounded border border-zinc-300 px-3 py-2"
            />
            <div className="flex flex-wrap gap-2 pt-1">
              {DONATION_AMOUNT_PRESETS.map((preset) => {
                const isSelected = amount === preset;
                return (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setAmount(preset)}
                    className={`rounded-lg border px-3 py-1.5 text-sm transition ${
                      isSelected
                        ? "border-zinc-900 bg-zinc-900 text-white"
                        : "border-zinc-300 bg-surface-warm text-zinc-800 hover:border-zinc-400"
                    }`}
                  >
                    ₹{preset}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 h-full">
            {selectedProductsForSummary.length > 0 && (
              <p className="text-sm font-semibold text-zinc-900">Product Added</p>
            )}

            {selectedProductsForSummary.length === 0 ? (
              <div className="mt-3 flex min-h-20 items-center justify-center rounded-lg bg-zinc-50">
                <p className="text-sm text-zinc-600">No Product Added yet</p>
              </div>
            ) : (
              <ul className="mt-3 divide-y divide-zinc-200">
                {selectedProductsForSummary.map((product) => {
                  const qty = units[product.campaignProductId] ?? 0;
                  const lineTotal = qty * toNumber(product.unitPrice);
                  const unitPrice = toNumber(product.unitPrice);
                  return (
                    <li key={product.campaignProductId} className="flex gap-3 py-3 first:pt-0">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-zinc-900">{product.name}</p>
                        <p className="mt-0.5 text-xs text-zinc-600">
                          {formatCurrencyINR(unitPrice)} × {qty}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-start gap-3">
                        <span className="text-sm font-medium tabular-nums text-zinc-900">
                          {formatCurrencyINR(lineTotal)}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            removeProduct(campaignId, product.campaignProductId)
                          }
                          className="rounded p-1 text-zinc-500 transition hover:bg-zinc-200 hover:text-red-600"
                          aria-label={`Remove ${product.name}`}
                        >
                          <Trash2 size={18} className="shrink-0" aria-hidden />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
            {total > 0 && (
              <div className="mt-4 space-y-2 border-t border-zinc-300 pt-3">
                <div className="flex justify-between text-sm text-zinc-900">
                  <span>Product total</span>
                  <span className="tabular-nums">{formatCurrencyINR(productTotal)}</span>
                </div>
                <div className="flex justify-between font-semibold text-zinc-900">
                  <span>Total</span>
                  <span className="tabular-nums">{formatCurrencyINR(total)}</span>
                </div>
                <p className="text-xs text-zinc-600">Minimum total: INR 300</p>
              </div>
            )}
          </div>
        </div>

        {/* section 2 for donor details */}
        <div className="flex flex-col gap-3">
          <div className="space-y-2">
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

          <fieldset className="space-y-2 border-0 p-0">
            <legend className="text-sm font-medium mb-1">Donor residency</legend>
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

          <div className="space-y-3">
            <p className="text-sm font-medium text-zinc-900">Do you want 80G Tax Certificate</p>
            <div className="inline-flex gap-2 rounded-lg bg-[#FFECDC] p-1">
              <button
                type="button"
                aria-pressed={!is80GRequested}
                onClick={() => setIs80GRequested(false)}
                className={`min-w-14.5 rounded-lg px-4 py-2 text-sm font-medium transition ${
                  !is80GRequested
                    ? "bg-white text-zinc-900 shadow-sm"
                    : "bg-transparent text-zinc-700 hover:bg-white/50"
                }`}
              >
                NO
              </button>
              <button
                type="button"
                aria-pressed={is80GRequested}
                onClick={() => setIs80GRequested(true)}
                className={`min-w-14.5 rounded-lg px-4 py-2 text-sm font-medium transition ${
                  is80GRequested
                    ? "bg-white text-zinc-900 shadow-sm"
                    : "bg-transparent text-zinc-700 hover:bg-white/50"
                }`}
              >
                YES
              </button>
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
            />
            <span className="text-sm text-zinc-600">Make my donation Anonymous</span>
          </label>

        </div>
      </div>
      <button
        type="button"
        className="mt-4 w-full rounded bg-cta-gradient px-4 py-2 text-white disabled:opacity-50"
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

      {errorMessage ? <p className="text-sm text-red-600">{errorMessage}</p> : null}
    </section>
  );
}
