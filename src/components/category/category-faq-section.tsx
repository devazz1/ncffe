"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import type { CampaignFaqEntry } from "@/data/campaign";

type CategoryFaqSectionProps = {
  items: CampaignFaqEntry[];
};

export function CategoryFaqSection({ items }: CategoryFaqSectionProps) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="mt-16" aria-labelledby="campaign-faq-heading">
      <h2
        id="campaign-faq-heading"
        className="text-xl font-medium tracking-tight text-zinc-950 text-center"
      >
        Frequently asked questions
      </h2>
      <div className="mt-4 divide-y divide-zinc-200 overflow-hidden rounded-[10px] border border-zinc-200">
        {items.map((item, index) => (
          <details
            key={index}
            open={openIndex === index}
            className="[&[open]_summary_.faq-chevron]:rotate-0 [&:not([open])_summary_.faq-chevron]:-rotate-90"
            onToggle={(e) => {
              if (e.currentTarget.open) {
                setOpenIndex(index);
              } else if (openIndex === index) {
                setOpenIndex(-1);
              }
            }}
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-3 px-4 py-4 text-left [&::-webkit-details-marker]:hidden">
              <span className="min-w-0 flex-1 text-base font-medium leading-snug text-[#2b2b2b]">
                {item.question}
              </span>
              <ChevronDown
                className="faq-chevron mt-0.5 size-4 shrink-0 text-[#8d8d8d] transition-transform duration-200"
                aria-hidden
                strokeWidth={2}
              />
            </summary>
            <div className="border-t border-zinc-100 px-4 pb-4 pt-0">
              <p className="text-sm leading-relaxed text-[#6b6c6c]">{item.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
