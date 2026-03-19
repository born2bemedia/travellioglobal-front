"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./AboutVision.module.scss";

export const AboutVision = () => {
  const t = useTranslations("aboutPage");

  return (
    <section className={styles.vision}>
      <div className="container">
        <motion.div
          className={styles.vision__card}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <div className={styles.vision__media}>
            <Image
              src="/images/about/vision.webp"
              alt={t("visionAlt", {
                fallback: "Landscape view reflecting Travellio's vision",
              })}
              fill
              sizes="(max-width: 1024px) 50vw, 45vw"
              className={styles.vision__image}
            />
          </div>

          <div className={styles.vision__copy}>
            <h2>{t("visionTitle", { fallback: "Our Vision" })}</h2>
            <p>
              {t("visionDescription", {
                fallback:
                  "To create a world where travel is not just a service, but an opportunity to enrich lives, explore new horizons, and foster deeper connections between people and places.",
              })}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
