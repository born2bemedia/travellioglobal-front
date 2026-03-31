import type { Metadata } from "next";

import { VisasPage } from "./components";

export const metadata: Metadata = {
  title: "Travel Visas & Entry Support | Travellio Global",
  description:
    "Make border-crossing travel feel simpler with visa guidance, destination support, and a clear next step from Travellio Global.",
  openGraph: {
    title: "Travel Visas & Entry Support | Travellio Global",
    description:
      "Make border-crossing travel feel simpler with visa guidance, destination support, and a clear next step from Travellio Global.",
  },
};

export default function Visas() {
  return <VisasPage />;
}
