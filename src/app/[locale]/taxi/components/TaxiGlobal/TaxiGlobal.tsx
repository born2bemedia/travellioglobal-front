"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./TaxiGlobal.module.scss";

export const TaxiGlobal = () => {
  const t = useTranslations("taxiPage");

  return (
    <section className={styles.global}>
      <div className="container">
        <motion.div
          className={styles.global__inner}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <h2 className={styles.global__title}>
            {t("globalTitleOne", { fallback: "Global Cities." })}
            <br />
            {t("globalTitleTwo", { fallback: "Local Precision." })}
          </h2>

          <div className={styles.global__text}>
            <p>
              {t("globalDescOne", {
                fallback:
                  "Landing in London? Heading to your hotel in Paris? Need a smooth transfer in Dubai or Barcelona?",
              })}
            </p>
            <p>
              {t("globalDescTwo", {
                fallback:
                  "Travellio Global connects you with trusted local drivers in major cities worldwide \u2014 ensuring reliability wherever you land.",
              })}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
