"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./TaxiHero.module.scss";

export const TaxiHero = () => {
  const t = useTranslations("taxiPage");

  return (
    <section className={styles.hero}>
      <div className={styles.hero__bg}>
        <Image
          src="/images/taxi/hero-bg.png"
          alt=""
          fill
          sizes="100vw"
          priority
        />
        <div className={styles.hero__overlay} />
      </div>

      <div className="container">
        <motion.div
          className={styles.hero__inner}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeInUp}
        >
          <h1 className={styles.hero__title}>
            {t("heroSubtitle", { fallback: "Arrive in Style" })}
          </h1>
        </motion.div>

        <motion.div
          className={styles.hero__content}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <div className={styles.hero__text}>
            <p>
              {t("heroDescriptionOne", {
                fallback:
                  "Great journeys don't start in chaos.",
              })}
            </p>
            <p>
              {t("heroDescriptionTwo", {
                fallback:
                  "With Travellio Global Taxi Services, your trip begins the moment you step outside. From airport pickups to city rides — we move when you move.",
              })}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
