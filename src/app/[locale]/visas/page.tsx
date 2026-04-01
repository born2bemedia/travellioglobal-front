import type { Metadata } from "next";

import { VisasPage } from "./components";

export const metadata: Metadata = {
  title: "Travel Visa Assistance | Travellio Global",
  description:
    "Simplify international travel with streamlined visa support and guidance from Travellio Global.",
  openGraph: {
    title: "Travel Visa Assistance | Travellio Global",
    description:
      "Simplify international travel with streamlined visa support and guidance from Travellio Global.",
  },
};

export default function Visas() {
  return <VisasPage />;
}
