"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./ExcursionWhyChoose.module.scss";

type WhyCard = {
  key: string;
  number: string;
  title: string;
  description: string;
  icon: string;
  iconAlt: string;
};

export const ExcursionWhyChoose = () => {
  const t = useTranslations("excursionPage");

  const cards: WhyCard[] = [
    {
      key: "global",
      number: "01.",
      title: t("whyGlobalTitle", { fallback: "Global Adventures" }),
      description: t("whyGlobalDescription", {
        fallback:
          "From the sun-soaked Maldives to the majestic Icelandic landscapes, we've got your dream excursion waiting in iconic and underrated destinations across the globe.",
      }),
      icon: "/images/excursion/airplane-tilt.svg",
      iconAlt: "Airplane",
    },
    {
      key: "local",
      number: "02.",
      title: t("whyLocalTitle", { fallback: "Local-Driven" }),
      description: t("whyLocalDescription", {
        fallback:
          "Our guides are locals with insider knowledge, ready to take you beyond the usual tourist spots and show you the places that make each destination unforgettable.",
      }),
      icon: "/images/excursion/map-pin.svg",
      iconAlt: "Map pin",
    },
    {
      key: "tailored",
      number: "03.",
      title: t("whyTailoredTitle", { fallback: "Tailored to You" }),
      description: t("whyTailoredDescription", {
        fallback:
          "Whether you're after a high-octane adventure or a chilled-out cultural journey, our excursions are designed to fit your vibe and bring you closer to what makes each place special.",
      }),
      icon: "/images/excursion/user-check.svg",
      iconAlt: "User check",
    },
  ];

  return (
    <section className={styles.why}>
      <div className="container">
        <motion.div
          className={styles.why__inner}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
        >
          <h2 className={styles.why__title}>
            {t("whyTitle", {
              fallback: "Why Choose Our Excursions?",
            })}
          </h2>

          <div className={styles.why__cards}>
            {cards.map((card) => (
              <article key={card.key} className={styles.why__card}>
                <div className={styles.why__cardTop}>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>

                <div className={styles.why__cardBottom}>
                  <span className={styles.why__cardNumber}>{card.number}</span>
                  <Image
                    src={card.icon}
                    alt={card.iconAlt}
                    width={60}
                    height={60}
                    unoptimized
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
