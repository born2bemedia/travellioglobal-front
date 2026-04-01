import type { Metadata } from "next";

import { EventsPage } from "./components";

export const metadata: Metadata = {
  title: "Event Tickets & Experiences Worldwide | Travellio Global",
  description:
    "Book concerts, shows, festivals, and live events across the globe with seamless booking and instant confirmation.",
  openGraph: {
    title:
      "Event Tickets & Experiences Worldwide | Travellio Global",
    description:
      "Book concerts, shows, festivals, and live events across the globe with seamless booking and instant confirmation.",
    images: "https://travellioglobal.com/images/meta.png",
  },
};

export default function Events() {
  return <EventsPage />;
}
