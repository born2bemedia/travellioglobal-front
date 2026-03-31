"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./InsuranceReassurance.module.scss";

export const InsuranceReassurance = () => {
  const t = useTranslations("insurancePage");

  const bullets = [
    t("reassuranceBullet1", {
      fallback: "Quick online enrollment",
    }),
    t("reassuranceBullet2", {
      fallback: "Easy document access",
    }),
    t("reassuranceBullet3", {
      fallback: "Streamlined claims process",
    }),
    t("reassuranceBullet4", {
      fallback: "Transparent coverage details",
    }),
  ] as const;

  return (
    <section className={styles.reassurance}>
      <div className="container">
        <motion.div
          className={styles.reassurance__card}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <h2 className={styles.reassurance__title}>
            {t("reassuranceTitle", {
              fallback: "Simple Setup. Instant Reassurance.",
            })}
          </h2>

          <div className={styles.reassurance__content}>
            <p>
              {t("reassuranceLead", {
                fallback: "We keep things clear and straightforward.",
              })}
            </p>
            <ul className={styles.reassurance__list}>
              {bullets.map((bullet, index) => (
                <li key={index}>
                  {bullet}
                </li>
              ))}
            </ul>
            <p>
              {t("reassuranceDescriptionOne", {
                fallback: "No complicated paperwork. No confusing fine print.",
              })}
            </p>
            <p>
              {t("reassuranceDescriptionTwo", {
                fallback: "Just reliable protection — ready when you are.",
              })}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};