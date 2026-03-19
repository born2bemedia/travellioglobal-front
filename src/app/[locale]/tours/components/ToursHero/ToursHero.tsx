"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./ToursHero.module.scss";

export const ToursHero = () => {
  const t = useTranslations("toursPage");

  return (
    <section className={styles.hero}>
      <div className={styles.hero__bg} />

      <div className="container">
        <motion.div
          className={styles.hero__content}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeInUp}
        >
          <h1 className={styles.hero__title}>
            {t("heroTitle", { fallback: "Tours" })}
          </h1>

          <div className={styles.hero__section}>
            <h2 className={styles.hero__subtitle}>
              {t("heroSubtitle", {
                fallback: "Let's Go Have Some Fun",
              })}
            </h2>

            <div className={styles.hero__description}>
              <p>
                {t("heroDesc1", {
                  fallback:
                    "Pack your bags, we're about to take you on a journey you'll never forget! From hidden gems to iconic landmarks, our tours are crafted to spark excitement and create lasting memories.",
                })}
              </p>
              <p>
                {t("heroDesc2", {
                  fallback:
                    "Whether you're in it for adventure, relaxation, or cultural discovery, the world is yours to explore. Let's start your adventure now!",
                })}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
