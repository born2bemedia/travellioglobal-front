"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import { TaxiSearchForm } from "../TaxiSearchForm";
import styles from "./TaxiBook.module.scss";

export const TaxiBook = () => {
  const t = useTranslations("taxiPage");

  return (
    <section className={styles.book}>
      <div className="container">
        <motion.div
          className={styles.book__inner}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <Image
            src="/images/taxi/book-bg.png"
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 1280px"
            className={styles.book__image}
          />
          <div className={styles.book__overlay} />

          <div className={styles.book__copy}>
            <h2>
              {t("bookTitleOne", { fallback: "Book Your" })}
              <br />
              {t("bookTitleTwo", { fallback: "Ride Now" })}
            </h2>

            <div className={styles.book__text}>
              <p>
                {t("bookSubtitleOne", {
                  fallback:
                    "Quick booking. Clear pricing. Total peace of mind.",
                })}
              </p>
              <p>
                {t("bookSubtitleTwo", {
                  fallback:
                    "As the best journeys don't begin with stress \u2014 they begin with confidence.",
                })}
              </p>
            </div>
          </div>

          <TaxiSearchForm />
        </motion.div>
      </div>
    </section>
  );
};
