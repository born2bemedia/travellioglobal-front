"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./AboutHero.module.scss";

export const AboutHero = () => {
  const t = useTranslations("aboutPage");

  return (
    <section className={styles.hero}>
      <div className={styles.hero__decor} aria-hidden="true">
        <Image
          src="/images/about/decor-top.svg"
          alt=""
          width={1858}
          height={513}
          unoptimized
        />
      </div>

      <div className="container">
        <motion.div
          className={styles.hero__inner}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.7 }}
          variants={fadeInUp}
        >
          <h1 className={styles.hero__title}>
            {t("title", { fallback: "About" })}
          </h1>
        </motion.div>
      </div>
    </section>
  );
};
