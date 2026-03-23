"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { FlightsSearchForm } from "@/features/flights-search";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./FlightsFeaturedSearch.module.scss";

export const FlightsFeaturedSearch = () => {
  const t = useTranslations("flightsPage");

  return (
    <section className={styles.featured}>
      <div className="container">
        <motion.div
          className={styles.featured__card}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeInUp}
        >
          <Image
            src="/images/flights/air-travel-bg-desktop.png"
            alt=""
            fill
            sizes="(max-width: 768px) 0px, 1274px"
            className={styles.featured__imageDesktop}
          />
          <Image
            src="/images/flights/air-travel-bg-mobile.png"
            alt=""
            fill
            sizes="(max-width: 768px) 358px, 0px"
            className={styles.featured__imageMobile}
          />
          <div className={styles.featured__overlay} />

          <div className={styles.featured__top}>
            <h2 className={styles.featured__title}>
              {t("featuredTitle", {
                fallback: "Effortless Air Travel",
              })}
            </h2>

            <div className={styles.featured__copy}>
              <p className={styles.featured__description}>
                {t("featuredDescription", {
                  fallback:
                    "We make booking flights easy and stress-free. Flying across the globe or just taking a quick hop to a nearby city, we offer cost-effective flights to destinations all over the world.",
                })}
              </p>

              <ul className={styles.featured__list}>
                <li>
                  {t("featuredPointFlexible", {
                    fallback:
                      "Flexible Dates: Adjust your travel plans as needed.",
                  })}
                </li>
                <li>
                  {t("featuredPointGlobal", {
                    fallback:
                      "Global Destinations: Flights to Europe, Asia, the Americas, and beyond.",
                  })}
                </li>
                <li>
                  {t("featuredPointEasy", {
                    fallback:
                      "Quick & Easy: We’ve simplified the process so you're flying in no time!",
                  })}
                </li>
              </ul>
            </div>
          </div>

          <FlightsSearchForm />
        </motion.div>
      </div>
    </section>
  );
};
