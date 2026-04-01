"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import { EventsSearchBar } from "../EventsSearchBar";
import styles from "./EventsCta.module.scss";

export const EventsCta = () => {
  const t = useTranslations("eventsPage");

  return (
    <motion.section
      className={styles.cta}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeInUp}
    >
      <div className={styles.cta__media}>
        <Image
          src="/images/events/cta-desktop.png"
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 1280px"
          className={styles.cta__imageDesktop}
        />
        <Image
          src="/images/events/cta-mobile.png"
          alt=""
          fill
          sizes="100vw"
          className={styles.cta__imageMobile}
        />
        <div className={styles.cta__overlay} />
      </div>

      <div className={styles.cta__content}>
        <div className={styles.cta__top}>
          <h2 className={styles.cta__title}>
            {t("ctaTitle", {
              fallback: "Turn Your Trip Into a Story",
            })}
          </h2>

          <div className={styles.cta__text}>
            <p>
              {t("ctaTextOne", {
                fallback: "Anyone can visit a city. Few experience it live.",
              })}
            </p>
            <p>
              {t("ctaTextTwo", {
                fallback:
                  "Add an event to your journey and transform your travel into something extraordinary.",
              })}
            </p>
            <p>
              {t("ctaTextThree", {
                fallback: "Ready to take your seat?",
              })}
            </p>
          </div>
        </div>

        <EventsSearchBar />
      </div>
    </motion.section>
  );
};
