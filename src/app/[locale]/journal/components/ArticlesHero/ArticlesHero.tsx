"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./ArticlesHero.module.scss";

export const ArticlesHero = () => {
  const t = useTranslations("journalPage");

  return (
    <section className={styles.hero}>
      <div className={styles.hero__decoration}>
        <Image
          src="/images/home/hero-figma/dashed-path.svg"
          alt=""
          width={1858}
          height={513}
        />
      </div>
      <div className="container">
        <motion.div
          className={styles.hero__inner}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <h1 className={styles.hero__title}>
            {t("heroTitle", { fallback: "Talk Travel to Us" })}
          </h1>

          <div className={styles.hero__text}>
            <p className={styles.hero__subtitle}>
              {t("heroSubtitleOne", {
                fallback: "Questions? Ideas? Travel dreams waiting to happen?",
              })}
              <br />
              {t("heroSubtitleTwo", {
                fallback: "We'd love to hear from you.",
              })}
            </p>
            <p className={styles.hero__description}>
              {t("heroDescription", {
                fallback:
                  "Whether you need help with a booking, want guidance on your next adventure, or simply have something to share, our team is ready to assist.",
              })}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
