"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { FlightsSearchForm } from "@/features/flights-search";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./FlightsCta.module.scss";

export const FlightsCta = () => {
  const t = useTranslations("flightsPage");

  return (
    <section className={styles.cta} id="flights-search">
      <div className="container">
        <motion.div
          className={styles.cta__inner}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeInUp}
        >
          <Image
            src="/images/flights/flight-cta-bg-desktop.png"
            alt=""
            fill
            sizes="(max-width: 768px) 0px, 1274px"
            className={styles.cta__imageDesktop}
          />
          <Image
            src="/images/flights/flight-cta-bg-mobile.png"
            alt=""
            fill
            sizes="(max-width: 768px) 358px, 0px"
            className={styles.cta__imageMobile}
          />
          <div className={styles.cta__overlay} />

          <div className={styles.cta__copy}>
            <h2>
              {t("ctaTitle", {
                fallback: "Book Your Next Flight Today",
              })}
            </h2>

            <div className={styles.cta__text}>
              <p>
                {t("ctaDescriptionOne", {
                  fallback: "Ready to take off?",
                })}
              </p>
              <p>
                {t("ctaDescriptionTwo", {
                  fallback:
                    "Let Travellio Global find the best flight options for your next adventure. We make it easy to book your journey, and even easier to fall in love with the places you’ll visit.",
                })}
              </p>
              <p>
                {t("ctaDescriptionThree", {
                  fallback:
                    "Start your travel planning today, and let the world be your oyster!",
                })}
              </p>
            </div>
          </div>

          <FlightsSearchForm />
        </motion.div>
      </div>
    </section>
  );
};
