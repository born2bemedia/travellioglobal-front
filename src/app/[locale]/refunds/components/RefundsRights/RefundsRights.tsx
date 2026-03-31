"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./RefundsRights.module.scss";

type RightsCard = {
  key: string;
  title: string;
  imageDesktop: string;
  imageMobile: string;
};

export const RefundsRights = () => {
  const t = useTranslations("refundsPage");

  const cards: RightsCard[] = [
    {
      key: "delayed",
      title: t("rights1Title", { fallback: "Delayed" }),
      imageDesktop: "/images/refunds/rights-1-desktop.png",
      imageMobile: "/images/refunds/rights-1-mobile.png",
    },
    {
      key: "cancelled",
      title: t("rights2Title", { fallback: "Cancelled" }),
      imageDesktop: "/images/refunds/rights-2-desktop.png",
      imageMobile: "/images/refunds/rights-2-mobile.png",
    },
    {
      key: "overbooked",
      title: t("rights3Title", { fallback: "Overbooked" }),
      imageDesktop: "/images/refunds/rights-3-desktop.png",
      imageMobile: "/images/refunds/rights-3-mobile.png",
    },
    {
      key: "connection",
      title: t("rights4Title", { fallback: "Significantly rescheduled" }),
      imageDesktop: "/images/refunds/rights-4-desktop.png",
      imageMobile: "/images/refunds/rights-4-mobile.png",
    },
  ];

  return (
    <section className={styles.rights}>
      <div className="container">
        <motion.div
          className={styles.rights__inner}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeInUp}
        >
          <div className={styles.rights__heading}>
            <h2 className={styles.rights__title}>
              {t("rightsTitle", {
                fallback: "Protecting Your Air Travel Rights",
              })}
            </h2>
            <p className={styles.rights__lead}>
              {t("rightsLead", {
                fallback: "If your flight was:",
              })}
            </p>
            <div className={styles.rights__copy}>
              <p>
                {t("rightsDescriptionOne", {
                  fallback:
                    "You may be entitled to compensation, depending on the airline’s policies and applicable regulations.",
                })}
              </p>
              <p>
                {t("rightsDescriptionTwo", {
                  fallback:
                    "Simply enter your flight details, and our system will assess your case and guide you through the next steps.",
                })}
              </p>
            </div>
          </div>

          <div className={styles.rights__grid}>
            {cards.map((card) => (
              <article key={card.key} className={styles.card}>
                <Image
                  src={card.imageDesktop}
                  alt={card.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 307px"
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
                <h3 className={styles.card__title}>{card.title}</h3>
              </article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
