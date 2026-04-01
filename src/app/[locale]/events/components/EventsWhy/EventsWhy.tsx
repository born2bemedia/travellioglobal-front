"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./EventsWhy.module.scss";

export const EventsWhy = () => {
  const t = useTranslations("eventsPage");

  const WHY_ITEMS = [
    {
      key: "01",
      icon: "/images/events/icon-globe.svg",
      title: t("whyGlobalTitle", {
        fallback: "Global Access",
      }),
      description: t("whyGlobalDescription", {
        fallback: "Events in major cities and iconic destinations.",
      }),
    },
    {
      key: "02",
      icon: "/images/events/icon-sparkle.svg",
      title: t("whyCuratedTitle", {
        fallback: "Curated Selection",
      }),
      description: t("whyCuratedDescription", {
        fallback: "Handpicked experiences worth your time.",
      }),
    },
    {
      key: "03",
      icon: "/images/events/icon-devices.svg",
      title: t("whyBookingTitle", {
        fallback: "Easy Digital Booking",
      }),
      description: t("whyBookingDescription", {
        fallback: "Fast, secure, and convenient.",
      }),
    },
    {
      key: "04",
      icon: "/images/events/icon-confetti.svg",
      title: t("whyTravelPartyTitle", {
        fallback: "Travel + Party Combined",
      }),
      description: t("whyTravelPartyDescription", {
        fallback:
          "Plan your flights and unforgettable nights — all in one place.",
      }),
    },
  ] as const;

  return (
    <motion.section
      className={styles.why}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeInUp}
    >
      <h2 className={styles.why__title}>
        {t("whyTitle", {
          fallback: "Why Book Events with Travellio Global?",
        })}
      </h2>

      <div className={styles.why__grid}>
        {WHY_ITEMS.map((item) => (
          <article key={item.key} className={styles.why__card}>
            <div className={styles.why__content}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>

            <div className={styles.why__bottom}>
              <span className={styles.why__number}>{item.key}.</span>
              <Image src={item.icon} alt="" width={60} height={60} />
            </div>
          </article>
        ))}
      </div>
    </motion.section>
  );
};
