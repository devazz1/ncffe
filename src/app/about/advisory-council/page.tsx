import { SitePageContainer } from "@/components/site-page-container";

export default function AboutAdvisoryCouncilPage() {
  const advisoryCouncilMembers = [1, 2, 3];
  return (
    <section className="bg-[#f2f2f9] py-16 md:py-20">
      <SitePageContainer>
        <div className="mx-auto max-w-6xl">
          <h1 className="text-center text-3xl font-semibold text-zinc-900 md:text-4xl">
            Advisory Council
          </h1>

          <div className="mt-12 grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            {advisoryCouncilMembers.map((member) => (
              <article key={member} className="w-full max-w-[285px] text-center">
                <div className="h-[280px] w-full rounded-3xl bg-white" />
                <h2 className="mt-4 text-lg font-medium text-zinc-900">Name</h2>
                <p className="text-sm text-zinc-500">Designation</p>
              </article>
            ))}
          </div>
        </div>
      </SitePageContainer>
    </section>
  );
}
