import type { Metadata } from "next";

import { FlightsPage } from "./components";

export const metadata: Metadata = {
  title: "Affordable Flights Worldwide | Travellio Global",
  description:
    "Search and compare global flight options with flexible booking tools. Travel smarter and fly effortlessly with Travellio Global.",
  openGraph: {
    title: "Affordable Flights Worldwide | Travellio Global",
    description:
      "Search and compare global flight options with flexible booking tools. Travel smarter and fly effortlessly with Travellio Global.",
    images: "https://travellioglobal.com/images/meta.png",
  },
};

export default function Flights() {
  return <FlightsPage />;
}
