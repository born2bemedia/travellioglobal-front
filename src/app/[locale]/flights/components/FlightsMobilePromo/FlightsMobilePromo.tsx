"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { ExtraordinarySearchForm } from "@/features/extraordinary-search";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./FlightsMobilePromo.module.scss";

export const FlightsMobilePromo = () => {
  const t = useTranslations("flightsPage");

  return (
    <section className={styles.promo}>
      <div className="container">
        <motion.div
          className={styles.promo__card}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeInUp}
        >
          <Image
            src="/images/flights/destination-card-bg-mobile.png"
            alt=""
            fill
            sizes="358px"
            className={styles.promo__image}
          />
          <div className={styles.promo__overlay} />

          <div className={styles.promo__copy}>
            <h2>
              {t("mobilePromoTitle", {
                fallback: "Your Next Destination Awaits",
              })}
            </h2>
            <p>
              {t("mobilePromoDescription", {
                fallback:
                  "Ready to take the plunge into new adventures? Explore our curated list of exciting places and start planning your next trip today!",
              })}
            </p>
          </div>

          <ExtraordinarySearchForm suggestedDestinationIata="NYC" />
        </motion.div>
      </div>
    </section>
  );
};
