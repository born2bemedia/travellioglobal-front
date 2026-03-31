import type { Metadata } from "next";

import { InsurancePage } from "./components";

export const metadata: Metadata = {
  title: "Travel Insurance & Protection | Travellio Global",
  description:
    "Stay protected on the move with travel insurance designed for real adventures, unexpected moments, and greater peace of mind.",
  openGraph: {
    title: "Travel Insurance & Protection | Travellio Global",
    description:
      "Stay protected on the move with travel insurance designed for real adventures, unexpected moments, and greater peace of mind.",
    images: "https://travellioglobal.com/images/meta.png",
  },
};

export default function Insurance() {
  return <InsurancePage />;
}