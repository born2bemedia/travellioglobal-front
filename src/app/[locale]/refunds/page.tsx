import type { Metadata } from "next";

import { RefundsPage } from "./components";

export const metadata: Metadata = {
  title: "Flight Refunds & Compensation Support | Travellio Global",
  description:
    "Get clear support for disrupted flights, passenger rights, refund guidance, and compensation claims with Travellio Global.",
  openGraph: {
    title: "Flight Refunds & Compensation Support | Travellio Global",
    description:
      "Get clear support for disrupted flights, passenger rights, refund guidance, and compensation claims with Travellio Global.",
    images: "https://travellioglobal.com/images/meta.png",
  },
};

export default function Refunds() {
  return <RefundsPage />;
}