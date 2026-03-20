"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./PlacesRegions.module.scss";

type Destination = {
  name: string;
  description: string;
};

type RegionTone = "light" | "dark";
type RegionVariant = "medium" | "tall" | "compact";

type Region = {
  key: string;
  name: string;
  subtitle: string;
  image: string;
  tone: RegionTone;
  variant: RegionVariant;
  destinations: Destination[];
};

export const PlacesRegions = () => {
  const t = useTranslations("placesPage");

  const regions: Region[] = [
    {
      key: "europe",
      name: t("regionEurope", { fallback: "Europe" }),
      subtitle: t("regionEuropeSubtitle", {
        fallback: "Classic Charm Meets Vibrant Culture",
      }),
      image: "/images/places/europe-figma.png",
      tone: "light",
      variant: "medium",
      destinations: [
        {
          name: t("destParisFrance", { fallback: "Paris, France" }),
          description: t("destParisFranceDesc", {
            fallback:
              "Stroll along the Seine River, marvel at the Eiffel Tower, and discover the art of French cuisine.",
          }),
        },
        {
          name: t("destBarcelonaSpain", { fallback: "Barcelona, Spain" }),
          description: t("destBarcelonaSpainDesc", {
            fallback:
              "Experience the mesmerizing architecture of Gaudi at Sagrada Familia, and indulge in authentic paella on the Mediterranean coast.",
          }),
        },
        {
          name: t("destMontserratSpain", { fallback: "Montserrat, Spain" }),
          description: t("destMontserratSpainDesc", {
            fallback:
              "Tucked away in the mountains near Barcelona, this stunning monastery offers breathtaking views and a taste of Catalonian history.",
          }),
        },
        {
          name: t("destReykjavikIceland", { fallback: "Reykjavik, Iceland" }),
          description: t("destReykjavikIcelandDesc", {
            fallback:
              "Start your Icelandic adventure in the quirky capital, then venture to natural wonders like the Golden Circle and Blue Lagoon.",
          }),
        },
        {
          name: t("destScottishHighlandsUK", {
            fallback: "Scottish Highlands, UK",
          }),
          description: t("destScottishHighlandsUKDesc", {
            fallback:
              "Experience Loch Ness, hike through the misty hills, and explore Edinburgh's Royal Mile.",
          }),
        },
      ],
    },
    {
      key: "asia",
      name: t("regionAsia", { fallback: "Asia" }),
      subtitle: t("regionAsiaSubtitle", {
        fallback: "A Tapestry of Ancient Traditions and Modern Wonders",
      }),
      image: "/images/places/asia-figma.png",
      tone: "dark",
      variant: "tall",
      destinations: [
        {
          name: t("destKyotoJapan", { fallback: "Kyoto, Japan" }),
          description: t("destKyotoJapanDesc", {
            fallback:
              "Immerse yourself in ancient temples and lush gardens, or experience a traditional tea ceremony in this peaceful cultural hub.",
          }),
        },
        {
          name: t("destTokyoJapan", { fallback: "Tokyo, Japan" }),
          description: t("destTokyoJapanDesc", {
            fallback:
              "Dive into Shibuya's neon-lit streets, visit the historic Meiji Shrine, or shop till you drop in Harajuku.",
          }),
        },
        {
          name: t("destNamiIslandSouthKorea", {
            fallback: "Nami Island, South Korea",
          }),
          description: t("destNamiIslandSouthKoreaDesc", {
            fallback:
              "Famous for its picturesque tree-lined paths, Nami Island offers a peaceful retreat from Seoul's urban hustle.",
          }),
        },
        {
          name: t("destBaliIndonesia", { fallback: "Bali, Indonesia" }),
          description: t("destBaliIndonesiaDesc", {
            fallback:
              "Explore Ubud's rich culture, trek up Mount Batur for a sunrise view, or indulge in a relaxing beach getaway at Jimbaran.",
          }),
        },
        {
          name: t("destPetiteFranceSouthKorea", {
            fallback: "Petite France, South Korea",
          }),
          description: t("destPetiteFranceSouthKoreaDesc", {
            fallback:
              "Step into this French-themed village, nestled in the Garden of Morning Calm, and enjoy an immersive cultural experience.",
          }),
        },
      ],
    },
    {
      key: "americas",
      name: t("regionAmericas", { fallback: "The Americas" }),
      subtitle: t("regionAmericasSubtitle", {
        fallback: "From City Streets to Natural Wonders",
      }),
      image: "/images/places/americas-figma.png",
      tone: "light",
      variant: "tall",
      destinations: [
        {
          name: t("destNewYorkCityUSA", { fallback: "New York City, USA" }),
          description: t("destNewYorkCityUSADesc", {
            fallback:
              "From Times Square to the Statue of Liberty, Central Park, and Broadway, New York offers the ultimate urban experience.",
          }),
        },
        {
          name: t("destOahuHawaiiUSA", { fallback: "Oahu, Hawaii, USA" }),
          description: t("destOahuHawaiiUSADesc", {
            fallback:
              "Snorkel with sea turtles at Hanauma Bay, hike the Diamond Head crater, or relax on the stunning beaches of Waikiki.",
          }),
        },
        {
          name: t("destLimaPeru", { fallback: "Lima, Peru" }),
          description: t("destLimaPeruDesc", {
            fallback:
              "Explore the cultural capital, then head to Machu Picchu for the ultimate Incan adventure.",
          }),
        },
        {
          name: t("destBallestasIslandsPeru", {
            fallback: "Ballestas Islands, Peru",
          }),
          description: t("destBallestasIslandsPeruDesc", {
            fallback:
              "Take a boat trip to these natural islands and witness sea lions, penguins, and exotic birds in their natural habitat.",
          }),
        },
        {
          name: t("destPuntaCanaDominican", {
            fallback: "Punta Cana, Dominican Republic",
          }),
          description: t("destPuntaCanaDominicanDesc", {
            fallback:
              "Immerse yourself in lush jungles with a buggy adventure, or lounge on the stunning shores of Macao Beach.",
          }),
        },
        {
          name: t("destRoseIslandBahamas", {
            fallback: "Rose Island, Bahamas",
          }),
          description: t("destRoseIslandBahamasDesc", {
            fallback:
              "Swim with pigs and explore the crystal-clear waters of this tropical paradise.",
          }),
        },
      ],
    },
    {
      key: "middleEast",
      name: t("regionMiddleEast", { fallback: "Middle East" }),
      subtitle: t("regionMiddleEastSubtitle", {
        fallback: "Luxurious Adventures and Timeless Traditions",
      }),
      image: "/images/places/middle-east-figma.png",
      tone: "dark",
      variant: "compact",
      destinations: [
        {
          name: t("destDubaiUAE", { fallback: "Dubai, UAE" }),
          description: t("destDubaiUAEDesc", {
            fallback:
              "Experience luxury shopping, adventure in the Dubai Desert, and take in stunning views from the Burj Khalifa, the tallest building in the world.",
          }),
        },
        {
          name: t("destAbuDhabiUAE", { fallback: "Abu Dhabi, UAE" }),
          description: t("destAbuDhabiUAEDesc", {
            fallback:
              "Visit the Sheikh Zayed Grand Mosque and explore the emirate's world-class museums and cultural sites.",
          }),
        },
      ],
    },
    {
      key: "oceania",
      name: t("regionOceania", {
        fallback: "Oceania & Pacific Islands",
      }),
      subtitle: t("regionOceaniaSubtitle", {
        fallback: "Tropical Bliss Awaits",
      }),
      image: "/images/places/oceania-figma.png",
      tone: "dark",
      variant: "compact",
      destinations: [
        {
          name: t("destMaldives", { fallback: "Maldives" }),
          description: t("destMaldivesDesc", {
            fallback:
              "Paradise on Earth - white-sand beaches, luxury resorts, and world-class snorkeling, where dolphins and vibrant coral reefs await.",
          }),
        },
        {
          name: t("destTenerifeSpain", {
            fallback: "Tenerife, Canary Islands, Spain",
          }),
          description: t("destTenerifeSpainDesc", {
            fallback:
              "Whale-watching and dolphin eco-tours in the Atlantic Ocean, or hike the Teide National Park for spectacular volcanic landscapes.",
          }),
        },
        {
          name: t("destAruba", { fallback: "Aruba" }),
          description: t("destArubaDesc", {
            fallback:
              "Perfect beaches, secluded coves, and Aruba's famous clear waters - ideal for snorkeling, sailing, and unforgettable sunsets.",
          }),
        },
      ],
    },
  ];

  return (
    <section className={styles.regions}>
      <motion.div
        className={styles.regions__inner}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08 }}
        variants={fadeInUp}
      >
        <div className={styles.regions__list}>
          {regions.map((region, index) => (
            <section
              key={region.key}
              className={`${styles.regions__section} ${
                index === 0 ? styles.regions__sectionFirst : ""
              }`}
            >
              <div className="container">
                <article
                  className={`${styles.regions__card} ${
                    region.tone === "light"
                      ? styles.regions__cardLight
                      : styles.regions__cardDark
                  } ${
                    region.variant === "tall"
                      ? styles.regions__cardTall
                      : region.variant === "compact"
                        ? styles.regions__cardCompact
                        : styles.regions__cardMedium
                  }`}
                >
                  <div className={styles.regions__cardImage}>
                    <Image
                      src={region.image}
                      alt={region.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 45vw, 631px"
                    />
                  </div>

                  <div className={styles.regions__cardContent}>
                    <div className={styles.regions__cardHeader}>
                      <h2 className={styles.regions__regionName}>
                        {region.name}
                      </h2>
                      <p className={styles.regions__regionSubtitle}>
                        {region.subtitle}
                      </p>
                    </div>

                    <div className={styles.regions__destinations}>
                      {region.destinations.map((dest) => (
                        <div
                          key={dest.name}
                          className={styles.regions__destination}
                        >
                          <div className={styles.regions__destinationHead}>
                            <span
                              className={styles.regions__destinationDot}
                              aria-hidden="true"
                            />
                            <span className={styles.regions__destinationName}>
                              {dest.name}
                            </span>
                          </div>
                          <p>{dest.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              </div>
            </section>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
