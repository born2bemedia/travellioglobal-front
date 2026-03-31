import type { Metadata } from "next";

import { ContactsPage } from "./components";

export const metadata: Metadata = {
  title: "Contact Us | Travellio Global",
  description:
    "Get in touch with Travellio Global. Questions, ideas, or travel dreams — we'd love to hear from you. Reach out today.",
  openGraph: {
    title: "Contact Us | Travellio Global",
    description:
      "Get in touch with Travellio Global. Questions, ideas, or travel dreams — we'd love to hear from you. Reach out today.",
    images: "https://travellioglobal.com/images/meta.png",
  },
};

export default function Contacts() {
  return <ContactsPage />;
}
