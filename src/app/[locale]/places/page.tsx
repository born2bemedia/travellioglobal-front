import type { Metadata } from "next";

import { PlacesPage } from "./components";

export const metadata: Metadata = {
  title: "Travel Destinations Worldwide | Explore with Travellio Global",
  description:
    "Discover inspiring cities, islands, and iconic locations across the globe. Find your perfect destination with Travellio Global.",
  openGraph: {
    title: "Travel Destinations Worldwide | Explore with Travellio Global",
    description:
      "Discover inspiring cities, islands, and iconic locations across the globe. Find your perfect destination with Travellio Global.",
    images: "https://travellioglobal.com/images/meta.png",
  },
};

export default function Places() {
  return <PlacesPage />;
}
