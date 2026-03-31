"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./RefundsWhy.module.scss";

type WhyCard = {
  key: string;
  title: string;
  description: string;
  imageDesktop: string;
  imageMobile: string;
};

export const RefundsWhy = () => {
  const t = useTranslations("refundsPage");

  const cards: WhyCard[] = [
    {
      key: "confidence",
      title: t("why1Title", { fallback: "Travel Confidence" }),
      description: t("why1Description", {
        fallback: "Know your rights and your options.",
      }),
      imageDesktop: "/images/refunds/why-1-desktop.png",
      imageMobile: "/images/refunds/why-1-mobile.png",
    },
    {
      key: "coverage",
      title: t("why2Title", { fallback: "Global Coverage" }),
      description: t("why2Description", {
        fallback: "Support for international flights.",
      }),
      imageDesktop: "/images/refunds/why-2-desktop.png",
      imageMobile: "/images/refunds/why-2-mobile.png",
    },
    {
      key: "time",
      title: t("why3Title", { fallback: "Save Time" }),
      description: t("why3Description", {
        fallback: "No need to deal with complex airline procedures alone.",
      }),
      imageDesktop: "/images/refunds/why-3-desktop.png",
      imageMobile: "/images/refunds/why-3-mobile.png",
    },
    {
      key: "reliable",
      title: t("why4Title", { fallback: "Professional & Reliable" }),
      description: t("why4Description", {
        fallback: "Protect every part of your journey — before, during, and after.",
      }),
      imageDesktop: "/images/refunds/why-4-desktop.png",
      imageMobile: "/images/refunds/why-4-mobile.png",
    },
  ];

  return (
    <section className={styles.why}>
      <div className="container">
        <motion.div
          className={styles.why__inner}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeInUp}
        >
          <h2 className={styles.why__title}>
            {t("whyTitle", {
              fallback: "Why Use Travellio Global Refund Support?",
            })}
          </h2>

          <div className={styles.why__grid}>
            {cards.map((card) => (
              <article key={card.key} className={styles.card}>
                <Image
                  src={card.imageDesktop}
                  alt={card.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 630px"
                  className={`${styles.card__image} ${styles.card__imageDesktop}`}
                />
                <Image
                  src={card.imageMobile}
                  alt={card.title}
                  fill
                  sizes="100vw"
                  className={`${styles.card__image} ${styles.card__imageMobile}`}
                />
                <div className={styles.card__overlay} />
                <div className={styles.card__content}>
                  <h3 className={styles.card__title}>{card.title}</h3>
                  <p className={styles.card__description}>{card.description}</p>
                </div>
              </article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};