"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./InsuranceIntro.module.scss";

export const InsuranceIntro = () => {
  const t = useTranslations("insurancePage");

  const bullets = [
    t("introBullet1", {
      fallback: "Planning a relaxing getaway",
    }),
    t("introBullet2", {
      fallback: "Embarking on an international adventure",
    }),
    t("introBullet3", {
      fallback: "Travelling for business",
    }),
    t("introBullet4", {
      fallback: "Exploring with family",
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
                  "We provide coverage designed to support you along the way. Suitable for travellers aged 3 to 85, across multiple destinations worldwide.",
              })}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};