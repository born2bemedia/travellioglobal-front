"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import { VisaSearchForm } from "../VisaSearchForm";
import styles from "./VisasCta.module.scss";

export const VisasCta = () => {
  const t = useTranslations("visasPage");

  return (
    <section className={styles.cta}>
      <div className="container">
        <motion.div
          className={styles.cta__inner}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeInUp}
        >
          <Image
            src="/images/visas/cta-bg-desktop.png"
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 1280px"
            className={styles.cta__imageDesktop}
          />
          <Image
            src="/images/visas/cta-bg-mobile.png"
            alt=""
            fill
            sizes="100vw"
            className={styles.cta__imageMobile}
          />
          <div className={styles.cta__overlay} />

          <div className={styles.cta__copy}>
            <h2 className={styles.cta__title}>
              {t("ctaTitle", {
                fallback: "Ready to Cross Borders?",
              })}
            </h2>

            <div className={styles.cta__text}>
              <p>
                {t("ctaDescriptionOne", {
                  fallback: "Visas shouldn’t slow down your wanderlust.",
                })}
              </p>
              <p>
                {t("ctaDescriptionTwo", {
                  fallback:
                    "Let Travellio Global handle the process — so your next adventure starts smoothly.",
                })}
              </p>
            </div>
          </div>

          <VisaSearchForm />
        </motion.div>
      </div>
    </section>
  );
};
