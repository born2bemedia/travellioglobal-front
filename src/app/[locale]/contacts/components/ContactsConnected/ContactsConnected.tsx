"use client";

import Image from "next/image";

import { useTranslations } from "next-intl";

import {
  FACEBOOK_URL,
  INSTAGRAM_URL,
  X_URL,
} from "@/shared/lib/constants/constants";
import { FacebookIcon, InstagramIcon, XIcon } from "@/shared/ui/icons";

import styles from "./ContactsConnected.module.scss";

const SOCIAL_LINKS = [
  {
    name: "Instagram",
    url: INSTAGRAM_URL,
    icon: <InstagramIcon />,
  },
  {
    name: "X",
    url: X_URL,
    icon: <XIcon />,
  },
  {
    name: "Facebook",
    url: FACEBOOK_URL,
    icon: <FacebookIcon />,
  },
];

export const ContactsConnected = () => {
  const t = useTranslations("contactsPage");

  const FEATURE_CARDS = [
    {
      text: t("cardTravel", { fallback: "Travel inspiration" }),
      number: "01.",
      icon: "/images/contacts/airplane-tilt.svg",
    },
    {
      text: t("cardDestination", { fallback: "Destination highlights" }),
      number: "02.",
      icon: "/images/contacts/map-pin.svg",
    },
    {
      text: t("cardOffers", { fallback: "Exclusive offers" }),
      number: "03.",
      icon: "/images/contacts/sailboat.svg",
    },
    {
      text: t("cardTips", { fallback: "Insider tips" }),
      number: "04.",
      icon: "/images/contacts/suitcase-rolling.svg",
    },
  ];

  return (
    <section className={styles.connected}>
      <div className="container">
        {/* Title + Social */}
        <div className={styles.connected__header}>
          <h2 className={styles.connected__title}>
            {t("stayConnectedTitle", { fallback: "Stay Connected" })}
          </h2>
          <div className={styles.connected__socials}>
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.connected__socialLink}
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Subtitle */}
        <p className={styles.connected__subtitle}>
          {t("stayConnectedSubtitle", {
            fallback: "Follow Travellio Global on social media for:",
          })}
        </p>

        {/* Feature Cards */}
        <div className={styles.connected__cards}>
          {FEATURE_CARDS.map((card) => (
            <div key={card.text} className={styles.connected__card}>
              <div className={styles.connected__cardTitle}>
                <p>{card.text}</p>
              </div>
              <div className={styles.connected__cardBottom}>
                <span className={styles.connected__cardNumber}>
                  {card.number}
                </span>
                <Image
                  src={card.icon}
                  alt={card.text}
                  width={60}
                  height={60}
                  className={styles.connected__cardIcon}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
