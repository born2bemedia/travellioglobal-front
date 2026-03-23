"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./TaxiSchedule.module.scss";

type ScheduleCard = {
  key: string;
  number: string;
  title: string;
  icon: string;
};

export const TaxiSchedule = () => {
  const t = useTranslations("taxiPage");

  const cards: ScheduleCard[] = [
    {
      key: "pickup",
      number: "01.",
      title: t("schedulePickup", {
        fallback: "Choose your exact pickup time",
      }),
      icon: "/images/taxi/clock.svg",
    },
    {
      key: "dropoff",
      number: "02.",
      title: t("scheduleDropoff", {
        fallback: "Select flexible drop-off locations",
      }),
      icon: "/images/taxi/map-pin.svg",
    },
    {
      key: "airport",
      number: "03.",
      title: t("scheduleAirport", {
        fallback: "Airport transfers made seamless",
      }),
      icon: "/images/taxi/airplane-tilt.svg",
    },
    {
      key: "hotel",
      number: "04.",
      title: t("scheduleHotel", {
        fallback: "Hotel pickups without the hassle",
      }),
      icon: "/images/taxi/bed.svg",
    },
  ];

  return (
    <section className={styles.schedule}>
      <div className="container">
        <motion.div
          className={styles.schedule__inner}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeInUp}
        >
          <div className={styles.schedule__header}>
            <h2 className={styles.schedule__title}>
              {t("scheduleTitle", {
                fallback: "Your Time. Your Schedule.",
              })}
            </h2>
            <p className={styles.schedule__subtitle}>
              {t("scheduleSubtitleOne", {
                fallback:
                  "We adapt to your itinerary \u2014 not the other way around.",
              })}
              <br />
              {t("scheduleSubtitleTwo", {
                fallback: "Precision meets comfort every time.",
              })}
            </p>
          </div>

          <div className={styles.schedule__grid}>
            {cards.map((card) => (
              <article key={card.key} className={styles.schedule__card}>
                <h3 className={styles.schedule__cardTitle}>{card.title}</h3>
                <div className={styles.schedule__cardBottom}>
                  <span className={styles.schedule__cardNumber}>
                    {card.number}
                  </span>
                  <Image
                    src={card.icon}
                    alt=""
                    width={60}
                    height={60}
                    className={styles.schedule__cardIcon}
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
