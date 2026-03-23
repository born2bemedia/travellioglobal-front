"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./CarsGlobe.module.scss";

type Destination = {
  key: string;
  flag: string;
  name: string;
  image: string;
};

export const CarsGlobe = () => {
  const t = useTranslations("carsPage");

  const destinations: Destination[] = [
    {
      key: "london",
      flag: "/images/cars/gb.png",
      name: t("globeLondon", { fallback: "London" }),
      image: "/images/cars/london-img.png",
    },
    {
      key: "barcelona",
      flag: "/images/cars/es.png",
      name: t("globeBarcelona", { fallback: "Barcelona" }),
      image: "/images/cars/barcelona-img.png",
    },
    {
      key: "rome",
      flag: "/images/cars/it.png",
      name: t("globeRome", { fallback: "Rome" }),
      image: "/images/cars/rome-img.png",
    },
    {
      key: "paris",
      flag: "/images/cars/fr.png",
      name: t("globeParis", { fallback: "Paris" }),
      image: "/images/cars/paris-img.png",
    },
    {
      key: "dubai",
      flag: "/images/cars/ae.png",
      name: t("globeDubai", { fallback: "Dubai" }),
      image: "/images/cars/dubai-img.png",
    },
    {
      key: "toronto",
      flag: "/images/cars/ca.png",
      name: t("globeToronto", { fallback: "Toronto" }),
      image: "/images/cars/toronto-img.png",
    },
  ];

  return (
    <section className={styles.globe}>
      <div className="container">
        <motion.div
          className={styles.globe__inner}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
        >
          <div className={styles.globe__header}>
            <h2 className={styles.globe__title}>
              {t("globeTitle", { fallback: "Drive Across the Globe" })}
            </h2>
            <p className={styles.globe__subtitle}>
              {t("globeSubtitle", {
                fallback:
                  "Wherever you land, we\u2019ll help you roll. Find your perfect car in:",
              })}
            </p>
          </div>

          <div className={styles.globe__grid}>
            {destinations.map((dest) => (
              <article key={dest.key} className={styles.globe__card}>
                <div
                  className={styles.globe__cardBg}
                  style={{ backgroundImage: `url(${dest.image})` }}
                />

                <div className={styles.globe__cardContent}>
                  <span className={styles.globe__cardFlag}>
                    <Image
                      src={dest.flag}
                      alt={dest.name}
                      width={54}
                      height={54}
                      className={styles.globe__cardFlagImage}
                    />
                  </span>
                  <h3 className={styles.globe__cardName}>{dest.name}</h3>
                </div>
              </article>
            ))}
          </div>

          <div className={styles.globe__footer}>
            <h3 className={styles.globe__footerTitle}>
              {t("globeMore", {
                fallback: "And many more destinations worldwide.",
              })}
            </h3>
            <p className={styles.globe__footerText}>
              {t("globeMoreDesc", {
                fallback:
                  "From European charm to Middle Eastern skylines, from North American highways to island coastlines \u2014 your wheels are waiting.",
              })}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
