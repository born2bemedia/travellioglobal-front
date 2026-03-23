"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./CarsTerms.module.scss";

type CarType = {
  key: string;
  title: string;
  subtitle: string;
  image: string;
};

export const CarsTerms = () => {
  const t = useTranslations("carsPage");

  const carTypes: CarType[] = [
    {
      key: "city",
      title: t("termsCityTitle", { fallback: "City cruisers" }),
      subtitle: t("termsCitySubtitle", { fallback: "for urban exploring" }),
      image: "/images/cars/city-cruisers.png",
    },
    {
      key: "suv",
      title: t("termsSuvTitle", { fallback: "SUVs & 4x4s" }),
      subtitle: t("termsSuvSubtitle", {
        fallback: "or mountain roads and wild landscapes",
      }),
      image: "/images/cars/suvs.png",
    },
    {
      key: "premium",
      title: t("termsPremiumTitle", { fallback: "Premium models" }),
      subtitle: t("termsPremiumSubtitle", {
        fallback: "for stylish arrivals",
      }),
      image: "/images/cars/premium.png",
    },
    {
      key: "family",
      title: t("termsFamilyTitle", { fallback: "Family-friendly vehicles" }),
      subtitle: t("termsFamilySubtitle", {
        fallback: "for comfortable group travel",
      }),
      image: "/images/cars/family.png",
    },
  ];

  return (
    <section className={styles.terms}>
      <div className="container">
        <motion.div
          className={styles.terms__inner}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <h2 className={styles.terms__title}>
            {t("termsTitle", { fallback: "Travel on Your Terms" })}
          </h2>

          <div className={styles.terms__grid}>
            {carTypes.map((car) => (
              <article key={car.key} className={styles.terms__card}>
                <Image
                  src={car.image}
                  alt={car.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 307px"
                  className={styles.terms__cardImage}
                />
                <div className={styles.terms__cardOverlay} />
                <div className={styles.terms__cardContent}>
                  <h3 className={styles.terms__cardTitle}>{car.title}</h3>
                  <p className={styles.terms__cardSubtitle}>{car.subtitle}</p>
                </div>
              </article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
