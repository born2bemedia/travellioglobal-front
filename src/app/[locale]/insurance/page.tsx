import type { Metadata } from "next";

import { InsurancePage } from "./components";

export const metadata: Metadata = {
  title: "Travel Insurance Coverage | Safe Journeys with Travellio Global",
  description:
    "Protect your journey with comprehensive travel insurance solutions for global travellers.",
  openGraph: {
    title: "Travel Insurance Coverage | Safe Journeys with Travellio Global",
    description:
      "Protect your journey with comprehensive travel insurance solutions for global travellers.",
    images: "https://travellioglobal.com/images/meta.png",
  },
};

export default function Insurance() {
  return <InsurancePage />;
}