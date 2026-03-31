"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./VisasBenefits.module.scss";

type Benefit = {
  key: string;
  number: string;
  title: string;
  icon: string;
};

export const VisasBenefits = () => {
  const t = useTranslations("visasPage");

  const benefits: Benefit[] = [
    {
      key: "explore",
      number: "01.",
      title: t("benefit1Title", {
        fallback: "Explore the correct visa options for your destination",
      }),
      icon: "/images/visas/benefit-globe.svg",
    },
    {
      key: "documents",
      number: "02.",
      title: t("benefit2Title", {
        fallback: "Receive guidance on required documents",
      }),
      icon: "/images/visas/benefit-file.svg",
    },
    {
      key: "expedited",
      number: "03.",
      title: t("benefit3Title", {
        fallback: "Request expedited processing (where available)",
      }),
      icon: "/images/visas/benefit-lightning.svg",
    },
    {
      key: "applications",
      number: "04.",
      title: t("benefit4Title", {
        fallback: "Get help completing applications accurately",
      }),
      icon: "/images/visas/benefit-scroll.svg",
    },
  ];

  return (
    <section className={styles.benefits}>
      <div className="container">
        <motion.div
          className={styles.benefits__inner}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeInUp}
        >
          <div className={styles.benefits__heading}>
            <h2 className={styles.benefits__title}>
              {t("benefitsTitle", {
                fallback: "Smooth Processing = Smoother Adventures",
              })}
            </h2>
            <p className={styles.benefits__subtitle}>
              {t("benefitsSubtitle", {
                fallback: "With Travellio Global, you can:",
              })}
            </p>
          </div>

          <div className={styles.benefits__grid}>
            {benefits.map((benefit) => (
              <article key={benefit.key} className={styles.benefits__card}>
                <p className={styles.benefits__cardTitle}>{benefit.title}</p>

                <div className={styles.benefits__cardBottom}>
                  <span className={styles.benefits__cardNumber}>
                    {benefit.number}
                  </span>
                  <Image
                    src={benefit.icon}
                    alt=""
                    width={60}
                    height={60}
                    className={styles.benefits__cardIcon}
                  />
                </div>
              </article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
