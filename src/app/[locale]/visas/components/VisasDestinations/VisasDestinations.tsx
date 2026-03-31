"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import { countryCodeToFlag, getVisaFlagSrc } from "../../lib/flags";
import styles from "./VisasDestinations.module.scss";

type DestinationCard = {
  key: string;
  countryCode: string;
  title: string;
  description: string;
  imageDesktop: string;
  imageMobile: string;
};

const IVISA_URL = "https://www.ivisa.com";

export const VisasDestinations = () => {
  const t = useTranslations("visasPage");

  const destinations: DestinationCard[] = [
    {
      key: "canada",
      countryCode: "ca",
      title: t("destination1Title", { fallback: "Canada e-Visa" }),
      description: t("destination1Description", {
        fallback:
          "Secure your travel authorisation quickly and prepare to explore vast landscapes and vibrant cities.",
      }),
      imageDesktop: "/images/visas/destination-canada-desktop.png",
      imageMobile: "/images/visas/destination-canada-mobile.png",
    },
    {
      key: "vietnam",
      countryCode: "vn",
      title: t("destination2Title", { fallback: "Vietnam Visa" }),
      description: t("destination2Description", {
        fallback:
          "Apply with ease and get ready to experience rich culture, incredible cuisine, and stunning scenery.",
      }),
      imageDesktop: "/images/visas/destination-vietnam-desktop.png",
      imageMobile: "/images/visas/destination-vietnam-mobile.png",
    },
    {
      key: "australia",
      countryCode: "au",
      title: t("destination3Title", { fallback: "Australia Visa" }),
      description: t("destination3Description", {
        fallback:
          "Streamline your plans to visit iconic coastlines, cities, and natural wonders.",
      }),
      imageDesktop: "/images/visas/destination-australia-desktop.png",
      imageMobile: "/images/visas/destination-australia-mobile.png",
    },
    {
      key: "kenya",
      countryCode: "ke",
      title: t("destination4Title", { fallback: "Kenya Visa" }),
      description: t("destination4Description", {
        fallback:
          "Simplify your safari preparations and focus on the adventure ahead.",
      }),
      imageDesktop: "/images/visas/destination-kenya-desktop.png",
      imageMobile: "/images/visas/destination-kenya-mobile.png",
    },
    {
      key: "china",
      countryCode: "cn",
      title: t("destination5Title", { fallback: "China Visa" }),
      description: t("destination5Description", {
        fallback:
          "Prepare seamlessly to discover historic landmarks and modern marvels.",
      }),
      imageDesktop: "/images/visas/destination-china-desktop.png",
      imageMobile: "/images/visas/destination-china-mobile.png",
    },
    {
      key: "mexico",
      countryCode: "mx",
      title: t("destination6Title", { fallback: "Mexico Tourist Card" }),
      description: t("destination6Description", {
        fallback:
          "Get ready for colorful cities, beaches, and unforgettable experiences.",
      }),
      imageDesktop: "/images/visas/destination-mexico-desktop.png",
      imageMobile: "/images/visas/destination-mexico-mobile.png",
    },
  ];

  return (
    <section className={styles.destinations}>
      <div className="container">
        <motion.div
          className={styles.destinations__inner}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
        >
          <div className={styles.destinations__heading}>
            <h2 className={styles.destinations__title}>
              {t("destinationsTitle", {
                fallback: "Popular Visa Destinations",
              })}
            </h2>
            <p className={styles.destinations__subtitle}>
              {t("destinationsSubtitle", {
                fallback:
                  "We assist with entry processes for destinations including:",
              })}
            </p>
          </div>

          <div className={styles.destinations__grid}>
            {destinations.map((destination) => (
              <a
                key={destination.key}
                href={IVISA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.card}
                aria-label={t("destinationLinkLabel", {
                  destination: destination.title,
                  fallback: `Open ${destination.title} on iVisa`,
                })}
              >
                <div className={styles.card__media}>
                  <Image
                    src={destination.imageDesktop}
                    alt={destination.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 630px"
                    className={`${styles.card__image} ${styles.card__imageDesktop}`}
                  />
                  <Image
                    src={destination.imageMobile}
                    alt={destination.title}
                    fill
                    sizes="100vw"
                    className={`${styles.card__image} ${styles.card__imageMobile}`}
                  />
                  <div className={styles.card__overlay} />

                  <div className={styles.card__top}>
                    <div className={styles.card__header}>
                      {getVisaFlagSrc(destination.countryCode) ? (
                        <Image
                          src={getVisaFlagSrc(destination.countryCode)!}
                          alt=""
                          width={40}
                          height={28}
                          className={styles.card__flagImage}
                        />
                      ) : (
                        <span className={styles.card__flag} aria-hidden="true">
                          {countryCodeToFlag(destination.countryCode)}
                        </span>
                      )}
                      <h3 className={styles.card__title}>{destination.title}</h3>
                    </div>

                    <span className={styles.card__arrow} aria-hidden="true">
                      <Image
                        src="/images/visas/destination-arrow.svg"
                        alt=""
                        width={31}
                        height={30}
                      />
                    </span>
                  </div>

                  <p className={styles.card__description}>
                    {destination.description}
                  </p>
                </div>

                <div className={styles.card__bookmark}>
                  <Image
                    src="/images/visas/destination-bookmark.svg"
                    alt=""
                    width={24}
                    height={24}
                  />
                </div>

                <span className={styles.card__cta}>
                  <span>
                    {t("discoverMore", {
                      fallback: "Discover more",
                    })}
                  </span>
                  <Image
                    src="/images/visas/destination-chevron.svg"
                    alt=""
                    width={24}
                    height={24}
                  />
                </span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
