export {};

declare global {
  type RazorpayCheckoutOptions = {
    key: string;
    order_id: string;
    amount: number;
    currency: string;
    name?: string;
    description?: string;
    image?: string;
    theme?: {
      color?: string;
    };
    prefill?: {
      name?: string;
      email?: string;
      contact?: string;
    };
    handler?: (response: unknown) => void;
    modal?: {
      ondismiss?: () => void;
    };
  };

  type RazorpayCheckoutInstance = {
    open: () => void;
    on?: (eventName: string, callback: (...args: unknown[]) => void) => void;
  };

  interface Window {
    Razorpay?: new (options: RazorpayCheckoutOptions) => RazorpayCheckoutInstance;
  }
}

