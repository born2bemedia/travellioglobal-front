"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./TaxiStyle.module.scss";

type StyleCard = {
  key: string;
  title: string;
  image: string;
};

export const TaxiStyle = () => {
  const t = useTranslations("taxiPage");

  const cards: StyleCard[] = [
    {
      key: "executive",
      title: t("styleExecutive", {
        fallback: "Executive sedans for business travellers",
      }),
      image: "/images/taxi/executive.png",
    },
    {
      key: "families",
      title: t("styleFamilies", {
        fallback: "Spacious vans for families & groups",
      }),
      image: "/images/taxi/families.png",
    },
    {
      key: "premium",
      title: t("stylePremium", {
        fallback: "Premium vehicles for special arrivals",
      }),
      image: "/images/taxi/premium.png",
    },
    {
      key: "standard",
      title: t("styleStandard", {
        fallback: "Standard comfort for everyday ease",
      }),
      image: "/images/taxi/standard.png",
    },
  ];

  return (
    <section className={styles.style}>
      <div className="container">
        <motion.div
          className={styles.style__inner}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeInUp}
        >
          <div className={styles.style__header}>
            <h2 className={styles.style__title}>
              {t("styleTitle", {
                fallback: "Choose Your Travel Style",
              })}
            </h2>
            <p className={styles.style__subtitle}>
              {t("styleSubtitleOne", {
                fallback:
                  "Different journeys call for different rides.",
              })}
              <br />
              {t("styleSubtitleTwo", {
                fallback:
                  "Whatever the occasion, we make sure you arrive relaxed and ready.",
              })}
            </p>
          </div>

          <div className={styles.style__grid}>
            {cards.map((card) => (
              <article key={card.key} className={styles.style__card}>
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 307px"
                  className={styles.style__cardImage}
                />
                <div className={styles.style__cardOverlay} />
                <h3 className={styles.style__cardTitle}>{card.title}</h3>
              </article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
