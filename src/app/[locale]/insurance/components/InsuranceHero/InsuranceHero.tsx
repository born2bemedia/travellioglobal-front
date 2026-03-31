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
                  "With Travellio Global, travel insurance is simple, dependable, and made for the unexpected.",
              })}
            </p>
            <p>
              {t("heroDescriptionTwo", {
                fallback:
                  "From sudden illness abroad to emergency transport, we’re here to help protect your plans, your health, and your peace of mind.",
              })}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};