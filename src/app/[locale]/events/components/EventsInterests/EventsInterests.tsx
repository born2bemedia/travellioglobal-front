"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./EventsInterests.module.scss";

export const EventsInterests = () => {
  const t = useTranslations("eventsPage");

  const INTEREST_ITEMS = [
    {
      key: "concerts",
      imageDesktop: "/images/events/interest-concerts-desktop.png",
      imageMobile: "/images/events/interest-concerts-mobile.png",
      title: t("interestsConcertsTitle", {
        fallback: "Live concerts",
      }),
    },
    {
      key: "theatre",
      imageDesktop: "/images/events/interest-theatre-desktop.png",
      imageMobile: "/images/events/interest-theatre-mobile.png",
      title: t("interestsTheatreTitle", {
        fallback: "Theatre & performing arts",
      }),
    },
    {
      key: "sports",
      imageDesktop: "/images/events/interest-sports-desktop.png",
      imageMobile: "/images/events/interest-sports-mobile.png",
      title: t("interestsSportsTitle", {
        fallback: "Major sporting events",
      }),
    },
    {
      key: "exhibitions",
      imageDesktop: "/images/events/interest-exhibitions-desktop.png",
      imageMobile: "/images/events/interest-exhibitions-mobile.png",
      title: t("interestsExhibitionsTitle", {
        fallback: "Exhibitions & immersive experiences",
      }),
    },
  ] as const;

  return (
    <motion.section
      className={styles.interests}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeInUp}
    >
      <h2 className={styles.interests__title}>
        {t("interestsTitle", {
          fallback: "Whether you’re into:",
        })}
      </h2>

      <div className={styles.interests__grid}>
        {INTEREST_ITEMS.map((item) => (
          <article key={item.key} className={styles.interests__card}>
            <div className={styles.interests__media}>
              <Image
                src={item.imageDesktop}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 307px"
                className={styles.interests__imageDesktop}
              />
              <Image
                src={item.imageMobile}
                alt=""
                fill
                sizes="100vw"
                className={styles.interests__imageMobile}
              />
              <div className={styles.interests__overlay} />
            </div>

            <div className={styles.interests__content}>
              <h3>{item.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </motion.section>
  );
};
