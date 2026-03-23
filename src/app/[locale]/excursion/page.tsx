import type { Metadata } from "next";

import { ExcursionPage } from "./components";

export const metadata: Metadata = {
  title: "Global Excursions & Experiences | Travellio Global",
  description:
    "Book immersive excursions, cultural experiences, adventure activities, and iconic city highlights across the world.",
  openGraph: {
    title: "Global Excursions & Experiences | Travellio Global",
    description:
      "Book immersive excursions, cultural experiences, adventure activities, and iconic city highlights across the world.",
    //images: "https://travellioglobal.com/images/meta.png",
  },
};

export default function Excursion() {
  return <ExcursionPage />;
}
