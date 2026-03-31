"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./InsuranceWhy.module.scss";

type Reason = {
  key: string;
  number: string;
  title: string;
  description: string;
  icon: string;
};

export const InsuranceWhy = () => {
  const t = useTranslations("insurancePage");

  const reasons: Reason[] = [
    {
      key: "global",
      number: "01.",
      title: t("why1Title", { fallback: "Global Reach" }),
      description: t("why1Description", {
        fallback: "Coverage designed for worldwide travel.",
      }),
      icon: "/images/insurance/why-globe.svg",
    },
    {
      key: "peace",
      number: "02.",
      title: t("why2Title", { fallback: "Peace of Mind" }),
      description: t("why2Description", {
        fallback: "Support when you need it most.",
      }),
      icon: "/images/insurance/why-lifebuoy.svg",
    },
    {
      key: "integration",
      number: "03.",
      title: t("why3Title", { fallback: "Seamless Integration" }),
      description: t("why3Description", {
        fallback: "Book alongside your flights, tours, or car rental.",
      }),
      icon: "/images/insurance/why-link.svg",
    },
    {
      key: "reliable",
      number: "04.",
      title: t("why4Title", { fallback: "Professional & Reliable" }),
      description: t("why4Description", {
        fallback: "Trusted partners. Clear policies. No surprises.",
      }),
      icon: "/images/insurance/why-handshake.svg",
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
              fallback: "Why Choose Travellio Global Insurance?",
            })}
          </h2>

          <div className={styles.why__grid}>
            {reasons.map((reason) => (
              <article key={reason.key} className={styles.card}>
                <div className={styles.card__body}>
                  <h3 className={styles.card__title}>{reason.title}</h3>
                  <p className={styles.card__description}>{reason.description}</p>
                </div>

                <div className={styles.card__footer}>
                  <span className={styles.card__number}>{reason.number}</span>
                  <Image src={reason.icon} alt="" width={60} height={60} />
                </div>
              </article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};