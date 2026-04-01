import type { Metadata } from "next";

import { BikesPage } from "./components";

export const metadata: Metadata = {
  title: "Bike & Motorcycle Rentals Worldwide | Travellio Global",
  description:
    "Explore destinations on two wheels with flexible bicycle, motorcycle, and quad rentals worldwide.",
  openGraph: {
    title: "Bike & Motorcycle Rentals Worldwide | Travellio Global",
    description:
      "Explore destinations on two wheels with flexible bicycle, motorcycle, and quad rentals worldwide.",
    images: "https://travellioglobal.com/images/meta.png",
  },
};

export default function Bikes() {
  return <BikesPage />;
}
