"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import { BikeSearchForm } from "../BikeSearchForm";
import styles from "./BikesRules.module.scss";

export const BikesRules = () => {
  const t = useTranslations("bikesPage");

  return (
    <section className={styles.rules}>
      <div className="container">
        <motion.div
          className={styles.rules__inner}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <div className={styles.rules__media}>
            <Image
              src="/images/bikes/rules-desktop.png"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 1280px"
              className={styles.rules__imageDesktop}
            />
            <Image
              src="/images/bikes/rules-mobile.png"
              alt=""
              fill
              sizes="100vw"
              className={styles.rules__imageMobile}
            />
            <div className={styles.rules__overlay} />
          </div>

          <div className={styles.rules__copy}>
            <h2 className={styles.rules__title}>
              {t("rulesTitle", {
                fallback: "Your Road. Your Rules.",
              })}
            </h2>

            <div className={styles.rules__text}>
              <p>
                {t("rulesTextOne", {
                  fallback:
                    "Start your engine in just a few clicks.",
                })}
              </p>
              <p>
                {t("rulesTextTwo", {
                  fallback:
                    "Select:",
                })}
              </p>
              <ul>
                <li>
                  {t("rulesListOne", {
                    fallback: "Pick-up location",
                  })}
                </li>
                <li>
                  {t("rulesListTwo", {
                    fallback: "Rental dates",
                  })}
                </li>
                <li>
                  {t("rulesListThree", {
                    fallback: "Flexible return options",
                  })}
                </li>
              </ul>
              <p>
                {t("rulesTextThree", {
                  fallback:
                    "Want to return your bike to a different location? No problem. One-way freedom is part of the adventure.",
                })}
              </p>
            </div>
          </div>

          <div className={styles.rules__search}>
            <BikeSearchForm />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
