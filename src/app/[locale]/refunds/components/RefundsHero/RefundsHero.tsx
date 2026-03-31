"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./RefundsHero.module.scss";

export const RefundsHero = () => {
  const t = useTranslations("refundsPage");

  return (
    <section className={styles.hero}>
      <div className={styles.hero__media}>
        <Image
          src="/images/refunds/hero-desktop.png"
          alt=""
          fill
          sizes="100vw"
          priority
          className={styles.hero__imageDesktop}
        />
        <Image
          src="/images/refunds/hero-mobile.png"
          alt=""
          fill
          sizes="100vw"
          priority
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
              fallback: "Flight Disrupted? We’ve Got You.",
            })}
          </h1>
          <div className={styles.hero__text}>
            <p>
              {t("heroDescriptionOne", {
                fallback:
                  "Travel doesn’t always go exactly as planned. Delays happen. Cancellations happen.",
              })}
            </p>
            <p>
              {t("heroDescriptionTwo", {
                fallback:
                  "What matters is how quickly you recover. At Travellio Global, we help you check whether you’re eligible for a refund or compensation — quickly, clearly, and without unnecessary stress.",
              })}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
