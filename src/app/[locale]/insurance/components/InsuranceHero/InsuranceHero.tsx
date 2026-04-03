"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./InsuranceHero.module.scss";

export const InsuranceHero = () => {
  const t = useTranslations("insurancePage");

  return (
    <section className={styles.hero}>
      <div className={styles.hero__bg}>
        <Image
          src="/images/insurance/hero-desktop.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.hero__bgDesktop}
        />
        <Image
          src="/images/insurance/hero-mobile.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.hero__bgMobile}
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
              fallback: "Insurance Designed for Real Adventures",
            })}
          </h1>

          <div className={styles.hero__text}>
            <p>
              {t("heroDescriptionOne", {
                fallback:
                  "Adventure is exciting. Unexpected surprises? Not so much.",
              })}
            </p>
            <p>
              {t("heroDescriptionTwo", {
                fallback:
                  "With Travellio Global Travel Insurance, you explore the world knowing you’re covered. From quick city breaks to long-haul journeys, we help protect what matters most — your health, your plans, and your peace of mind.",
              })}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
