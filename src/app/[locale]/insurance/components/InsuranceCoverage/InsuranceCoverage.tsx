"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./InsuranceCoverage.module.scss";

type CoverageCard = {
  key: string;
  title: string;
  imageDesktop: string;
  imageMobile: string;
};

export const InsuranceCoverage = () => {
  const t = useTranslations("insurancePage");

  const cards: CoverageCard[] = [
    {
      key: "medical",
      title: t("coverage1Title", {
        fallback: "Emergency medical expenses",
      }),
      imageDesktop: "/images/insurance/coverage-1-desktop.png",
      imageMobile: "/images/insurance/coverage-1-mobile.png",
    },
    {
      key: "transport",
      title: t("coverage2Title", {
        fallback: "Transport to medical facilities",
      }),
      imageDesktop: "/images/insurance/coverage-2-desktop.png",
      imageMobile: "/images/insurance/coverage-2-mobile.png",
    },
    {
      key: "disruption",
      title: t("coverage3Title", {
        fallback: "Trip disruption",
      }),
      imageDesktop: "/images/insurance/coverage-3-desktop.png",
      imageMobile: "/images/insurance/coverage-3-mobile.png",
    },
    {
      key: "interruptions",
      title: t("coverage4Title", {
        fallback: "Travel interruptions",
      }),
      imageDesktop: "/images/insurance/coverage-4-desktop.png",
      imageMobile: "/images/insurance/coverage-4-mobile.png",
    },
    {
      key: "families",
      title: t("coverage5Title", {
        fallback: "Families travelling together",
      }),
      imageDesktop: "/images/insurance/coverage-5-desktop.png",
      imageMobile: "/images/insurance/coverage-5-mobile.png",
    },
    {
      key: "pregnant",
      title: t("coverage6Title", {
        fallback: "Pregnant travellers (subject to policy terms)", // TODO: check this
      }),
      imageDesktop: "/images/insurance/coverage-6-desktop.png",
      imageMobile: "/images/insurance/coverage-6-mobile.png",
    },
  ];

  return (
    <section className={styles.coverage}>
      <div className="container">
        <motion.div
          className={styles.coverage__inner}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeInUp}
        >
          <div className={styles.coverage__heading}>
            <h2 className={styles.coverage__title}>
              {t("coverageTitle", {
                fallback: "Coverage That Moves With You",
              })}
            </h2>
            <p className={styles.coverage__subtitle}>
              {t("coverageSubtitle", {
                fallback:
                  "Travel isn’t one-size-fits-all — and your insurance shouldn’t be either. From visa-required trips to spontaneous escapes, we help you travel smarter.",
              })}
              <br /><br />
              {t("coverageSubtitleTwo", {
                fallback: "Our plans can include protection for:",
              })}
            </p>
          </div>

          <div className={styles.coverage__grid}>
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
                </div>
              </article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
