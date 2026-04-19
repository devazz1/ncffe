/** Shared story tiles (e.g. homepage rail, `/stories`). Swap `imageSrc` when assets exist under `public/`. */
export type Story = {
  id: string;
  title: string;
  description: string;
  /** Path under `public/` */
  imageSrc: string;
};

export const STORIES: Story[] = [
  {
    id: "caring-elderly",
    title: "Caring for the Elderly",
    description:
      "We support elderly individuals with food, care, and essential assistance.",
    imageSrc: "/ncf-img-kid-food-01.png",
  },
  {
    id: "distributing-clothes-1",
    title: "Distributing Clothes",
    description:
      "We provide clothes to individuals and families in need, helping them live with comfort and dignity.",
    imageSrc: "/ncf-img-kid-food-01.png",
  },
  {
    id: "distributing-clothes-2",
    title: "Distributing Clothes",
    description:
      "We provide clothes to individuals and families in need, helping them live with comfort and dignity.",
    imageSrc: "/ncf-img-kid-food-01.png",
  },
  {
    id: "providing-food",
    title: "Providing Food",
    description:
      "We serve nutritious meals and distribute ration kits to families, children, and elders facing hunger.",
    imageSrc: "/ncf-img-kid-food-01.png",
  },
];
