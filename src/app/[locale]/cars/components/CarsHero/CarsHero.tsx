"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./CarsHero.module.scss";

export const CarsHero = () => {
  const t = useTranslations("carsPage");

  return (
    <section className={styles.hero}>
      <div className={styles.hero__bg}>
        <Image
          src="/images/cars/hero-bg.png"
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
          {t("heroSubtitle", {
              fallback: "Drive the World Your Way",
            })}
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
                  "Adventure doesn't always start at the airport. Sometimes, it starts behind the wheel.",
              })}
            </p>
            <p>
              {t("heroDescriptionTwo", {
                fallback:
                  "With Travellio Global, you can rent the perfect car anywhere your journey takes you \u2014 from buzzing city streets to scenic coastal highways. Flexible, reliable, and ready when you are.",
              })}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
