"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { FlightSearchForm } from "@/features/flight-search";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./HomeReadyChapter.module.scss";

export const HomeReadyChapter = () => {
  const t = useTranslations("homeReadyChapter");

  return (
    <section className={styles.home_ready_chapter}>
      <div className="container">
        <motion.div
          className={styles.home_ready_chapter__content}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeInUp}
        >
          <div className={styles.home_ready_chapter__panel}>
            <div className={styles.home_ready_chapter__background} aria-hidden="true">
              <Image
                src="/images/home/section-ready/ready-bg.webp"
                alt=""
                fill
                sizes="100vw"
              />
            </div>

            <div className={styles.home_ready_chapter__overlay} />

            <div className={styles.home_ready_chapter__hero}>
              <div className={styles.home_ready_chapter__copy}>
                <h2>{t("title", { fallback: "Ready for Your Next Chapter?" })}</h2>
                <p>{t("subtitle", { fallback: "We handle the details. You live the story." })}</p>
              </div>

              <div className={styles.home_ready_chapter__steps}>
                <p>
                  <span>01</span>
                  {t("stepOne", {
                    fallback: "Search flights, stays, and curated tours in seconds.",
                  })}
                </p>
                <p>
                  <span>02</span>
                  {t("stepTwo", {
                    fallback: "Pick your dream destination — we’ll handle the logistics.",
                  })}
                </p>
              </div>
            </div>

            <FlightSearchForm />
          </div>

          <p className={styles.home_ready_chapter__bottomCopy}>
            {t("bottomCopy", {
              fallback: "You bring the excitement. We bring the bookings!",
            })}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
