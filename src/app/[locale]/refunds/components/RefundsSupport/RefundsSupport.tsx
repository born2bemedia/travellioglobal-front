"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./RefundsSupport.module.scss";

export const RefundsSupport = () => {
  const t = useTranslations("refundsPage");

  const bulletKeys = [
    t("supportBullet1", {
      fallback: "Understand your passenger rights",
    }),
    t("supportBullet2", {
      fallback: "Navigate refund requests",
    }),
    t("supportBullet3", {
      fallback: "Submit compensation claims",
    }),
    t("supportBullet4", {
      fallback: "Track your case progress",
    }),
  ];

  return (
    <section className={styles.support}>
      <div className="container">
        <motion.div
          className={styles.support__card}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <h2 className={styles.support__title}>
            {t("supportTitle", {
              fallback: "Smooth Support During Disruptions",
            })}
          </h2>

          <div className={styles.support__content}>
            <p>
              {t("supportLead", {
                fallback:
                  "Travelling for business or pleasure, disruptions shouldn’t derail your plans.",
              })}
            </p>
            <p>
              {t("supportListLead", {
                fallback: "Travellio Global helps you:",
              })}
            </p>
            <ul className={styles.support__list}>
              {bulletKeys.map((bullet, index) => (
                <li key={index}>{bullet}</li>
              ))}
            </ul>
            <p>
              {t("supportClosing", {
                fallback: "We simplify what airlines often complicate.",
              })}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
