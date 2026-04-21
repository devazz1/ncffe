import type { TopDonationItem } from "@/lib/types";

function formatTopDonationInr(amount: string) {
  const n = Number(amount);
  if (!Number.isFinite(n)) {
    return amount;
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(n);
}

type CategoryTopDonationsSectionProps = {
  items: TopDonationItem[];
};

export function CategoryTopDonationsSection({
  items,
}: CategoryTopDonationsSectionProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section
      className="rounded-lg mt-6"
      aria-labelledby="top-donations-heading"
    >
      <h2
        id="top-donations-heading"
        className="text-lg text-center font-semibold text-zinc-900"
      >
        Our Top Supporters
      </h2>

      <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4">
        {items.map((item, index) => (
          <li
            key={`${item.name}-${item.amount}-${index}`}
            className="flex min-w-0 items-center justify-between gap-2.5 rounded-md bg-[#d6f2ff] px-2.5 py-2.5 text-sm text-black"
          >
            <span className="min-w-0 flex-1 truncate font-medium" title={item.name}>
              {item.name}
            </span>
            <span className="shrink-0 tabular-nums">
              {formatTopDonationInr(item.amount)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
