"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./CarsEngine.module.scss";

type Step = {
  number: string;
  text: string;
};

export const CarsEngine = () => {
  const t = useTranslations("carsPage");

  const steps: Step[] = [
    {
      number: "01",
      text: t("engineStep1", { fallback: "Enter your pick-up location" }),
    },
    {
      number: "02",
      text: t("engineStep2", { fallback: "Choose your drop-off point." }),
    },
    {
      number: "03",
      text: t("engineStep3", { fallback: "Select your travel dates." }),
    },
    {
      number: "04",
      text: t("engineStep4", {
        fallback: "Hit search \u2014 and let the adventure begin.",
      }),
    },
  ];

  return (
    <section className={styles.engine}>
      <div className="container">
        <motion.div
          className={styles.engine__inner}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <h2 className={styles.engine__title}>
            {t("engineTitle", { fallback: "Start Your Engine" })}
          </h2>

          <div className={styles.engine__content}>
            <p className={styles.engine__subtitle}>
              {t("engineSubtitle", { fallback: "Planning is simple:" })}
            </p>

            <div className={styles.engine__steps}>
              {steps.map((step) => (
                <div key={step.number} className={styles.engine__step}>
                  <span className={styles.engine__stepNumber}>
                    {step.number}
                  </span>
                  <span className={styles.engine__stepText}>{step.text}</span>
                </div>
              ))}
            </div>

            <div className={styles.engine__note}>
              <p>
                {t("engineNoteOne", {
                  fallback:
                    "Need to drop the car off somewhere else? No problem.",
                })}
              </p>
              <p>
                {t("engineNoteTwo", {
                  fallback: "One-way rentals? Absolutely.",
                })}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
