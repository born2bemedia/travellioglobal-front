"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import { TaxiSearchForm } from "../TaxiSearchForm";
import styles from "./TaxiCta.module.scss";

export const TaxiCta = () => {
  const t = useTranslations("taxiPage");

  return (
    <section className={styles.cta}>
      <div className="container">
        <motion.div
          className={styles.cta__inner}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <Image
            src="/images/taxi/cta-bg.png"
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 1274px"
            className={styles.cta__image}
          />
          <div className={styles.cta__overlay} />

          <div className={styles.cta__copy}>
            <h2>
              {t("ctaTitle", {
                fallback: "Ride Smart. Ride Comfortable.",
              })}
            </h2>

            <div className={styles.cta__text}>
              <p>
                {t("ctaSubtitleOne", {
                  fallback:
                    "Travel should feel exciting \u2014 not stressful.",
                })}
              </p>
              <p>
                {t("ctaSubtitleTwo", {
                  fallback:
                    "Simply enter your pickup location, destination, and schedule, and we\u2019ll match you with the perfect transfer option. Whether it\u2019s an early morning airport run or a late-night city arrival, we\u2019ve got you covered.",
                })}
              </p>
            </div>
          </div>

          <TaxiSearchForm />
        </motion.div>
      </div>
    </section>
  );
};
