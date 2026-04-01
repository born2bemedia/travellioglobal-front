"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./BikesWhy.module.scss";



export const BikesWhy = () => {
  const t = useTranslations("bikesPage");

  const WHY_ITEMS = [
    {
      key: "01",
      icon: "/images/bikes/icon-globe.svg",
      title: t("whyGlobalTitle", {
        fallback: "Worldwide Locations",
      }),
      description: t("whyGlobalDescription", {
        fallback: "Available in major cities and adventure hotspots.",
      }),
    },
    {
      key: "02",
      icon: "/images/bikes/icon-lifebuoy.svg",
      title: t("whySupportTitle", {
        fallback: "Flexible Returns",
      }),
      description: t("whySupportDescription", {
        fallback: "Pick up here. Drop off there.",
      }),
    },
    {
      key: "03",
      icon: "/images/bikes/icon-link.svg",
      title: t("whyFlexibleTitle", {
        fallback: "Reliable Partners",
      }),
      description: t("whyFlexibleDescription", {
        fallback: "Well-maintained vehicles and professional providers.",
      }),
    },
    {
      key: "04",
      icon: "/images/bikes/icon-handshake.svg",
      title: t("whyTrustTitle", {
        fallback: "Freedom Guaranteed",
      }),
      description: t("whyTrustDescription", {
        fallback:
          "As sometimes the journey matters more than the destination.",
      }),
    },
  ] as const;

  return (
    <section className={styles.why}>
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <h2 className={styles.why__title}>
            {t("whyTitle", {
              fallback: "Why Ride with Travellio Global?",
            })}
          </h2>

          <div className={styles.why__grid}>
            {WHY_ITEMS.map((item) => (
              <article key={item.key} className={styles.why__card}>
                <div className={styles.why__content}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>

                <div className={styles.why__bottom}>
                  <span className={styles.why__number}>{item.key}.</span>
                  <Image src={item.icon} alt="" width={60} height={60} />
                </div>
              </article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
