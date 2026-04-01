"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./BikesHero.module.scss";

export const BikesHero = () => {
  const t = useTranslations("bikesPage");

  return (
    <section className={styles.hero}>
      <div className={styles.hero__media}>
        <Image
          src="/images/bikes/hero-desktop.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.hero__imageDesktop}
        />
        <Image
          src="/images/bikes/hero-mobile.png"
          alt=""
          fill
          priority
          sizes="100vw"
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
              fallback: "Bike Rentals with Travellio Global",
            })}
          </h1>

          <div className={styles.hero__text}>
            <p>
              {t("heroTextOne", {
                fallback:
                  "Some journeys are meant to be driven. Others are meant to be ridden.",
              })}
            </p>
            <p>
              {t("heroTextTwo", {
                fallback:
                  "With Travellio Global Bike Rentals, you experience destinations up close — wind in your hair, freedom in every turn, and adventure around every corner.",
              })}
            </p>
            <p>
              {t("heroTextThree", {
                fallback:
                  "From city streets to coastal highways, your ride is waiting.",
              })}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
