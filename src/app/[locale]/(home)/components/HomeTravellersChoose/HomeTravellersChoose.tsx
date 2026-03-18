"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./HomeTravellersChoose.module.scss";

export const HomeTravellersChoose = () => {
  const t = useTranslations("homeTravellersChoose");

  const highlights = [
    {
      title: t("seamlessTitle", {
        fallback: "Seamless booking for flights, hotels, and tours",
      }),
    },
    {
      title: t("destinationsTitle", {
        fallback:
          "Handpicked destinations across Europe, Asia, the Americas & beyond",
      }),
    },
    {
      title: t("toolsTitle", {
        fallback: "Intuitive planning tools that actually make sense",
      }),
    },
    {
      title: t("partnersTitle", {
        fallback: "Secure partnerships with global travel leaders",
      }),
    },
  ] as const;

  return (
    <section className={styles.home_travellers_choose}>
      <div className="container">
        <motion.div
          className={styles.home_travellers_choose__banner}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <div className={styles.home_travellers_choose__media}>
            <Image
              src="/images/home/section-travellers/travellers-bg.webp"
              alt={t("backgroundAlt", {
                fallback: "Mountain landscape background",
              })}
              fill
              sizes="100vw"
            />
          </div>

          <div className={styles.home_travellers_choose__overlay} />

          <div className={styles.home_travellers_choose__content}>
            <div className={styles.home_travellers_choose__copy}>
              <div className={styles.home_travellers_choose__headline}>
                <h2>
                  {t("title", {
                    fallback: "Travellers Choose Travellio Global",
                  })}
                </h2>
                <p>
                  {t("description", {
                    fallback:
                      "Travel should feel exciting, not complicated. We make it effortless, so you can focus on the adventure.",
                  })}
                </p>
              </div>

              <strong>
                {t("tagline", {
                  fallback: "You dream it. We map it.",
                })}
              </strong>
            </div>

            <div className={styles.home_travellers_choose__highlights}>
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className={styles.home_travellers_choose__highlight}
                >
                  <p>{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
