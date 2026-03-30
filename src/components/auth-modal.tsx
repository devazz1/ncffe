"use client";

import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { requestOtp, verifyOtp } from "@/lib/api";
import { useAuthStore } from "@/lib/auth-store";
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

  const canSubmitVerify = useMemo(() => {
    if (!email || !code) return false;
    if (purpose === "register") return !!fullName && !!phone;
    return true;
  }, [email, code, fullName, phone, purpose]);

  const requestOtpMutation = useMutation({
    mutationFn: () => requestOtp({ email, purpose }),
    onSuccess: () => {
      setErrorMessage(null);
      setStep("verify");
    },
    onError: (err: unknown) => {
      setErrorMessage(err instanceof Error ? err.message : "Failed to request OTP");
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: () =>
      verifyOtp({
        email,
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
      setErrorMessage(err instanceof Error ? err.message : "Failed to verify OTP");
    },
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Authenticate</h2>
          <button onClick={onClose} className="rounded border border-zinc-300 px-2 py-1 text-sm">
            Close
          </button>
        </div>
        <div className="mb-3 flex gap-2">
          <button
            className={`rounded px-3 py-1 text-sm ${purpose === "login" ? "bg-zinc-900 text-white" : "border border-zinc-300"}`}
            onClick={() => {
              setPurpose("login");
              setStep("request");
            }}
          >
            Login
          </button>
          <button
            className={`rounded px-3 py-1 text-sm ${purpose === "register" ? "bg-zinc-900 text-white" : "border border-zinc-300"}`}
            onClick={() => {
              setPurpose("register");
              setStep("request");
            }}
          >
            Register
          </button>
        </div>

        {step === "request" ? (
          <div className="space-y-3">
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded border border-zinc-300 px-3 py-2"
            />
            <button
              className="w-full rounded bg-zinc-900 px-4 py-2 text-white disabled:opacity-50"
              disabled={!email || requestOtpMutation.isPending}
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
            {purpose === "register" && (
              <>
                <input
                  placeholder="Full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded border border-zinc-300 px-3 py-2"
                />
                <input
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded border border-zinc-300 px-3 py-2"
                />
              </>
            )}
            <button
              className="w-full rounded bg-zinc-900 px-4 py-2 text-white disabled:opacity-50"
              disabled={!canSubmitVerify || verifyOtpMutation.isPending}
              onClick={() => verifyOtpMutation.mutate()}
            >
              Verify OTP
            </button>
            <button
              className="w-full rounded border border-zinc-300 px-4 py-2"
              onClick={() => setStep("request")}
            >
              Back
            </button>
          </div>
        )}

        {errorMessage ? <p className="mt-3 text-sm text-red-600">{errorMessage}</p> : null}
      </div>
    </div>
  );
}
