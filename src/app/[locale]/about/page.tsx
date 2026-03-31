import type { Metadata } from "next";

import { AboutPage } from "./components";

export const metadata: Metadata = {
  title: "About Travellio Global | Our Story & Travel Philosophy",
  description:
    "Learn how Travellio Global curates meaningful travel experiences, seamless services, and unforgettable global adventures.",
  openGraph: {
    title: "About Travellio Global | Our Story & Travel Philosophy",
    description:
      "Learn how Travellio Global curates meaningful travel experiences, seamless services, and unforgettable global adventures.",
    images: "https://travellioglobal.com/images/meta.png",
  },
};

export default function About() {
  return <AboutPage />;
}
