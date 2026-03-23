"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import { CarSearchForm } from "../CarSearchForm";
import styles from "./CarsRoad.module.scss";

export const CarsRoad = () => {
  const t = useTranslations("carsPage");

  return (
    <section className={styles.road}>
      <div className="container">
        <motion.div
          className={styles.road__inner}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <Image
            src="/images/cars/road-bg.png"
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 1280px"
            className={styles.road__image}
          />
          <div className={styles.road__overlay} />

          <div className={styles.road__copy}>
            <h2>
              {t("roadTitle", {
                fallback: "Hit the Road with Travellio Global",
              })}
            </h2>

            <div className={styles.road__text}>
              <p>
                {t("roadSubtitleOne", {
                  fallback: "The map is wide open.",
                })}
              </p>
              <p>
                {t("roadSubtitleTwo", {
                  fallback: "Where are we driving first?",
                })}
              </p>
            </div>
          </div>

          <CarSearchForm />
        </motion.div>
      </div>
    </section>
  );
};
