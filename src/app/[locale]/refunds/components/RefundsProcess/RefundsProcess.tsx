"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./RefundsProcess.module.scss";

type ProcessCard = {
  key: string;
  number: string;
  title: string;
  icon: string;
};

export const RefundsProcess = () => {
  const t = useTranslations("refundsPage");

  const cards: ProcessCard[] = [
    {
      key: "navigate",
      number: "01.",
      title: t("process1Title", { fallback: "Easy to navigate" }),
      icon: "/images/refunds/process-compass.svg",
    },
    {
      key: "eligibility",
      number: "02.",
      title: t("process2Title", {
        fallback: "Transparent about eligibility",
      }),
      icon: "/images/refunds/process-file-text.svg",
    },
    {
      key: "efficient",
      number: "03.",
      title: t("process3Title", {
        fallback: "Efficient in handling requests",
      }),
      icon: "/images/refunds/process-lightning.svg",
    },
    {
      key: "communication",
      number: "04.",
      title: t("process4Title", {
        fallback: "Clear in communication",
      }),
      icon: "/images/refunds/process-envelope-simple.svg",
    },
  ];

  return (
    <section className={styles.process}>
      <div className="container">
        <motion.div
          className={styles.process__inner}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeInUp}
        >
          <div className={styles.process__heading}>
            <h2 className={styles.process__title}>
              {t("processTitle", {
                fallback: "Effortless Compensation Process",
              })}
            </h2>
            <div className={styles.process__copy}>
              <p>
                {t("processDescriptionOne", {
                  fallback:
                    "We believe clarity builds confidence. From submission to resolution — we keep it straightforward.",
                })}
              </p>
              <p>
                {t("processDescriptionTwo", {
                  fallback: "Our platform is designed to be:",
                })}
              </p>
            </div>
          </div>

          <div className={styles.process__grid}>
            {cards.map((card) => (
              <article key={card.key} className={styles.card}>
                <h3 className={styles.card__title}>{card.title}</h3>
                <div className={styles.card__footer}>
                  <span className={styles.card__number}>{card.number}</span>
                  <Image src={card.icon} alt="" width={60} height={60} />
                </div>
              </article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};