import { loadRazorpayCheckoutScript } from "@/lib/razorpay/load-script";

type Prefill = {
  name: string;
  email: string;
  contact: string;
};

type OpenCheckoutParams = {
  keyId: string;
  gatewayOrderId: string;
  amountMinorUnits: number;
  currency: string;
  prefill: Prefill;
  onClosed: () => void;
  onError?: (error: Error) => void;
};

export async function openRazorpayCheckout({
  keyId,
  gatewayOrderId,
  amountMinorUnits,
  currency,
  prefill,
  onClosed,
  onError,
}: OpenCheckoutParams) {
  await loadRazorpayCheckoutScript();

  if (!window.Razorpay) {
    const err = new Error("Razorpay checkout is not available after script load.");
    onError?.(err);
    throw err;
  }

  let navigated = false;
  const navigateOnce = () => {
    if (navigated) return;
    navigated = true;
    onClosed();
  };

  const options: RazorpayCheckoutOptions = {
    key: keyId,
    order_id: gatewayOrderId,
    amount: amountMinorUnits,
    currency,
    name: "NGO Platform",
    prefill,
    handler: () => {
      // Do not use handler result for routing decision; route always via status page.
      navigateOnce();
    },
    modal: {
      ondismiss: () => {
        // User closed popup/dismissed.
        navigateOnce();
      },
    },
  };

  const rzp = new window.Razorpay(options);

  // Best-effort: for explicit failure events, still navigate to status.
  try {
    rzp.on?.("payment.failed", () => {
      navigateOnce();
    });
  } catch {
    // Ignore: older Razorpay builds may not support .on
  }

  rzp.open();
}

