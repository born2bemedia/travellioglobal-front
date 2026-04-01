"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./EventsIntro.module.scss";

export const EventsIntro = () => {
  const t = useTranslations("eventsPage");

  return (
    <motion.section
      className={styles.intro}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
    >
      <div className={styles.intro__inner}>
        <h2 className={styles.intro__title}>
          {t("introTitle", {
            fallback: "Step Into the Spotlight",
          })}
        </h2>

        <div className={styles.intro__text}>
          <p>
            {t("introTextOne", {
              fallback: "Feel the energy of a live crowd.",
            })}
          </p>
          <p>
            {t("introTextTwo", {
              fallback:
                "Witness performances that stay with you long after the curtain falls.",
            })}
          </p>
          <p>
            {t("introTextThree", {
              fallback:
                "We help you discover and book tickets to events across global cities — effortlessly.",
            })}
          </p>
        </div>
      </div>
    </motion.section>
  );
};
