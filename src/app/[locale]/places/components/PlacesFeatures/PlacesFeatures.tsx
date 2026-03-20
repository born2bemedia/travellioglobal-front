"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./PlacesFeatures.module.scss";

type FeatureCard = {
  key: string;
  title: string;
  description: string;
  points: string[];
};

export const PlacesFeatures = () => {
  const t = useTranslations("placesPage");

  const cards: FeatureCard[] = [
    {
      key: "getaway",
      title: t("getawayTitle", { fallback: "Find a Perfect Getaway" }),
      description: t("getawayDescription", {
        fallback:
          "Discover accommodations that align with your desire for excitement. Looking for luxury, adventure, or a peaceful escape, we offer a range of stays that suit your style. Choose your travel dates and select the experiences that match your needs, and let us handle the rest.",
      }),
      points: [
        t("getawayOpulent", {
          fallback:
            "Opulent Stays: Relax in luxury at world-class resorts and villas.",
        }),
        t("getawayCosy", {
          fallback:
            "Cosy Retreats: Unwind in charming, intimate spots perfect for a quiet getaway.",
        }),
        t("getawayAdventure", {
          fallback:
            "Adventure-Filled Hotels: Stay at properties offering thrilling activities such as hiking, snorkeling, and safaris.",
        }),
      ],
    },
    {
      key: "customise",
      title: t("customiseTitle", { fallback: "Customise Your Trip" }),
      description: t("customiseDescription", {
        fallback:
          "Set out on a journey that blends comfort with fascination. From opulent stays to cozy retreats, your ideal spot is ready for you. Whether you're looking for a secluded island or a city-centric escape, we offer curated experiences tailored to your desires.",
      }),
      points: [
        t("customisePersonalized", {
          fallback:
            "Personalized Itineraries: Choose from guided tours, excursions, or free exploration - all customized for you.",
        }),
        t("customiseAccommodations", {
          fallback:
            "Perfect Accommodations: Select from luxury resorts, boutique hotels, or charming local stays that match your travel style.",
        }),
        t("customiseFlexible", {
          fallback:
            "Flexible Travel Dates: Book at your convenience, with the flexibility to adjust dates and experiences as you see fit.",
        }),
      ],
    },
  ];

  return (
    <section className={styles.features}>
      <div className="container">
        <motion.div
          className={styles.features__inner}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeInUp}
        >
          <div className={styles.features__cta}>
            <a href="#places-search" className={styles.features__ctaButton}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="20"
                viewBox="0 0 23 20"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M0 10H22M22 10L13.3333 1M22 10L13.3333 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>
                {t("exploreCta", { fallback: "The World is Waiting" })}
              </span>
            </a>
          </div>

          <div className={styles.features__grid}>
            {cards.map((card) => (
              <article key={card.key} className={styles.features__card}>
                <h2 className={styles.features__cardTitle}>{card.title}</h2>
                <p className={styles.features__cardDescription}>
                  {card.description}
                </p>
                <ul className={styles.features__cardList}>
                  {card.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
