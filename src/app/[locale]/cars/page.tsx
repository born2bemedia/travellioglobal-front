import type { Metadata } from "next";

import { CarsPage } from "./components";

export const metadata: Metadata = {
  title: "Car Rentals Worldwide | Drive Your Journey with Travellio Global",
  description:
    "Book reliable car rentals worldwide with flexible pick-up and drop-off options. Explore destinations at your own pace.",
  openGraph: {
    title: "Car Rentals Worldwide | Drive Your Journey with Travellio Global",
    description:
      "Book reliable car rentals worldwide with flexible pick-up and drop-off options. Explore destinations at your own pace.",
    images: "https://travellioglobal.com/images/meta.png",
  },
};

export default function Cars() {
  return <CarsPage />;
}
