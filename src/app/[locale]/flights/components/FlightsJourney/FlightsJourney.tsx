"use client";

import type { CSSProperties } from "react";
import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./FlightsJourney.module.scss";

const PINS = [
  { price: "$245", top: "39.95%", left: "63.34%" },
  { price: "$535", top: "45.09%", left: "53.07%" },
  { price: "$432", top: "29.90%", left: "49.23%" },
  { price: "$282", top: "49.99%", left: "68.40%" },
  { price: "$581", top: "14.23%", left: "62.27%" },
  { price: "$994", top: "75.25%", left: "50.92%" },
  { price: "$891", top: "62.02%", left: "57.06%" },
  { price: "$991", top: "68.14%", left: "19.02%" },
  { price: "$931", top: "45.09%", left: "18.40%" },
  { price: "$1031", top: "53.17%", left: "6.59%" },
  { price: "$1531", top: "85.29%", left: "29.29%" },
  { price: "$1582", top: "62.02%", left: "87.42%" },
  { price: "$882", top: "44.84%", left: "83.59%" },
  { price: "$1432", top: "36.77%", left: "3.22%" },
] as const;

export const FlightsJourney = () => {
  const t = useTranslations("flightsPage");

  return (
    <section className={styles.journey}>
      <div className="container">
        <motion.div
          className={styles.journey__card}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeInUp}
        >
          <div className={styles.journey__map}>
            <Image
              src="/images/flights/journey-map.png"
              alt=""
              fill
              sizes="(max-width: 768px) 328px, 610px"
              className={styles.journey__mapImage}
            />

            {PINS.map((pin) => (
              <div
                key={`${pin.price}-${pin.top}-${pin.left}`}
                className={styles.journey__pin}
                style={
                  {
                    "--pin-top": pin.top,
                    "--pin-left": pin.left,
                  } as CSSProperties
                }
              >
                <span>{pin.price}</span>
                <Image
                  src="/images/flights/price-pin-tail.svg"
                  alt=""
                  width={16}
                  height={11}
                />
              </div>
            ))}
          </div>

          <div className={styles.journey__content}>
            <div className={styles.journey__copy}>
              <div className={styles.journey__heading}>
                <h2>
                  {t("journeyTitle", {
                    fallback: "Customise Your Journey",
                  })}
                </h2>
                <p>
                  {t("journeySubtitle", {
                    fallback: "Your flight, your way.",
                  })}
                </p>
              </div>

              <p className={styles.journey__description}>
                {t("journeyDescription", {
                  fallback:
                    "We offer flexible search options to customize your travel experience. Looking for a one-way ticket, a round-trip journey, or a nonstop flight, you can personalize your search to match your needs.",
                })}
              </p>
            </div>

            <ul className={styles.journey__list}>
              <li>
                {t("journeyPointRoundTrip", {
                  fallback:
                    "One-Way or Round-Trip: Choose what works best for your trip.",
                })}
              </li>
              <li>
                {t("journeyPointNonStop", {
                  fallback:
                    "Non-Stop Flights: For those who want to get to their destination as quickly as possible.",
                })}
              </li>
              <li>
                {t("journeyPointFlexible", {
                  fallback:
                    "Flexible Dates: Adjust your plans with ease, no stress.",
                })}
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
