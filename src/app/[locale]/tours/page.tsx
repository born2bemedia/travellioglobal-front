import { Metadata } from "next";

import { ToursContent, ToursHero } from "./components";

export const metadata: Metadata = {
  title: "Guided Tours Worldwide | Handpicked Adventures by Travellio Global",
  description: "Explore premium guided tours across Europe, Asia, the Americas, and beyond. Discover unforgettable experiences curated by Travellio Global.",
  openGraph: {
    title: "Guided Tours Worldwide | Handpicked Adventures by Travellio Global",
    description: "Explore premium guided tours across Europe, Asia, the Americas, and beyond. Discover unforgettable experiences curated by Travellio Global.",
    images: "https://travellioglobal.com/images/meta.png",
  },
};

export default async function ToursPage() {
  return (
    <>
      <ToursHero />
      <ToursContent />
    </>
  );
}
