"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import { PlacesSearchForm } from "../PlacesSearchForm";
import styles from "./PlacesCta.module.scss";

export const PlacesCta = () => {
  const t = useTranslations("placesPage");

  return (
    <section className={styles.cta} id="places-search">
      <div className="container">
        <motion.div
          className={styles.cta__inner}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <Image
            src="/images/places/cta-bg-figma.png"
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 1274px"
            className={styles.cta__image}
          />
          <div className={styles.cta__overlay} />

          <div className={styles.cta__copy}>
            <h2>
              {t("ctaTitle", {
                fallback: "Your Next Destination Awaits",
              })}
            </h2>

            <div className={styles.cta__text}>
              <p>
                {t("ctaSubtitle", {
                  fallback: "Ready to take the plunge into new adventures?",
                })}
              </p>
              <p>
                {t("ctaDescription", {
                  fallback:
                    "Explore our curated list of exciting places and start planning your next trip today!",
                })}
              </p>
            </div>
          </div>

          <PlacesSearchForm />
        </motion.div>
      </div>
    </section>
  );
};
