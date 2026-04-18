import Link from "next/link";
import type { Category } from "@/lib/types";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <article className="rounded-lg border border-zinc-200 bg-white p-4">
      <h2 className="text-lg font-semibold">{category.name}</h2>
      <p className="mt-1 text-sm text-zinc-800">
        {category.description ?? "No description provided."}
      </p>
      <div className="mt-3">
        <Link
          href={`/${category.slug}`}
          className="inline-block rounded bg-zinc-900 px-3 py-2 text-sm text-white"
        >
          Open category
        </Link>
      </div>
      {/* <pre className="mt-3 max-h-96 overflow-auto rounded border border-amber-200 bg-amber-50 p-2 text-left text-xs text-zinc-800">
        {JSON.stringify(category, null, 2)}
      </pre> */}
    </article>
  );
}
