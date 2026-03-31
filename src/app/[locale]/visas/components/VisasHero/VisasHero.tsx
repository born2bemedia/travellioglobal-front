"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./VisasHero.module.scss";

export const VisasHero = () => {
  const t = useTranslations("visasPage");

  return (
    <section className={styles.hero}>
      <div className={styles.hero__bg}>
        <Image
          src="/images/visas/hero-bg-desktop.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.hero__bgDesktop}
        />
        <Image
          src="/images/visas/hero-bg-mobile.png"
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
              fallback: "Travel Visas Made Simple",
            })}
          </h1>

          <div className={styles.hero__text}>
            <p>
              {t("heroDescriptionOne", {
                fallback: "Big adventures shouldn’t be blocked by paperwork.",
              })}
            </p>
            <p>
              {t("heroDescriptionTwo", {
                fallback:
                  "At Travellio Global, we make visa support smooth, clear, and stress-free — so you can focus on packing, not printing.",
              })}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
