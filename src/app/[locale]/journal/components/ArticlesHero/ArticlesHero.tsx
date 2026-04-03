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
          src="/images/home/section-story/dashed-path.svg"
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
            {t("heroTitle", { fallback: "Travel, Told Differently" })}
          </h1>

          <div className={styles.hero__text}>
            <p className={styles.hero__subtitle}>
              {t("heroSubtitleOne", {
                fallback: "Less scrolling. More discovering.",
              })}
            </p>
            <p className={styles.hero__description}>
              {t("heroDescription", {
                fallback:
                  "From exploring hidden corners of iconic cities to understanding how to plan your journey more efficiently, each article is created to support both inspiration and decision-making.",
              })}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
