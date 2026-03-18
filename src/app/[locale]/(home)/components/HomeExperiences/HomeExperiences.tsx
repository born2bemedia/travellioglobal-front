"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./HomeExperiences.module.scss";

export const HomeExperiences = () => {
  const t = useTranslations("homeExperiences");

  const experiences = [
    {
      key: "guidedTours",
      title: t("guidedToursTitle", { fallback: "Guided Tours" }),
      description: t("guidedToursDescription", {
        fallback: "Expert-led journeys with local insight.",
      }),
      image: "/images/home/section-experiences/guided-tours.webp",
      alt: t("guidedToursAlt", { fallback: "Guided tours destination" }),
    },
    {
      key: "immersiveTravel",
      title: t("immersiveTravelTitle", { fallback: "Immersive Travel" }),
      description: t("immersiveTravelDescription", {
        fallback: "Live like a local. Learn something new. Leave differently.",
      }),
      image: "/images/home/section-experiences/immersive-travel.webp",
      alt: t("immersiveTravelAlt", { fallback: "Immersive travel cultural moment" }),
    },
    {
      key: "wellnessEscapes",
      title: t("wellnessEscapesTitle", { fallback: "Wellness Escapes" }),
      description: t("wellnessEscapesDescription", {
        fallback: "Yoga retreats, spa hideaways, mindful journeys.",
      }),
      image: "/images/home/section-experiences/wellness-escapes.webp",
      alt: t("wellnessEscapesAlt", { fallback: "Wellness escapes on the beach" }),
    },
    {
      key: "uniqueActivities",
      title: t("uniqueActivitiesTitle", { fallback: "Unique Activities" }),
      description: t("uniqueActivitiesDescription", {
        fallback: "Helicopter rides. Culinary classes. Wildlife encounters.",
      }),
      image: "/images/home/section-experiences/unique-activities.webp",
      alt: t("uniqueActivitiesAlt", { fallback: "Unique family travel activity" }),
    },
    {
      key: "adventureTravel",
      title: t("adventureTravelTitle", { fallback: "Adventure Travel" }),
      description: t("adventureTravelDescription", {
        fallback: "Mountains, reefs, safaris — if it gets your heart racing, we’ve got it.",
      }),
      image: "/images/home/section-experiences/adventure-travel.webp",
      alt: t("adventureTravelAlt", { fallback: "Adventure travel mountain scene" }),
    },
    {
      key: "ecoConsciousTravel",
      title: t("ecoConsciousTravelTitle", { fallback: "Eco-Conscious Travel" }),
      description: t("ecoConsciousTravelDescription", {
        fallback: "Explore responsibly. Travel beautifully.",
      }),
      image: "/images/home/section-experiences/eco-conscious-travel.webp",
      alt: t("ecoConsciousTravelAlt", { fallback: "Eco-conscious travel in nature" }),
    },
  ] as const;

  return (
    <section className={styles.home_experiences}>
      <div className="container">
        <motion.div
          className={styles.home_experiences__content}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={fadeInUp}
        >
          <h2>{t("title", { fallback: "Our Experiences" })}</h2>

          <div className={styles.home_experiences__grid}>
            {experiences.map((experience) => (
              <article key={experience.key} className={styles.home_experiences__card}>
                <Image
                  src={experience.image}
                  alt={experience.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className={styles.home_experiences__overlay} />

                <div className={styles.home_experiences__cardCopy}>
                  <h3>{experience.title}</h3>
                  <p>{experience.description}</p>
                </div>
              </article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
