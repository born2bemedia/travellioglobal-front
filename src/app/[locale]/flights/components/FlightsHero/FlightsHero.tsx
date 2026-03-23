"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./FlightsHero.module.scss";

export const FlightsHero = () => {
  const t = useTranslations("flightsPage");

  return (
    <section className={styles.hero}>
      <div className={styles.hero__media}>
        <Image
          src="/images/flights/hero-bg-base.png"
          alt=""
          fill
          sizes="100vw"
          priority
          className={styles.hero__mediaBase}
        />
        <Image
          src="/images/flights/hero-bg-overlay.png"
          alt=""
          fill
          sizes="100vw"
          priority
          className={styles.hero__mediaOverlay}
        />
        <div className={styles.hero__overlay} />
      </div>

      <div className="container">
        <div className={styles.hero__inner}>
          <motion.div
            className={styles.hero__titleWrap}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeInUp}
          >
            <h1 className={styles.hero__title}>
              {t("heroTitle", { fallback: "Flights" })}
            </h1>
          </motion.div>

          <motion.div
            className={styles.hero__content}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className={styles.hero__headline}>
              {t("heroHeadline", {
                fallback: "Sky’s the Limit — Book Your Flight Now",
              })}
            </h2>

            <div className={styles.hero__text}>
              <p>
                {t("heroDescription", {
                  fallback:
                    "Start your adventure with a flight that fits your budget. Planning a spontaneous weekend getaway or a dream vacation, we’re here to help you find the best deals for your travels. Simply enter your departure city, destination, and travel dates, and let us do the hard work of finding you the most affordable options.",
                })}
              </p>
              <p>
                {t("heroTagline", {
                  fallback: "Travel smarter, not harder.",
                })}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
