"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./AboutJourney.module.scss";

export const AboutJourney = () => {
  const t = useTranslations("aboutPage");

  return (
    <section className={styles.journey}>
      <div className="container">
        <motion.div
          className={styles.journey__card}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <div className={styles.journey__media}>
            <Image
              src="/images/about/journey.webp"
              alt={t("journeyAlt", {
                fallback: "Mountain landscape for your journey",
              })}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={styles.journey__image}
            />
            <div className={styles.journey__overlay} />
            <h2 className={styles.journey__title}>
              {t("journeyTitle", {
                fallback: "Your Journey,\nOur Passion",
              })}
            </h2>
          </div>

          <div className={styles.journey__copy}>
            <p>
              {t("journeyDescriptionOne", {
                fallback:
                  "At Travellio Global, we believe travel isn't just about the destination - it's about the experiences, the moments, and the memories you create along the way.",
              })}
            </p>
            <p>
              {t("journeyDescriptionTwo", {
                fallback:
                  "Founded with the mission to make travel seamless, exciting, and unforgettable, we are dedicated to helping you discover the world in a way that fits your lifestyle and passions.",
              })}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
