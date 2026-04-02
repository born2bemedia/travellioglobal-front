"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import { CarSearchForm } from "../CarSearchForm";
import styles from "./CarsCta.module.scss";

export const CarsCta = () => {
  const t = useTranslations("carsPage");

  return (
    <section className={styles.cta}>
      <div className="container">
        <motion.div
          className={styles.cta__inner}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <Image
            src="/images/cars/cta-bg.png"
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 1274px"
            className={styles.cta__image}
          />
          <div className={styles.cta__overlay} />

          <div className={styles.cta__copy}>
            <h2>
              {t("ctaTitle", {
                fallback: "Up to 50% Off Premium Rentals",
              })}
            </h2>

            <div className={styles.cta__text}>
              <p>
                {t("ctaSubtitleOne", {
                  fallback:
                    "Why pay more when you can drive smarter?",
                })}
              </p>
              <p>
                {t("ctaSubtitleTwo", {
                  fallback:
                    "Enjoy competitive rates on a wide selection of vehicles \u2014 from compact city cars to luxury sedans and spacious SUVs. Whether it's a weekend escape or a long road adventure, we help you save without compromising comfort.",
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
