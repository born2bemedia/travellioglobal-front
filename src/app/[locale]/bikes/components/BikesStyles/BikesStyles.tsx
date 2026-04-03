"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./BikesStyles.module.scss";



export const BikesStyles = () => {
  const t = useTranslations("bikesPage");

  const STYLE_CARDS = [
    {
      key: "bicycle",
      image: "/images/bikes/ride-bicycle.png",
      title: t("styleBicycleTitle", {
        fallback: "Bicycle Rentals",
      }),
      description: t("styleBicycleDescription", {
        fallback:
          "Perfect for scenic city routes, coastal rides, and discovering hidden streets at your own pace. ",
      }),
    },
    {
      key: "motorcycle",
      image: "/images/bikes/ride-motorcycle.png",
      title: t("styleMotorcycleTitle", {
        fallback: "Motorcycle Rentals",
      }),
      description: t("styleMotorcycleDescription", {
        fallback: "From classic cruisers to sport bikes — built for thrill-seekers and long-distance explorers.",
      }),
    },
    {
      key: "quad",
      image: "/images/bikes/ride-quad.png",
      title: t("styleQuadTitle", {
        fallback: "Quad Bike Rentals",
      }),
      description: t("styleQuadDescription", {
        fallback:
          "Take the adventure off-road and explore landscapes beyond the paved paths.",
      }),
    },
  ] as const;

  return (
    <section className={styles.styles}>
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <h2 className={styles.styles__title}>
            {t("stylesTitle", {
              fallback: "Choose Your Riding Style",
            })}
          </h2>

          <div className={styles.styles__grid}>
            {STYLE_CARDS.map((card) => (
              <article key={card.key} className={styles.styles__card}>
                <div className={styles.styles__media}>
                <Image
                    src={card.image} 
                    alt=""
                    fill
                    className={styles.styles__image}
                  />
                </div>

                <div className={styles.styles__content}>
                  <h3>
                    {card.title}
                  </h3>
                  <p>
                    {card.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
