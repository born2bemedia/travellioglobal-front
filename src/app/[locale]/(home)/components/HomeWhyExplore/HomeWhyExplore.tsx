"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./HomeWhyExplore.module.scss";

export const HomeWhyExplore = () => {
  const t = useTranslations("homeWhyExplore");

  const cards = [
    {
      key: "variety",
      number: "01.",
      title: t("varietyTitle", { fallback: "Variety without overwhelm" }),
      description: t("varietyDescription", {
        fallback: "Thousands of options — smartly organised.",
      }),
      icon: "/images/home/section-why/icon-island.svg",
      alt: t("varietyAlt", { fallback: "Island icon" }),
    },
    {
      key: "support",
      number: "02.",
      title: t("supportTitle", { fallback: "Support that shows up" }),
      description: t("supportDescription", {
        fallback: "Real assistance when you need it.",
      }),
      icon: "/images/home/section-why/icon-lifebuoy.svg",
      alt: t("supportAlt", { fallback: "Lifebuoy icon" }),
    },
    {
      key: "luxury",
      number: "03.",
      title: t("luxuryTitle", { fallback: "Luxury within reach" }),
      description: t("luxuryDescription", {
        fallback: "Competitive pricing. Exclusive travel deals.",
      }),
      icon: "/images/home/section-why/icon-sailboat.svg",
      alt: t("luxuryAlt", { fallback: "Sailboat icon" }),
    },
    {
      key: "secure",
      number: "04.",
      title: t("secureTitle", { fallback: "Safe & Secure" }),
      description: t("secureDescription", {
        fallback: "We collaborate with trusted global travel providers.",
      }),
      icon: "/images/home/section-why/icon-seal-check.svg",
      alt: t("secureAlt", { fallback: "Seal check icon" }),
    },
  ] as const;

  return (
    <section className={styles.home_why_explore}>
      <div className="container">
        <motion.div
          className={styles.home_why_explore__content}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          variants={fadeInUp}
        >
          <h2>{t("title", { fallback: "Why Explore With Us?" })}</h2>

          <div className={styles.home_why_explore__grid}>
            {cards.map((card) => (
              <article key={card.key} className={styles.home_why_explore__card}>
                <div className={styles.home_why_explore__cardCopy}>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>

                <div className={styles.home_why_explore__cardFooter}>
                  <span>{card.number}</span>
                  <Image src={card.icon} alt={card.alt} width={60} height={60} />
                </div>
              </article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
