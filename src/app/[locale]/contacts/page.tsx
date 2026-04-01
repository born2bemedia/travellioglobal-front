import type { Metadata } from "next";

import { ContactsPage } from "./components";

export const metadata: Metadata = {
  title: "Contact Travellio Global | Get in Touch",
  description:
    "Reach out to Travellio Global for booking assistance, travel inquiries, or personalised support.",
  openGraph: {
    title: "Contact Travellio Global | Get in Touch",
    description:
      "Reach out to Travellio Global for booking assistance, travel inquiries, or personalised support.",
    images: "https://travellioglobal.com/images/meta.png",
  },
};

export default function Contacts() {
  return <ContactsPage />;
}
