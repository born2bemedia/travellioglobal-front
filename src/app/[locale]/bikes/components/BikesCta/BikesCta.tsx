"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import { BikeSearchForm } from "../BikeSearchForm";
import styles from "./BikesCta.module.scss";

export const BikesCta = () => {
  const t = useTranslations("bikesPage");

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
          <div className={styles.cta__media}>
            <Image
              src="/images/bikes/cta-desktop.png"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 1280px"
              className={styles.cta__imageDesktop}
            />
            <Image
              src="/images/bikes/cta-mobile.png"
              alt=""
              fill
              sizes="100vw"
              className={styles.cta__imageMobile}
            />
            <div className={styles.cta__overlay} />
          </div>

          <div className={styles.cta__copy}>
            <h2 className={styles.cta__title}>
              {t("ctaTitle", {
                fallback: "Start the Engine. The World Awaits.",
              })}
            </h2>

            <div className={styles.cta__text}>
              <p>
                {t("ctaTextOne", {
                  fallback:
                    "Whether it’s a relaxed seaside pedal, a high-speed highway ride, or an off-road quad escape — Travellio Global puts the adventure in your hands.",
                })}
              </p>
              <p>
                {t("ctaTextTwo", {
                  fallback:
                    "Ready to ride?",
                })}
              </p>
            </div>
          </div>

          <div className={styles.cta__search}>
            <BikeSearchForm compact />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
