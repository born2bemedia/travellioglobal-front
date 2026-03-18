"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./IdeasHero.module.scss";

export const IdeasHero = () => {
  const t = useTranslations("ideasHero");

  return (
    <section className={styles.ideas_hero}>
      <div className={"container"}>
        <div className={styles.ideas_hero__content}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className={styles.ideas_hero__left}
          >
            <Image
              src="/images/ideas/star1.svg"
              alt="Star 1"
              width={644}
              height={16}
            />
            <div>
              <h1>
                {t("title1", {
                  fallback: "Strategic insights for entrepreneurs.",
                })}
              </h1>
              <p>
                {t("description", {
                  fallback:
                    "A modern, action-oriented title that emphasizes strategic thinking and growth. Combines insightful and sharp ideas, perfect for entrepreneurs looking to fine-tune their approach.",
                })}
              </p>
            </div>
            <Image
              src="/images/ideas/star2.svg"
              alt="Star 1"
              width={644}
              height={16}
            />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className={styles.ideas_hero__right}
          >
            <Image
              src="/images/ideas/hero.png"
              alt="Ideas"
              width={600}
              height={600}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
