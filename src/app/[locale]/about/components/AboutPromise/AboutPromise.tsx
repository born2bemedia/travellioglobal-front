"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./AboutPromise.module.scss";

type PromiseItem = {
  key: string;
  title: string;
  description: string;
};

export const AboutPromise = () => {
  const t = useTranslations("aboutPage");

  const items: PromiseItem[] = [
    {
      key: "customerCare",
      title: t("promiseCustomerCareTitle", {
        fallback: "Customer Care",
      }),
      description: t("promiseCustomerCareDescription", {
        fallback:
          "We don't just offer trips - we deliver experiences. Our customer support team is always ready to help with any questions, ensuring your journey is smooth and stress-free.",
      }),
    },
    {
      key: "sustainableTravel",
      title: t("promiseSustainableTitle", {
        fallback: "Sustainable Travel",
      }),
      description: t("promiseSustainableDescription", {
        fallback:
          "We care about the world we explore, which is why we prioritize eco-conscious travel options that help preserve the destinations we love.",
      }),
    },
    {
      key: "memories",
      title: t("promiseMemoriesTitle", {
        fallback: "Memories That Last",
      }),
      description: t("promiseMemoriesDescription", {
        fallback:
          "Every journey with Travellio Global is more than a vacation - it's a chance to explore, discover, and immerse yourself in new cultures and unforgettable experiences.",
      }),
    },
  ];

  return (
    <section className={styles.promise}>
      <div className="container">
        <motion.div
          className={styles.promise__inner}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeInUp}
        >
          <h2 className={styles.promise__title}>
            {t("promiseTitle", { fallback: "Our Promise to You" })}
          </h2>

          <div className={styles.promise__grid}>
            <article className={styles.promise__card}>
              <div className={styles.promise__body}>
                <h3>{items[0].title}</h3>
                <p>{items[0].description}</p>
              </div>
            </article>

            <article className={styles.promise__card}>
              <div className={styles.promise__body}>
                <h3>{items[1].title}</h3>
                <p>{items[1].description}</p>
              </div>
            </article>

            <div
              className={`${styles.promise__card} ${styles.promise__arrowCard}`}
              aria-hidden="true"
            >
              <Image
                src="/images/about/arrow-card.svg"
                alt=""
                width={245}
                height={235}
                unoptimized
              />
            </div>

            <article className={styles.promise__card}>
              <div className={styles.promise__body}>
                <h3>{items[2].title}</h3>
                <p>{items[2].description}</p>
              </div>
            </article>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
