import { loadRazorpayCheckoutScript } from "@/lib/razorpay/load-script";
import { PLATFORM_CONFIG } from "@/lib/platform-config";

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
  description: string;
  prefill: Prefill;
  onClosed: () => void;
  onError?: (error: Error) => void;
};

export async function openRazorpayCheckout({
  keyId,
  gatewayOrderId,
  amountMinorUnits,
  currency,
  description,
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
    name: PLATFORM_CONFIG.organization.name || "Nand Care Foundation",
    description: description || "Nand Care Foundation Donation",
    image: PLATFORM_CONFIG.organization.logoPath || "/ncf_logo_nobg.png",
    theme: {
      color: PLATFORM_CONFIG.brandColors.salmonPink || "#FF847C",
    },
    prefill,
    handler: () => {
      // Ignoring handler payload because we are not using it for routing decision.
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

