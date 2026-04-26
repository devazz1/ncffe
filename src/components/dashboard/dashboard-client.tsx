"use client";

import { useState } from "react";
import { Check, User, UserPen, X } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCurrentUser, updateCurrentUser } from "@/lib/api";
import { useAuthStore } from "@/lib/auth-store";
import { isValidNameFormat, normalizeName } from "@/lib/name";
import { isValidPanFormat, normalizePan } from "@/lib/pan";
import { formatPhoneForApi, isValidPhoneFormat } from "@/lib/phone";

type EditableField = "fullName" | "phone" | "pan" | "address";
type ProfileField =
  | { key: EditableField; label: string; value: string; canEdit: true }
  | { key: "email"; label: string; value: string; canEdit: false };

export function DashboardClient() {
  const token = useAuthStore((s) => s.accessToken);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<EditableField | null>(null);
  const [draftValues, setDraftValues] = useState<Record<EditableField, string>>({
    fullName: "",
    phone: "",
    pan: "",
    address: "",
  });

  const profileQuery = useQuery({
    queryKey: ["users", "me"],
    queryFn: getCurrentUser,
    enabled: !!token,
  });

  const updateMutation = useMutation({
    mutationFn: updateCurrentUser,
    onError: (err: unknown) => {
      setErrorMessage(err instanceof Error ? err.message : "Failed to update profile");
    },
  });

  if (!token) return null;

  if (profileQuery.isLoading) {
    return <p className="mx-auto w-full max-w-3xl">Loading profile...</p>;
  }

  if (!profileQuery.data?.data) {
    return <p className="mx-auto w-full max-w-3xl">Unable to load profile.</p>;
  }

  const profile = profileQuery.data.data;
  const fieldValues: Record<EditableField, string> = {
    fullName: profile.fullName ?? "",
    phone: profile.phone ?? "",
    pan: profile.pan ?? "",
    address: profile.address ?? "",
  };
  const profileFields: ProfileField[] = [
    { key: "fullName", label: "Name", value: fieldValues.fullName, canEdit: true },
    { key: "email", label: "Email Id", value: profile.email, canEdit: false },
    { key: "phone", label: "Mobile number", value: fieldValues.phone, canEdit: true },
    { key: "pan", label: "PAN", value: fieldValues.pan, canEdit: true },
    { key: "address", label: "Address", value: fieldValues.address, canEdit: true },
  ];

  const handleStartEdit = (field: EditableField) => {
    setErrorMessage(null);
    setEditingField(field);
    setDraftValues((prev) => ({ ...prev, [field]: fieldValues[field] }));
  };

  const handleCancelEdit = () => {
    setErrorMessage(null);
    setEditingField(null);
  };

  const handleSaveField = (field: EditableField) => {
    const nextValue = draftValues[field].trim();

    if (field === "fullName" && nextValue && !isValidNameFormat(nextValue)) {
      setErrorMessage("Please enter a valid full name.");
      return;
    }
    if (field === "phone" && nextValue && !isValidPhoneFormat(nextValue)) {
      setErrorMessage("Please enter a valid phone number.");
      return;
    }
    if (field === "pan" && nextValue && !isValidPanFormat(nextValue)) {
      setErrorMessage("Please enter a valid PAN (e.g. ABCDE1234F).");
      return;
    }

    const payload: Partial<typeof profile> = {};
    if (field === "fullName") payload.fullName = normalizeName(nextValue);
    if (field === "phone") payload.phone = formatPhoneForApi(nextValue);
    if (field === "pan") payload.pan = normalizePan(nextValue);
    if (field === "address") payload.address = nextValue;

    setErrorMessage(null);
    updateMutation.mutate(payload, {
      onSuccess: () => {
        setEditingField(null);
        profileQuery.refetch();
      },
    });
  };

  return (
    <section className="mx-auto w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-6">
      <div className="mb-6 flex h-26 w-26 items-center justify-center rounded-full bg-zinc-100 text-zinc-500">
        <User className="h-12 w-12" />
      </div>

      <div className="grid gap-5">
        {profileFields.map((field) => {
          if (!field.canEdit) {
            return (
              <div
                key={field.key}
                className="grid gap-1 border-b border-zinc-100 pb-4 last:border-b-0 last:pb-0"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-wide text-zinc-500">{field.label}</p>
                    <p className="mt-1 wrap-break-word text-base text-zinc-900">
                      {field.value || "-"}
                    </p>
                  </div>
                </div>
              </div>
            );
          }

          const isEditing = editingField === field.key;

          return (
            <div
              key={field.key}
              className="grid gap-1 border-b border-zinc-100 pb-4 last:border-b-0 last:pb-0"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-wide text-zinc-500">{field.label}</p>
                  {!isEditing ? (
                    <p className="mt-1 wrap-break-word text-base text-zinc-900">
                      {field.value || "-"}
                    </p>
                  ) : field.key === "address" ? (
                    <textarea
                      value={draftValues.address}
                      onChange={(e) =>
                        setDraftValues((prev) => ({ ...prev, address: e.target.value }))
                      }
                      className="mt-2 min-h-20 w-full rounded border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none"
                      placeholder="Enter address"
                    />
                  ) : (
                    <input
                      value={draftValues[field.key]}
                      onChange={(e) => {
                        const nextValue =
                          field.key === "pan" ? normalizePan(e.target.value) : e.target.value;
                        setDraftValues((prev) => ({ ...prev, [field.key]: nextValue }));
                      }}
                      type={field.key === "phone" ? "tel" : "text"}
                      maxLength={field.key === "pan" ? 10 : undefined}
                      autoCapitalize={field.key === "pan" ? "characters" : undefined}
                      className="mt-2 w-full rounded border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none"
                    />
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {!isEditing ? (
                    <button
                      type="button"
                      onClick={() => handleStartEdit(field.key)}
                      className="rounded p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700"
                      aria-label={`Edit ${field.label}`}
                    >
                      <UserPen className="h-4 w-4" />
                    </button>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => handleSaveField(field.key)}
                        disabled={updateMutation.isPending}
                        className="rounded p-2 text-emerald-600 hover:bg-emerald-50 disabled:opacity-50"
                        aria-label={`Save ${field.label}`}
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        disabled={updateMutation.isPending}
                        className="rounded p-2 text-zinc-500 hover:bg-zinc-100 disabled:opacity-50"
                        aria-label={`Cancel editing ${field.label}`}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {errorMessage ? <p className="mt-3 text-sm text-red-600">{errorMessage}</p> : null}
    </section>
  );
}
