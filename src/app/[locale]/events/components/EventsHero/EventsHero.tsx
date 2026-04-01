"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./EventsHero.module.scss";

export const EventsHero = () => {
  const t = useTranslations("eventsPage");

  return (
    <section className={styles.hero}>
      <div className={styles.hero__media}>
        <Image
          src="/images/events/hero-desktop.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.hero__imageDesktop}
        />
        <Image
          src="/images/events/hero-mobile.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.hero__imageMobile}
        />
        <div className={styles.hero__overlay} />
      </div>

      <div className="container">
        <motion.div
          className={styles.hero__content}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={fadeInUp}
        >
          <h1 className={styles.hero__title}>
            {t("heroTitle", {
              fallback: "Live the Moment",
            })}
          </h1>

          <div className={styles.hero__text}>
            <p>
              {t("heroTextOne", {
                fallback:
                  "Travel isn’t just about places. It’s about experiences.",
              })}
            </p>
            <p>
              {t("heroTextTwo", {
                fallback:
                  "From world-class concerts to cultural festivals, theatre premieres to major sporting events — Travellio Global connects you to the moments that make destinations unforgettable.",
              })}
            </p>
            <p>
              {t("heroTextThree", {
                fallback: "The best trips include a little magic.",
              })}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
