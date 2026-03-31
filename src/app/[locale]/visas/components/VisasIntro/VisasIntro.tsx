"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./VisasIntro.module.scss";

export const VisasIntro = () => {
  const t = useTranslations("visasPage");

  return (
    <section className={styles.intro}>
      <div className="container">
        <motion.div
          className={styles.intro__card}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <h2 className={styles.intro__title}>
            {t("introTitle", {
              fallback: "Effortless Visa Assistance for Global Travellers",
            })}
          </h2>

          <div className={styles.intro__text}>
            <p>
              {t("introLead", {
                fallback: "Planning to explore a new country?",
              })}
            </p>
            <p>
              {t("introDescription", {
                fallback:
                  "Tell us your home country and destination, and we’ll guide you through the visa requirements step by step.",
              })}
            </p>
            <p>
              {t("introNote", {
                fallback:
                  "As travel should feel exciting — not overwhelming. Let the right visa open the right doors.",
              })}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
