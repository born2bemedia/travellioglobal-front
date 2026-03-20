import type { Metadata } from "next";

import { ExcursionPage } from "./components";

export const metadata: Metadata = {
  title: "Excursions | Travellio Global",
  description:
    "Discover expertly crafted excursions across Europe, Asia, the Americas, and beyond. Experience the world with Travellio Global.",
  openGraph: {
    title: "Excursions | Travellio Global",
    description:
      "Discover expertly crafted excursions across Europe, Asia, the Americas, and beyond. Experience the world with Travellio Global.",
    images: "https://travellioglobal.com/images/meta.png",
  },
};

export default function Excursion() {
  return <ExcursionPage />;
}
