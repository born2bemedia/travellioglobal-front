"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./TaxiWhy.module.scss";

type WhyCard = {
  key: string;
  title: string;
  subtitle: string;
  image: string;
};

export const TaxiWhy = () => {
  const t = useTranslations("taxiPage");

  const cards: WhyCard[] = [
    {
      key: "booking",
      title: t("whyBookingTitle", { fallback: "Effortless Booking" }),
      subtitle: t("whyBookingDesc", {
        fallback: "Reserve your transfer in minutes.",
      }),
      image: "/images/taxi/why-booking.png",
    },
    {
      key: "reliable",
      title: t("whyReliableTitle", { fallback: "Reliable & Secure" }),
      subtitle: t("whyReliableDesc", {
        fallback: "Trusted providers and verified drivers.",
      }),
      image: "/images/taxi/why-reliable.png",
    },
    {
      key: "worldwide",
      title: t("whyWorldwideTitle", { fallback: "Worldwide Coverage" }),
      subtitle: t("whyWorldwideDesc", {
        fallback:
          "Airport and city transfers across global destinations.",
      }),
      image: "/images/taxi/why-worldwide.png",
    },
    {
      key: "comfort",
      title: t("whyComfortTitle", { fallback: "Comfort First" }),
      subtitle: t("whyComfortDesc", {
        fallback:
          "Clean vehicles. Professional service. No surprises.",
      }),
      image: "/images/taxi/why-comfort.png",
    },
  ];

  return (
    <section className={styles.why}>
      <div className="container">
        <motion.div
          className={styles.why__inner}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeInUp}
        >
          <h2 className={styles.why__title}>
            {t("whyTitle", {
              fallback: "Why Ride with Travellio Global?",
            })}
          </h2>

          <div className={styles.why__grid}>
            {cards.map((card) => (
              <article key={card.key} className={styles.why__card}>
                <div className={styles.why__cardBg}>
                  <Image
                    src={card.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 631px"
                    className={styles.why__cardImage}
                  />
                  <div className={styles.why__cardOverlay} />
                </div>
                <div className={styles.why__cardContent}>
                  <h3 className={styles.why__cardTitle}>{card.title}</h3>
                  <p className={styles.why__cardSubtitle}>{card.subtitle}</p>
                </div>
              </article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
