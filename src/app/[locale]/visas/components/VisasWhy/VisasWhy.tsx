"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./VisasWhy.module.scss";

type ReasonCard = {
  key: string;
  title: string;
  description: string;
  imageDesktop: string;
  imageMobile: string;
};

export const VisasWhy = () => {
  const t = useTranslations("visasPage");

  const reasons: ReasonCard[] = [
    {
      key: "guidance",
      title: t("why1Title", { fallback: "Travel-Focused Guidance" }),
      description: t("why1Description", {
        fallback: "We understand journeys — not just documents.",
      }),
      imageDesktop: "/images/visas/why-guidance-desktop.png",
      imageMobile: "/images/visas/why-guidance-mobile.png",
    },
    {
      key: "clarity",
      title: t("why2Title", { fallback: "Flexible Drop-Off" }),
      description: t("why2Description", {
        fallback: "Clear instructions to avoid unnecessary delays.",
      }),
      imageDesktop: "/images/visas/why-clarity-desktop.png",
      imageMobile: "/images/visas/why-clarity-mobile.png",
    },
    {
      key: "reach",
      title: t("why3Title", { fallback: "International Reach" }),
      description: t("why3Description", {
        fallback: "Support for multiple destinations worldwide.",
      }),
      imageDesktop: "/images/visas/why-reach-desktop.png",
      imageMobile: "/images/visas/why-reach-mobile.png",
    },
    {
      key: "freedom",
      title: t("why4Title", { fallback: "Freedom to Explore" }),
      description: t("why4Description", {
        fallback: "Standard or priority options based on your timeline.",
      }),
      imageDesktop: "/images/visas/why-freedom-desktop.png",
      imageMobile: "/images/visas/why-freedom-mobile.png",
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
              fallback: "Why Choose Travellio Global for Visa Support?",
            })}
          </h2>

          <div className={styles.why__grid}>
            {reasons.map((reason) => (
              <article key={reason.key} className={styles.card}>
                <Image
                  src={reason.imageDesktop}
                  alt={reason.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 307px"
                  className={`${styles.card__image} ${styles.card__imageDesktop}`}
                />
                <Image
                  src={reason.imageMobile}
                  alt={reason.title}
                  fill
                  sizes="100vw"
                  className={`${styles.card__image} ${styles.card__imageMobile}`}
                />
                <div className={styles.card__overlay} />

                <div className={styles.card__content}>
                  <h3 className={styles.card__title}>{reason.title}</h3>
                  <p className={styles.card__description}>{reason.description}</p>
                </div>
              </article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
