"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./HomeHero.module.scss";

type DestinationCard = {
  key: "cortona" | "maldives" | "santorini" | "tetons";
  image: string;
  label: string;
  alt: string;
};

export const HomeHero = () => {
  const t = useTranslations("homeHero");

  const DESTINATIONS: readonly DestinationCard[] = [
    {
      key: "cortona",
      image: "/images/home/hero-figma/cortona.png",
      label: t("cortona", { fallback: "Cortona, Italy" }),
      alt: t("cortona", { fallback: "Cortona, Italy" }),
    },
    {
      key: "maldives",
      image: "/images/home/hero-figma/maldives.webp",
      label: t("maldives", { fallback: "Faafu Atoll, Maldives" }),
      alt: t("maldives", { fallback: "Faafu Atoll, Maldives" }),
    },
    {
      key: "santorini",
      image: "/images/home/hero-figma/santorini.webp",
      label: t("santorini", { fallback: "Santorini, Greece" }),
      alt: t("santorini", { fallback: "Santorini, Greece" }),
    },
    {
      key: "tetons",
      image: "/images/home/hero-figma/tetons.webp",
      label: t("tetons", { fallback: "Tetons, Wyoming" }),
      alt: t("tetons", { fallback: "Tetons, Wyoming" }),
    },
  ] as const;

  return (
    <section className={styles.home_hero}>
      <div className="container">
        <div className={styles.home_hero__content}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            variants={fadeInUp}
            className={styles.home_hero__intro}
          >
            <p className={styles.home_hero__eyebrow}>
              {t("eyebrow", {
                fallback: "Travel smarter. Wander further. Smile more.",
              })}
            </p>

            <h1 className={styles.home_hero__title}>
              <span>
                {t("titleLineOne", { fallback: "Let's Go Somewhere" })}
              </span>
              <span className={styles.home_hero__title_accent}>
                {t("titleLineTwo", { fallback: "Amazing" })}
              </span>
            </h1>

            <p className={styles.home_hero__description}>
              {t("descriptionLineOne", {
                fallback:
                  "Not just another booking platform. We’re your passport to unforgettable moments.",
              })}
              <br />
              {t("descriptionLineTwo", {
                fallback: "Flights? Hotels? Epic tours? Yes. And yes. And yes.",
              })}
            </p>
          </motion.div>

          <div className={styles.home_hero__gallery}>
            <div className={styles.home_hero__trail} aria-hidden="true">
              <Image
                src="/images/home/hero-figma/dashed-path.svg"
                alt=""
                width={1858}
                height={513}
              />
            </div>

            {DESTINATIONS.map((destination, index) => (
              <motion.div
                key={destination.key}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
                transition={{ delay: index * 0.08 }}
                className={`${styles.home_hero__card} ${
                  styles[`home_hero__card--${destination.key}`]
                }`}
              >
                <div className={styles.home_hero__card_image}>
                  <Image
                    src={destination.image}
                    alt={destination.alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 30vw"
                  />
                </div>

                <div className={styles.home_hero__card_label}>
                  <Image
                    src="/images/home/hero-figma/map-pin.svg"
                    alt=""
                    width={24}
                    height={24}
                  />
                  <span>
                    {destination.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
