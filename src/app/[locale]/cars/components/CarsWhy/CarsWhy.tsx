"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./CarsWhy.module.scss";

type Benefit = {
  key: string;
  number: string;
  title: string;
  description: string;
  icon: string;
};

export const CarsWhy = () => {
  const t = useTranslations("carsPage");

  const benefits: Benefit[] = [
    {
      key: "global",
      number: "01.",
      title: t("whyGlobalTitle", { fallback: "Global Access" }),
      description: t("whyGlobalDesc", {
        fallback:
          "Cars available in major cities and iconic destinations worldwide.",
      }),
      icon: "/images/cars/globe.svg",
    },
    {
      key: "flexible",
      number: "02.",
      title: t("whyFlexibleTitle", { fallback: "Flexible Drop-Off" }),
      description: t("whyFlexibleDesc", {
        fallback: "Pick up here. Drop off there. Travel without limits.",
      }),
      icon: "/images/cars/road-horizon.svg",
    },
    {
      key: "smart",
      number: "03.",
      title: t("whySmartTitle", { fallback: "Smart Deals" }),
      description: t("whySmartDesc", {
        fallback: "Competitive pricing and exclusive rental offers.",
      }),
      icon: "/images/cars/handshake.svg",
    },
    {
      key: "freedom",
      number: "04.",
      title: t("whyFreedomTitle", { fallback: "Freedom to Explore" }),
      description: t("whyFreedomDesc", {
        fallback:
          "Discover hidden roads, secret beaches, and places tours can\u2019t reach.",
      }),
      icon: "/images/cars/jeep.svg",
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
              fallback: "Why Rent with Travellio Global?",
            })}
          </h2>

          <div className={styles.why__grid}>
            {benefits.map((benefit) => (
              <article key={benefit.key} className={styles.why__card}>
                <div className={styles.why__cardTop}>
                  <h3 className={styles.why__cardTitle}>{benefit.title}</h3>
                  <p className={styles.why__cardDesc}>{benefit.description}</p>
                </div>
                <div className={styles.why__cardBottom}>
                  <span className={styles.why__cardNumber}>
                    {benefit.number}
                  </span>
                  <Image
                    src={benefit.icon}
                    alt=""
                    width={60}
                    height={60}
                    className={styles.why__cardIcon}
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
