import type { Metadata } from "next";

import { PlacesPage } from "./components";

export const metadata: Metadata = {
  title: "Places | Travellio Global",
  description:
    "Discover the world's most exciting places. From the bustling streets of Tokyo to the serene beauty of Bali, explore iconic and hidden gems with Travellio Global.",
  openGraph: {
    title: "Places | Travellio Global",
    description:
      "Discover the world's most exciting places. From the bustling streets of Tokyo to the serene beauty of Bali, explore iconic and hidden gems with Travellio Global.",
    images: "https://travellioglobal.com/images/meta.png",
  },
};

export default function Places() {
  return <PlacesPage />;
}
