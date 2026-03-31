"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./InsuranceIntro.module.scss";

export const InsuranceIntro = () => {
  const t = useTranslations("insurancePage");

  const bullets = [
    t("introBullet1", {
      fallback: "Battling sudden illness abroad",
    }),
    t("introBullet2", {
      fallback: "Needing emergency transport",
    }),
    t("introBullet3", {
      fallback: "Travelling with family",
    }),
    t("introBullet4", {
      fallback: "Exploring with confidence",
    }),
    t("introBullet5", {
      fallback: "Taking extended trips or multi-country journeys",
    }),
    t("introBullet6", {
      fallback: "Flying while pregnant (subject to policy terms)",
    }),
  ] as const;

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
              fallback: "Your Reliable Travel Companion",
            })}
          </h2>

          <div className={styles.intro__content}>
            <p>
              {t("introLead", {
                fallback:
                  "Our travel insurance is built for modern adventurers.",
              })}
            </p>
            <p>
              {t("introListLead", {
                fallback: "Whether you’re:",
              })}
            </p>
            <ul className={styles.intro__list}>
              {bullets.map((bullet, index) => (
                <li key={index}>
                  {bullet}
                </li>
              ))}
            </ul>
            <p>
              {t("introClosing", {
                fallback:
                  "you deserve cover that gives you a secure backup no matter the destination.",
              })}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};