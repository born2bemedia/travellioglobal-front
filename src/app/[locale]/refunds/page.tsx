import type { Metadata } from "next";

import { RefundsPage } from "./components";

export const metadata: Metadata = {
  title: "Flight Refund & Compensation Support | Travellio Global",
  description:
    "Check eligibility for flight refunds and compensation quickly and easily with Travellio Global support.",
  openGraph: {
    title: "Flight Refund & Compensation Support | Travellio Global",
    description:
      "Check eligibility for flight refunds and compensation quickly and easily with Travellio Global support.",
    images: "https://travellioglobal.com/images/meta.png",
  },
};

export default function Refunds() {
  return <RefundsPage />;
}