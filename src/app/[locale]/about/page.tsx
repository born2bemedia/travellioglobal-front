import type { Metadata } from "next";

import { AboutPage } from "./components";

export const metadata: Metadata = {
  title: "About | Travellio Global",
  description:
    "Learn more about Travellio Global, our vision, and the promise behind every journey we craft.",
  openGraph: {
    title: "About | Travellio Global",
    description:
      "Learn more about Travellio Global, our vision, and the promise behind every journey we craft.",
    images: "https://travellioglobal.com/images/meta.png",
  },
};

export default function About() {
  return <AboutPage />;
}
