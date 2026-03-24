"use client";

import Image from "next/image";

import { useTranslations } from "next-intl";

import styles from "./ContactsHero.module.scss";

export const ContactsHero = () => {
  const t = useTranslations("contactsPage");

  return (
    <section className={styles.hero}>
      <Image
        src="/images/home/hero-figma/dashed-path.svg"
        alt=""
        width={1858}
        height={513}
        className={styles.hero__decoration}
      />
      <div className="container">
        <h1 className={styles.hero__title}>
          {t("heroTitle", { fallback: "Talk Travel to Us" })}
        </h1>
        <div className={styles.hero__text}>
          <p className={styles.hero__subtitle}>
            {t("heroSubtitle", {
              fallback:
                "Questions? Ideas? Travel dreams waiting to happen? We'd love to hear from you.",
            })}
          </p>
          <p className={styles.hero__description}>
            {t("heroDescription", {
              fallback:
                "Whether you need help with a booking, want guidance on your next adventure, or simply have something to share, our team is ready to assist.",
            })}
          </p>
        </div>
      </div>
    </section>
  );
};
