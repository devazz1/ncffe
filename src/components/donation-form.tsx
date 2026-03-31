"use client";

import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createDonation, createPaymentOrder } from "@/lib/api";
import { formatCurrencyINR, toNumber } from "@/lib/format";
import type { CampaignProduct } from "@/lib/types";
import { useRouter } from "next/navigation";
import { openRazorpayCheckout } from "@/lib/razorpay/open-checkout";

type DonationFormProps = {
  campaignName: string;
  campaignId: number;
  products: CampaignProduct[];
};

type ProductUnitMap = Record<number, number>;

export function DonationForm({ campaignName, campaignId, products }: DonationFormProps) {
  const router = useRouter();
  const [tab, setTab] = useState<"once" | "monthly">("once");
  const [amount, setAmount] = useState<number>(0);
  const [units, setUnits] = useState<ProductUnitMap>({});
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [is80GRequested, setIs80GRequested] = useState(false);
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

  const createDonationMutation = useMutation({
    mutationFn: async () => {
      const selectedProducts = Object.entries(units)
        .map(([campaignProductId, quantity]) => ({
          campaignProductId: Number(campaignProductId),
          quantity,
        }))
        .filter((item) => item.quantity > 0);

      const donation = await createDonation({
        campaignId,
        amount,
        products: selectedProducts.length > 0 ? selectedProducts : undefined,
        currency: "INR",
        isMonthly: tab === "monthly",
        displayPublicly: false,
        fullName,
        email,
        phone,
        isIndian: true,
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

  function changeQty(productId: number, delta: number) {
    setUnits((prev) => {
      const current = prev[productId] ?? 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [productId]: next };
    });
  }

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
          onClick={() => setTab("once")}
          className={`rounded px-3 py-1 text-sm ${tab === "once" ? "bg-zinc-900 text-white" : "border border-zinc-300"}`}
        >
          Donate once
        </button>
        <button
          onClick={() => setTab("monthly")}
          className="rounded border border-zinc-300 px-3 py-1 text-sm opacity-60"
          title="Monthly flow not implemented yet"
        >
          Donate monthly
        </button>
      </div>

      <div className="mt-4 space-y-3">
        {products.map((product) => {
          const qty = units[product.campaignProductId] ?? 0;
          return (
            <div
              key={product.campaignProductId}
              className="rounded border border-zinc-200 p-3"
            >
              <div className="flex items-center justify-between">
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-zinc-800">
                  {formatCurrencyINR(toNumber(product.unitPrice))}
                </p>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <button
                  onClick={() => changeQty(product.campaignProductId, -1)}
                  className="rounded border border-zinc-300 px-2"
                >
                  -
                </button>
                <span className="w-8 text-center">{qty}</span>
                <button
                  onClick={() => changeQty(product.campaignProductId, 1)}
                  className="rounded border border-zinc-300 px-2"
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 space-y-2">
        <label className="block text-sm font-medium">Additional amount (INR)</label>
        <input
          type="number"
          min={0}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value || 0))}
          className="w-full rounded border border-zinc-300 px-3 py-2"
        />
      </div>

      <div className="mt-4 grid gap-2">
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

      <label className="mt-3 flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={is80GRequested}
          onChange={(e) => setIs80GRequested(e.target.checked)}
        />
        Request 80G
      </label>

      {is80GRequested ? (
        <div className="mt-3 grid gap-2">
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
      ) : null}

      <div className="mt-4 rounded border border-zinc-200 bg-zinc-50 p-3">
        <p className="text-sm text-zinc-900">Product total: {formatCurrencyINR(productTotal)}</p>
        <p className="font-semibold">Total: {formatCurrencyINR(total)}</p>
        <p className="text-xs text-zinc-800">Minimum total: INR 300</p>
      </div>

      <button
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
