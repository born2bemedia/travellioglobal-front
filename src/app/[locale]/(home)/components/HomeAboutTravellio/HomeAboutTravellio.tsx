"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./HomeAboutTravellio.module.scss";

export const HomeAboutTravellio = () => {
  const t = useTranslations("homeAboutTravellio");

  const ORBIT_IMAGES = [
    {
      key: "topLeft",
      src: "/images/home/section-about/about-circle-left.webp",
      alt: t("topLeft", { fallback: "Wildlife destination" }),
      className: "home_about_travellio__orbit--topLeft",
    },
    {
      key: "bottomLeft",
      src: "/images/home/section-about/about-circle-base.webp",
      alt: t("bottomLeft", { fallback: "Luxury retreat" }),
      className: "home_about_travellio__orbit--bottomLeft",
    },
    {
      key: "topRight",
      src: "/images/home/section-about/about-circle-top.webp",
      alt: t("topRight", { fallback: "Northern lights" }),
      className: "home_about_travellio__orbit--topRight",
    },
    {
      key: "bottomRight",
      src: "/images/home/section-about/about-circle-right.webp",
      alt: t("bottomRight", { fallback: "City escape" }),
      className: "home_about_travellio__orbit--bottomRight",
    },
  ] as const;

  const VALUE_CARDS = [
    {
      key: "flexibleBookings",
      image: "/images/home/section-about/flexible-bookings.webp",
      title: t("flexibleBookingsTitle", { fallback: "Flexible bookings" }),
      description: t("flexibleBookingsDescription", {
        fallback: "Free cancellations. Smart rescheduling. No drama.",
      }),
    },
    {
      key: "globalAccess",
      image: "/images/home/section-about/global-access.webp",
      title: t("globalAccessTitle", { fallback: "Global access" }),
      description: t("globalAccessDescription", {
        fallback: "50,000+ tours and travel experiences worldwide.",
      }),
    },
    {
      key: "smartDeals",
      image: "/images/home/section-about/smart-deals.webp",
      title: t("smartDealsTitle", { fallback: "Smart deals" }),
      description: t("smartDealsDescription", {
        fallback: "Premium experiences without premium stress.",
      }),
    },
  ] as const;

  return (
    <section className={styles.home_about_travellio}>
      <div className="container">
        <div className={styles.home_about_travellio__content}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeInUp}
            className={styles.home_about_travellio__intro}
          >
            {ORBIT_IMAGES.map((item) => (
              <div
                key={item.key}
                className={`${styles.home_about_travellio__orbit} ${
                  styles[item.className]
                }`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="150px"
                />
              </div>
            ))}

            <div className={styles.home_about_travellio__headline}>
              <h2>
                {t("titleLineOne", { fallback: "About Travellio" })}
                <span>{t("titleLineTwo", { fallback: "Global" })}</span>
              </h2>

              <div className={styles.home_about_travellio__description}>
                <p>
                  {t("descriptionLead", {
                    fallback: "We don’t just book trips. We craft escapes.",
                  })}
                </p>
                <p>
                  {t("descriptionBody", {
                    fallback:
                      "Travellio Global was created for people who want to travel effortlessly while still having unforgettable experiences.",
                  })}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={fadeInUp}
            className={styles.home_about_travellio__cards}
          >
            <article className={styles.home_about_travellio__card}>
              <Image
                src={VALUE_CARDS[0].image}
                alt={VALUE_CARDS[0].title}
                fill
                sizes="(max-width: 1024px) 100vw, 25vw"
              />
              <div className={styles.home_about_travellio__card_overlay}>
                <h3>
                  {VALUE_CARDS[0].title}
                </h3>
                <p>
                  {VALUE_CARDS[0].description}
                </p>
              </div>
            </article>

            <article className={styles.home_about_travellio__card}>
              <Image
                src={VALUE_CARDS[1].image}
                alt={VALUE_CARDS[1].title}
                fill
                sizes="(max-width: 1024px) 100vw, 25vw"
              />
              <div className={styles.home_about_travellio__card_overlay}>
                <h3>
                  {VALUE_CARDS[1].title}
                </h3>
                <p>
                  {VALUE_CARDS[1].description}
                </p>
              </div>
            </article>

            <div
              className={styles.home_about_travellio__arrowCard}
              aria-hidden="true"
            >
              <Image
                src="/images/home/section-about/arrow-right.svg"
                alt=""
                width={245}
                height={235}
              />
            </div>

            <article className={styles.home_about_travellio__card}>
              <Image
                src={VALUE_CARDS[2].image}
                alt={VALUE_CARDS[2].title}
                fill
                sizes="(max-width: 1024px) 100vw, 25vw"
              />
              <div className={styles.home_about_travellio__card_overlay}>
                <h3>
                  {VALUE_CARDS[2].title}
                </h3>
                <p>
                  {VALUE_CARDS[2].description}
                </p>
              </div>
            </article>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
