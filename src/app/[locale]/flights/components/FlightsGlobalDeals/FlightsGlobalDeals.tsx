"use client";


import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { CustomExtraordinarySearchForm } from "@/features/extraordinary-search";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./FlightsGlobalDeals.module.scss";

export const FlightsGlobalDeals = () => {
  const t = useTranslations("flightsPage");

  return (
    <section className={styles.deals}>
      <div className="container">
        <motion.div
          className={styles.deals__inner}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeInUp}
        >
          <div className={styles.deals__intro}>
            <h2 className={styles.deals__title}>
              {t("globalAdventuresTitle", {
                fallback: "Your Ticket to Global Adventures",
              })}
            </h2>

            <div className={styles.deals__copy}>
              <p className={styles.deals__lead}>
                {t("globalAdventuresLead", {
                  fallback:
                    "Don’t let the price tag stop you from discovering the world.",
                })}
              </p>

              <p className={styles.deals__description}>
                {t("globalAdventuresDescription", {
                  fallback:
                    "At Travellio Global, we provide exclusive flight deals that help you get to your dream destination for less. No matter where you want to go, our platform ensures that affordable air travel is just a click away.",
                })}
              </p>

              <ul className={styles.deals__points}>
                <li>
                  <b>{t("globalAdventuresPointExclusiveTitle", {
                    fallback: "Exclusive Deals",
                  })}</b>
                    {t("globalAdventuresPointExclusive", {
                      fallback:
                        " Save on flights with special offers and discounts.",
                    })}
                </li>
                <li>
                  <b>{t("globalAdventuresPointGlobalTitle", {
                    fallback: "Global Reach",
                  })}</b>
                  {t("globalAdventuresPointGlobal", {
                    fallback:
                      "Flights to all major cities and hidden gems across the globe.",
                  })}
                </li>
                <li>
                  <b>{t("globalAdventuresPointDreamTitle", {
                    fallback: "Dream Destinations",
                  })}</b>
                  {t("globalAdventuresPointDream", {
                    fallback:
                      "Whether it’s the beaches of the Maldives or the history of Paris, we have options that suit your wanderlust.",
                  })}
                </li>
              </ul>
            </div>
          </div>

          <CustomExtraordinarySearchForm suggestedDestinationIata="DXB" />
        </motion.div>
      </div>
    </section>
  );
};
