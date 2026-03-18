"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { ExtraordinarySearchForm } from "@/features/extraordinary-search";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./HomeEmbarkExtraordinary.module.scss";

type ThemeCard = {
  text: string;
  image: string;
  destinationIata: string;
};

export const HomeEmbarkExtraordinary = () => {
  const t = useTranslations("homeEmbarkExtraordinary");
  const formRef = useRef<HTMLDivElement | null>(null);

  const THEMES: readonly ThemeCard[] = [
    {
      text: t("luxuryRetreat", { fallback: "Luxury Retreat" }),
      image: "/images/home/section-extraordinary/luxury-retreat.webp",
      destinationIata: "DXB",
    },
    {
      text: t("wellnessReset", { fallback: "Wellness Reset" }),
      image: "/images/home/section-extraordinary/wellness-reset.webp",
      destinationIata: "DPS",
    },
    {
      text: t("culturalDeepDive", { fallback: "Cultural Deep Dive" }),
      image: "/images/home/section-extraordinary/cultural-deep-dive.webp",
      destinationIata: "FCO",
    },
    {
      text: t("highAdrenalineAdventure", {
        fallback: "High Adrenaline Adventure",
      }),
      image:
        "/images/home/section-extraordinary/high-adrenaline-adventure.webp",
      destinationIata: "ZRH",
    },
    {
      text: t("maldivesIslandEscape", { fallback: "Maldives Island Escape" }),
      image: "/images/home/section-extraordinary/maldives-island-escape.webp",
      destinationIata: "MLE",
    },
  ] as const;

  const [autoIndex, setAutoIndex] = useState(0);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);

  /*useEffect(() => {
    if (hoveredCardIndex !== null) {
      return;
    }

    const interval = window.setInterval(() => {
      //setAutoIndex((current) => (current + 1) % THEMES.length);
    }, 2600);

    return () => window.clearInterval(interval);
  }, [hoveredCardIndex, THEMES.length]);*/

  const activeCardIndex = hoveredCardIndex ?? autoIndex;
  const activeCard = THEMES[activeCardIndex];

  return (
    <section className={styles.home_embark_extraordinary}>
      <div className="container">
        <motion.div
          className={styles.home_embark_extraordinary__content}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={fadeInUp}
        >
          <div className={styles.home_embark_extraordinary__intro}>
            <h2>
              {t("titleLineOne", { fallback: "Embark On Something" })}
              <br />
              {t("titleLineTwo", { fallback: "Extraordinary" })}
            </h2>

            <p className={styles.home_embark_extraordinary__eyebrow}>
              {t("eyebrow", { fallback: "Whether it’s:" })}
            </p>
          </div>

          <div className={styles.home_embark_extraordinary__cards}>
            {THEMES.slice(0, 3).map((theme, index) => {
              const isActive = activeCardIndex === index;

              return (
                <article
                  key={theme.text}
                  className={`${styles.home_embark_extraordinary__card} ${
                    isActive ? styles.home_embark_extraordinary__cardActive : ""
                  }`}
                  onMouseEnter={() => {
                    setHoveredCardIndex(index);
                    setAutoIndex(index);
                  }}
                  onMouseLeave={() => setHoveredCardIndex(null)}
                >
                  <Image
                    src={theme.image}
                    alt={theme.text}
                    fill
                    sizes="(max-width: 768px) 80vw, (max-width: 1200px) 25vw, 468px"
                  />

                  <div
                    className={styles.home_embark_extraordinary__cardOverlay}
                  />

                  <div className={styles.home_embark_extraordinary__cardCopy}>
                    <h3>{theme.text}</h3>
                  </div>
                </article>
              );
            })}

            <button
              type="button"
              className={styles.home_embark_extraordinary__arrowCard}
              onClick={() =>
                formRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
              }
              aria-label={t("jumpToPlanner", {
                fallback: "Jump to trip planner",
              })}
            >
              <Image
                src="/images/home/section-extraordinary/arrow-diagonal.svg"
                alt=""
                width={112}
                height={112}
              />
            </button>

            {THEMES.slice(3).map((theme, offset) => {
              const index = offset + 3;
              const isActive = activeCardIndex === index;

              return (
                <article
                  key={theme.text}
                  className={`${styles.home_embark_extraordinary__card} ${
                    isActive ? styles.home_embark_extraordinary__cardActive : ""
                  }`}
                  onMouseEnter={() => {
                    setHoveredCardIndex(index);
                    setAutoIndex(index);
                  }}
                  onMouseLeave={() => setHoveredCardIndex(null)}
                >
                  <Image
                    src={theme.image}
                    alt={theme.text}
                    fill
                    sizes="(max-width: 768px) 80vw, (max-width: 1200px) 25vw, 468px"
                  />

                  <div
                    className={styles.home_embark_extraordinary__cardOverlay}
                  />

                  <div className={styles.home_embark_extraordinary__cardCopy}>
                    <h3>{theme.text}</h3>
                  </div>
                </article>
              );
            })}
          </div>

          <p className={styles.home_embark_extraordinary__description}>
            {t("description", {
              fallback:
                "Travellio Global connects you to experiences that feel personal — not packaged.",
            })}
          </p>

          <div ref={formRef}>
            <ExtraordinarySearchForm
              suggestedDestinationIata={activeCard.destinationIata}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
