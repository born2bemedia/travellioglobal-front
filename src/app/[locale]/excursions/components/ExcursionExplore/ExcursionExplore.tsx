"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";
import { Button } from "@/shared/ui/kit/button/Button";

import styles from "./ExcursionExplore.module.scss";

type Destination = {
  name: string;
  description: string;
};

type Region = {
  key: string;
  name: string;
  image: string;
  destinations: Destination[];
};

export const ExcursionExplore = () => {
  const t = useTranslations("excursionPage");

  const regions: Region[] = [
    {
      key: "europe",
      name: t("regionEurope", { fallback: "Europe" }),
      image: "/images/excursion/europe.png",
      destinations: [
        {
          name: t("destFrance", { fallback: "France" }),
          description: t("destFranceDesc", {
            fallback:
              "From the Eiffel Tower to the hidden gems of the countryside.",
          }),
        },
        {
          name: t("destSpain", { fallback: "Spain" }),
          description: t("destSpainDesc", {
            fallback: "Paella in Barcelona, wine tasting in Montserrat.",
          }),
        },
        {
          name: t("destIceland", { fallback: "Iceland" }),
          description: t("destIcelandDesc", {
            fallback:
              "Volcanoes, glaciers, and the Northern Lights \u2013 Iceland like you've never seen.",
          }),
        },
        {
          name: t("destUK", { fallback: "United Kingdom" }),
          description: t("destUKDesc", {
            fallback: "Scottish highlands and cinematic adventures in the UK.",
          }),
        },
      ],
    },
    {
      key: "asia",
      name: t("regionAsia", { fallback: "Asia" }),
      image: "/images/excursion/asia.png",
      destinations: [
        {
          name: t("destSouthKorea", { fallback: "South Korea" }),
          description: t("destSouthKoreaDesc", {
            fallback:
              "Explore Seoul's modern beauty and the history of the DMZ.",
          }),
        },
        {
          name: t("destJapan", { fallback: "Japan" }),
          description: t("destJapanDesc", {
            fallback: "From the temples of Kyoto to the neon lights of Osaka.",
          }),
        },
        {
          name: t("destBali", { fallback: "Bali" }),
          description: t("destBaliDesc", {
            fallback:
              "Discover volcanic adventures, lush jungles, and serene beaches.",
          }),
        },
      ],
    },
    {
      key: "americas",
      name: t("regionAmericas", { fallback: "The Americas" }),
      image: "/images/excursion/americas.png",
      destinations: [
        {
          name: t("destUSA", { fallback: "USA" }),
          description: t("destUSADesc", {
            fallback: "Snorkeling in Oahu, exploring New York City, and more!",
          }),
        },
        {
          name: t("destDominican", { fallback: "Dominican Republic" }),
          description: t("destDominicanDesc", {
            fallback:
              "Jungle expeditions and beachside relaxation in Punta Cana.",
          }),
        },
        {
          name: t("destPeru", { fallback: "Peru" }),
          description: t("destPeruDesc", {
            fallback: "Journey through sacred valleys and ancient wonders.",
          }),
        },
        {
          name: t("destBahamas", { fallback: "Bahamas" }),
          description: t("destBahamasDesc", {
            fallback:
              "Swim with pigs, relax on perfect beaches, and dive into crystal-clear waters.",
          }),
        },
      ],
    },
    {
      key: "middleEast",
      name: t("regionMiddleEast", { fallback: "Middle East" }),
      image: "/images/excursion/middle-east.png",
      destinations: [
        {
          name: t("destUAE", { fallback: "United Arab Emirates" }),
          description: t("destUAEDesc", {
            fallback: "Soak in the luxury of Dubai and its iconic skyline.",
          }),
        },
      ],
    },
    {
      key: "oceania",
      name: t("regionOceania", {
        fallback: "Oceania & Pacific Islands",
      }),
      image: "/images/excursion/oceania.png",
      destinations: [
        {
          name: t("destMaldives", { fallback: "Maldives" }),
          description: t("destMaldivesDesc", {
            fallback:
              "Snorkel with dolphins, unwind on private sandbanks, and live the dream.",
          }),
        },
        {
          name: t("destAruba", { fallback: "Aruba" }),
          description: t("destArubaDesc", {
            fallback:
              "Sail the coast, explore hidden coves, and discover the island's wild beauty.",
          }),
        },
        {
          name: t("destTenerife", { fallback: "Tenerife" }),
          description: t("destTenerifeDesc", {
            fallback:
              "Whale watching and eco-friendly ocean tours in the Canary Islands.",
          }),
        },
      ],
    },
  ];

  return (
    <section className={styles.explore}>
      <div className="container">
        <motion.div
          className={styles.explore__inner}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
        >
          <h2 className={styles.explore__title}>
            {t("exploreTitle", {
              fallback: "Explore Our Global Excursions",
            })}
          </h2>

          <div className={styles.explore__list}>
            {regions.map((region) => (
              <article key={region.key} className={styles.explore__card}>
                <div className={styles.explore__cardBg}>
                  <Image
                    src={region.image}
                    alt={region.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 1280px"
                  />
                  <div className={styles.explore__cardGradient} />
                </div>

                <h3 className={styles.explore__regionName}>{region.name}</h3>

                <div className={styles.explore__destinations}>
                  {region.destinations.map((dest) => (
                    <div
                      key={dest.name}
                      className={styles.explore__destination}
                    >
                      <h4>{dest.name}</h4>
                      <p>{dest.description}</p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className={styles.explore__cta}>
            <Button variant="orange" url="/tours" type="link">
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
              <span>{t("packYourBags", { fallback: "Pack Your Bags!" })}</span>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
