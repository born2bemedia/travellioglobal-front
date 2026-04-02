"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./PlacesHero.module.scss";

export const PlacesHero = () => {
  const t = useTranslations("placesPage");

  return (
    <section className={styles.hero}>
      <div className={styles.hero__bg}>
        <Image
          src="/images/places/hero-bg-figma.png"
          alt=""
          fill
          sizes="100vw"
          priority
        />
        <Image
          src="/images/places/hero-overlay-figma.png"
          alt=""
          fill
          sizes="100vw"
          priority
          className={styles.hero__bgLayer}
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
            {t("heroSubtitle", { fallback: "Discover the World's Most Exciting Places" })}
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
                  "At Travellio Global, we take you to the heart of some of the world's most exciting, vibrant, and unique destinations.",
              })}
            </p>
            <p>
              {t("heroDescriptionTwo", {
                fallback:
                  "From the bustling streets of Tokyo to the serene beauty of Bali, our expertly curated experiences will transport you to some of the most iconic and hidden gems on the planet.",
              })}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

