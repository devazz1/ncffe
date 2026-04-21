import type { CampaignAboutItem } from "@/data/campaign";

import { MediaContentBlock } from "@/components/media-content-block";

type CategoryAboutCampaignSectionProps = {
  items: CampaignAboutItem[];
};

export function CategoryAboutCampaignSection({
  items,
}: CategoryAboutCampaignSectionProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="mt-6" aria-labelledby="about-campaign-heading">
      <h2
        id="about-campaign-heading"
        className="text-xl font-medium tracking-tight"
      >
        About This Campaign
      </h2>
      <div className="mt-5 flex flex-col gap-4">
        {items.map((item, index) => (
          <MediaContentBlock
            key={`about-${index}`}
            videoUrl={item.videoUrl}
            imageUrl={item.imageUrl}
            heading={item.heading}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
}
