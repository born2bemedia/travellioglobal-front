"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./ExcursionHero.module.scss";

export const ExcursionHero = () => {
  const t = useTranslations("excursionPage");

  return (
    <section className={styles.hero}>
      <div className={styles.hero__bg}>
        <Image
          src="/images/excursion/hero-bg.png"
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
            {t("heroTitle", { fallback: "Excursions" })}
          </h1>
        </motion.div>

        <motion.div
          className={styles.hero__content}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <h2 className={styles.hero__subtitle}>
            {t("heroSubtitle", { fallback: "Excursions Like No Other" })}
          </h2>

          <div className={styles.hero__text}>
            <p>
              {t("heroDescriptionOne", {
                fallback:
                  "Ready to experience the world on a whole new level? At Travellio Global, we don't just offer excursions; we offer adventures that connect you with the heart and soul of each destination.",
              })}
            </p>
            <p>
              {t("heroDescriptionTwo", {
                fallback:
                  "Discovering the hidden gems of Paris or taking in the breathtaking views of Bali, our expertly crafted experiences are designed to blow your mind — and make your memories last a lifetime.",
              })}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
