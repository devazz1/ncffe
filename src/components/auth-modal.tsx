"use client";

import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { requestOtp, verifyOtp } from "@/lib/api";
import { getApiErrorMessage } from "@/lib/api/error-message";
import { useAuthStore } from "@/lib/auth-store";
import { isValidEmailFormat, normalizeEmail } from "@/lib/email";
import type { AuthPurpose } from "@/lib/types";

type AuthModalProps = {
  open: boolean;
  initialPurpose?: "login" | "register";
  onClose: () => void;
  onSuccess?: () => void;
};

export function AuthModal({
  open,
  initialPurpose = "login",
  onClose,
  onSuccess,
}: AuthModalProps) {
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const [purpose, setPurpose] = useState<AuthPurpose>(initialPurpose);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState<"request" | "verify">("request");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isEmailValid = useMemo(() => isValidEmailFormat(email), [email]);
  const canSubmitVerify = useMemo(() => isEmailValid && !!code, [isEmailValid, code]);

  const canRequestOtp = useMemo(() => {
    if (!isEmailValid) return false;
    if (purpose === "register") return !!fullName && !!phone;
    return true;
  }, [isEmailValid, purpose, fullName, phone]);

  const requestOtpMutation = useMutation({
    mutationFn: () => requestOtp({ email: normalizeEmail(email), purpose }),
    onSuccess: () => {
      setErrorMessage(null);
      setStep("verify");
    },
    onError: (err: unknown) => {
      setErrorMessage(getApiErrorMessage(err, "Failed to request OTP"));
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: () =>
      verifyOtp({
        email: normalizeEmail(email),
        purpose,
        code,
        fullName: purpose === "register" ? fullName : undefined,
        phone: purpose === "register" ? phone : undefined,
      }),
    onSuccess: (response) => {
      setErrorMessage(null);
      setAccessToken(response.data.accessToken);
      onClose();
      onSuccess?.();
    },
    onError: (err: unknown) => {
      setErrorMessage(getApiErrorMessage(err, "Failed to verify OTP"));
    },
  });

  if (!open) return null;

  const modalTitle =
    step === "verify" ? "OTP" : purpose === "login" ? "Login" : "Register";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-5 shadow-lg">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{modalTitle}</h2>
          <button type="button" onClick={onClose} aria-label="Close"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-zinc-300 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
          >
            <X className="h-4 w-4" strokeWidth={2} aria-hidden />
          </button>
        </div>
        <p className="mb-4 text-sm leading-relaxed text-zinc-600">
          {step === "verify" ? (
            <>
              Enter your 6 digit One time password received on email{" "}
              <span className="break-all font-medium text-zinc-800">{email}</span>{" "}
              <button
                type="button"
                className="cursor-pointer font-medium underline decoration-cta-from underline-offset-2 transition-opacity hover:opacity-90"
                onClick={() => setStep("request")}
              >
                <span className="bg-cta-gradient bg-clip-text text-transparent">
                  Edit
                </span>
              </button>
            </>
          ) : purpose === "login" ? (
            "Enter your Registered Email to login"
          ) : (
            "Fill out the details to register"
          )}
        </p>
        {step === "request" ? (
          <div className="space-y-3">
            <input
              type="email"
              placeholder="Email id*"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded border border-zinc-300 px-3 py-2"
            />
            {!!email && !isEmailValid ? (
              <p className="text-sm text-red-600">Please enter a valid email address.</p>
            ) : null}
            {purpose === "register" && (
              <>
                <input
                  placeholder="Full name *"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded border border-zinc-300 px-3 py-2"
                />
                <input
                  placeholder="Mobile Number *"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded border border-zinc-300 px-3 py-2"
                />
              </>
            )}
            <button
              className="w-full rounded bg-cta-gradient px-4 py-2 text-white disabled:opacity-50"
              disabled={!canRequestOtp || requestOtpMutation.isPending}
              onClick={() => requestOtpMutation.mutate()}
            >
              Request OTP
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <input
              placeholder="OTP code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full rounded border border-zinc-300 px-3 py-2"
            />
            <button
              className="w-full rounded bg-cta-gradient px-4 py-2 text-white disabled:opacity-50"
              disabled={!canSubmitVerify || verifyOtpMutation.isPending}
              onClick={() => verifyOtpMutation.mutate()}
            >
              Verify OTP
            </button>
          </div>
        )}

        {errorMessage ? <p className="mt-3 text-sm text-red-600">{errorMessage}</p> : null}

        <p className="mt-4 text-center text-sm text-zinc-600">
          {purpose === "login" ? (
            <>
              Don&apos;t have an account?{" "}
              <button
                type="button"
                className="font-medium text-zinc-900 underline decoration-cta-from underline-offset-2 hover:text-zinc-700 cursor-pointer"
                onClick={() => {
                  setPurpose("register");
                  setStep("request");
                }}
              >
                <span className="bg-cta-gradient bg-clip-text text-transparent">
                  Registe
                </span>
              </button>
            </>
          ) : (
            <>
              Do you have an account?{" "}
              <button
                type="button"
                className="cursor-pointer font-medium underline decoration-cta-from underline-offset-2 transition-opacity hover:opacity-90"
                onClick={() => {
                  setPurpose("login");
                  setStep("request");
                }}
              >
                <span className="bg-cta-gradient bg-clip-text text-transparent">
                  Login
                </span>
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
