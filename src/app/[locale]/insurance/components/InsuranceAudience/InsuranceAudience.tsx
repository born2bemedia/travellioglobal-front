"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./InsuranceAudience.module.scss";

type AudienceCard = {
  key: string;
  title: string;
  imageDesktop: string;
  imageMobile: string;
};

export const InsuranceAudience = () => {
  const t = useTranslations("insurancePage");

  const cards: AudienceCard[] = [
    {
      key: "adventurers",
      title: t("audience1Title", {
        fallback: "International adventurers",
      }),
      imageDesktop: "/images/insurance/audience-1-desktop.png",
      imageMobile: "/images/insurance/audience-1-mobile.png",
    },
    {
      key: "leisure",
      title: t("audience2Title", {
        fallback: "Leisure travellers",
      }),
      imageDesktop: "/images/insurance/audience-2-desktop.png",
      imageMobile: "/images/insurance/audience-2-mobile.png",
    },
    {
      key: "families",
      title: t("audience3Title", {
        fallback: "Families with children",
      }),
      imageDesktop: "/images/insurance/audience-3-desktop.png",
      imageMobile: "/images/insurance/audience-3-mobile.png",
    },
    {
      key: "business",
      title: t("audience4Title", {
        fallback: "Business travellers",
      }),
      imageDesktop: "/images/insurance/audience-4-desktop.png",
      imageMobile: "/images/insurance/audience-4-mobile.png",
    },
    {
      key: "explorers",
      title: t("audience5Title", {
        fallback: "Long-stay & multi-country explorers",
      }),
      imageDesktop: "/images/insurance/audience-5-desktop.png",
      imageMobile: "/images/insurance/audience-5-mobile.png",
    },
    {
      key: "health",
      title: t("audience6Title", {
        fallback: "Those seeking extended health protection",
      }),
      imageDesktop: "/images/insurance/audience-6-desktop.png",
      imageMobile: "/images/insurance/audience-6-mobile.png",
    },
  ];

  return (
    <section className={styles.audience}>
      <div className="container">
        <motion.div
          className={styles.audience__inner}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeInUp}
        >
          <h2 className={styles.audience__title}>
            {t("audienceTitle", {
              fallback: "Who Is It For?",
            })}
          </h2>

          <div className={styles.audience__grid}>
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