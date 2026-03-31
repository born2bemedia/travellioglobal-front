"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./InsuranceCta.module.scss";

export const InsuranceCta = () => {
  const t = useTranslations("insurancePage");

  return (
    <section className={styles.cta}>
      <div className="container">
        <motion.div
          className={styles.cta__card}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <h2 className={styles.cta__title}>
            {t("ctaTitle", {
              fallback: "Adventure Boldly. We’ve Got You Covered.",
            })}
          </h2>

          <div className={styles.cta__content}>
            <p>
              {t("ctaDescriptionOne", {
                fallback:
                  "As the best memories happen when you feel secure enough to enjoy them fully.",
              })}
            </p>
            <p>
              {t("ctaDescriptionTwo", {
                fallback: "Travel far. Travel smart.",
              })}
            </p>
            <p>
              {t("ctaDescriptionThree", {
                fallback: "Travel protected with Travellio Global.",
              })}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};