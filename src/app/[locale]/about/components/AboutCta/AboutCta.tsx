"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./AboutCta.module.scss";

import { Link } from "@/i18n/navigation";

export const AboutCta = () => {
  const t = useTranslations("aboutPage");

  return (
    <section className={styles.cta}>
      <div className={styles.cta__decor} aria-hidden="true">
        <Image
          src="/images/about/decor-bottom.svg"
          alt=""
          fill
          sizes="100vw"
          unoptimized
        />
      </div>

      <div className="container">
        <motion.div
          className={styles.cta__inner}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <div className={styles.cta__copy}>
            <h2>{t("ctaTitle", { fallback: "Join Us on Your Next Adventure!" })}</h2>

            <div className={styles.cta__text}>
              <p>
                {t("ctaLineOne", {
                  fallback: "Ready to discover your next adventure?",
                })}
              </p>
              <p>
                {t("ctaLineTwo", {
                  fallback:
                    "Travellio Global offers customized travel experiences for every type of explorer.",
                })}
              </p>
              <span>
                {t("ctaNote", {
                  fallback: "Let's make your travel dreams come true!",
                })}
              </span>
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
            <span>{t("ctaButton", { fallback: "Explore Our Tours" })}</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
