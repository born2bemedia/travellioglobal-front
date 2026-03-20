"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./ExcursionCta.module.scss";

export const ExcursionCta = () => {
  const t = useTranslations("excursionPage");

  return (
    <section className={styles.cta}>
      <div className="container">
        <motion.div
          className={styles.cta__inner}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <div className={styles.cta__copy}>
            <h2>
              {t("ctaTitle", {
                fallback: "Start Your Adventure Today",
              })}
            </h2>

            <div className={styles.cta__text}>
              <p>
                {t("ctaSubtitle", {
                  fallback:
                    "Why wait for your dream vacation? Let's make it happen.",
                })}
              </p>
              <p>
                {t("ctaDescription", {
                  fallback:
                    "Choose from our handpicked excursions and get ready to experience the world in ways that you'll be talking about for years to come.",
                })}
              </p>
            </div>
          </div>

          <Link href="/tours" className={styles.cta__button}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="20"
              viewBox="0 0 23 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M0 10H22M22 10L13.3333 1M22 10L13.3333 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>
              {t("ctaButton", { fallback: "Let's Go Explore!" })}
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
