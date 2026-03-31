import type { Metadata } from "next";

import { ArticlesHero, JournalCards } from "./components";

export const metadata: Metadata = {
  title: "Travellio Journal | Travel Guides, Insights & Inspiration",
  description:
    "Explore travel stories, smart tips, destination insights, and curated inspiration from Travellio Global.",
  openGraph: {
    title: "Travellio Journal | Travel Guides, Insights & Inspiration",
    description:
      "Explore travel stories, smart tips, destination insights, and curated inspiration from Travellio Global.",
    images: "https://travellioglobal.com/images/meta.png",
  },
};

export default function Journal() {
  return (
    <main>
      <ArticlesHero />
      <JournalCards />
    </main>
  );
}
