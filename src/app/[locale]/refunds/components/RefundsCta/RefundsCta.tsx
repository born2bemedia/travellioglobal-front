"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import { RefundsClaimForm } from "../RefundsClaimForm";
import styles from "./RefundsCta.module.scss";

export const RefundsCta = () => {
  const t = useTranslations("refundsPage");

  return (
    <section className={styles.cta}>
      <div className="container">
        <motion.div
          className={styles.cta__card}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeInUp}
        >
          <Image
            src="/images/refunds/cta-desktop.png"
            alt=""
            fill
            sizes="(max-width: 768px) 0px, 1280px"
            className={styles.cta__imageDesktop}
          />
          <Image
            src="/images/refunds/cta-mobile.png"
            alt=""
            fill
            sizes="(max-width: 768px) 358px, 0px"
            className={styles.cta__imageMobile}
          />
          <div className={styles.cta__overlay} />

          <div className={styles.cta__top}>
            <h2 className={styles.cta__title}>
              {t("ctaTitle", {
                fallback: "Delayed? Cancelled? Let’s Fix It.",
              })}
            </h2>
            <div className={styles.cta__copy}>
              <p>
                {t("ctaDescriptionOne", {
                  fallback: "Travel hiccups happen. Losing your money shouldn’t.",
                })}
              </p>
              <p>
                {t("ctaDescriptionTwo", {
                  fallback: "Check your flight today and see what you’re entitled to.",
                })}
              </p>
            </div>
          </div>

          <div className={styles.cta__formWrap}>
            <RefundsClaimForm compact />
          </div>
        </motion.div>
      </div>
    </section>
  );
};