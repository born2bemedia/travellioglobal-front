import type { Metadata } from "next";

import { TaxiPage } from "./components";

export const metadata: Metadata = {
  title: "Airport Transfers & Taxi Services | Travellio Global",
  description:
    "Reliable airport transfers and private taxi services worldwide. Travel comfortably and arrive on time with Travellio Global.",
  openGraph: {
    title: "Airport Transfers & Taxi Services | Travellio Global",
    description:
      "Reliable airport transfers and private taxi services worldwide. Travel comfortably and arrive on time with Travellio Global.",
    //images: "https://travellioglobal.com/images/meta.png",
  },
};

export default function Taxi() {
  return <TaxiPage />;
}
