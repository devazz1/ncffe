"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FolderDown } from "lucide-react";
import { download80GCertificate, getMyDonations } from "@/lib/api";
import { useAuthStore } from "@/lib/auth-store";

const PAGE_SIZE = 20;

function formatMoney(amount: string, currency: string) {
  const n = Number(amount);
  if (!Number.isFinite(n)) return amount;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency || "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(n);
}

function formatDonationDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(d);
}

function triggerBlobDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function DashboardDonationsTable() {
  const token = useAuthStore((s) => s.accessToken);
  const [page, setPage] = useState(1);
  const [downloadingId, setDownloadingId] = useState<number | null>(null);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const donationsQuery = useQuery({
    queryKey: ["users", "me", "donations", page, PAGE_SIZE],
    queryFn: () => getMyDonations(page, PAGE_SIZE),
    enabled: !!token,
  });

  if (!token) return null;

  const handleDownload = async (donationId: number) => {
    setDownloadError(null);
    setDownloadingId(donationId);
    try {
      const { blob, filename } = await download80GCertificate(donationId);
      triggerBlobDownload(blob, filename);
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "Could not download certificate.";
      setDownloadError(message);
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <section className="rounded-lg border border-zinc-200 bg-white p-5">
      <h2 className="text-lg font-semibold text-zinc-900">Your donations</h2>
      <p className="mt-1 text-sm text-zinc-600">
        Successful donations for your account, newest first.
      </p>

      {downloadError ? (
        <p className="mt-3 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          {downloadError}
        </p>
      ) : null}

      {donationsQuery.isLoading ? (
        <p className="mt-4 text-sm text-zinc-700">Loading donations…</p>
      ) : donationsQuery.isError || !donationsQuery.data?.data ? (
        <p className="mt-4 text-sm text-red-700">
          Unable to load donations right now. Please try again shortly.
        </p>
      ) : donationsQuery.data.data.items.length === 0 ? (
        <p className="mt-4 text-sm text-zinc-700">
          You do not have any successful donations yet.
        </p>
      ) : (
        <>
          <div className="mt-4 overflow-x-auto rounded border border-zinc-100">
            <table className="w-full min-w-130 text-left text-sm">
              <thead className="border-b border-zinc-200 bg-zinc-50 text-zinc-700">
                <tr>
                  <th className="px-3 py-2 font-medium">Date</th>
                  <th className="px-3 py-2 font-medium">Campaign</th>
                  <th className="px-3 py-2 font-medium">Amount donated</th>
                  <th className="px-3 py-2 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {donationsQuery.data.data.items.map((row) => (
                  <tr key={row.donationId} className="bg-white">
                    <td className="whitespace-nowrap px-3 py-2.5 text-zinc-800">
                      {formatDonationDate(row.updatedAt)}
                    </td>
                    <td className="px-3 py-2.5 text-zinc-800">{row.campaign.name}</td>
                    <td className="whitespace-nowrap px-3 py-2.5 text-zinc-800">
                      {formatMoney(row.amount, row.currency)}
                    </td>
                    <td className="px-3 py-2.5">
                      {row.is80GRequested ? (
                        <button
                          type="button"
                          className="inline-flex items-center gap-2 rounded px-2 py-1 text-sm font-medium hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60"
                          disabled={downloadingId === row.donationId}
                          onClick={() => void handleDownload(row.donationId)}
                        >
                          {downloadingId === row.donationId
                            ? "Downloading..."
                            : (
                                <>
                                  <FolderDown
                                    size={18}
                                    className="shrink-0 text-orange-500"
                                    aria-hidden="true"
                                  />
                                  <span className="text-red-600">Download</span>
                                  <span className="text-orange-500">80G</span>
                                </>
                              )}
                        </button>
                      ) : (
                        <span className="text-zinc-400">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {donationsQuery.data.data.meta.totalPages > 1 ? (
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-100 pt-4 text-sm text-zinc-700">
              <p>
                Page {donationsQuery.data.data.meta.page} of{" "}
                {donationsQuery.data.data.meta.totalPages} (
                {donationsQuery.data.data.meta.total} total)
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="rounded border border-zinc-300 bg-white px-3 py-1.5 text-sm hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={donationsQuery.data.data.meta.page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="rounded border border-zinc-300 bg-white px-3 py-1.5 text-sm hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={
                    donationsQuery.data.data.meta.page >=
                    donationsQuery.data.data.meta.totalPages
                  }
                  onClick={() =>
                    setPage((p) =>
                      Math.min(donationsQuery.data.data.meta.totalPages, p + 1),
                    )
                  }
                >
                  Next
                </button>
              </div>
            </div>
          ) : null}
        </>
      )}
    </section>
  );
}
