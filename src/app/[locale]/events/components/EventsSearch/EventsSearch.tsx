"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import { EventsSearchBar } from "../EventsSearchBar";
import styles from "./EventsSearch.module.scss";

export const EventsSearch = () => {
  const t = useTranslations("eventsPage");

  return (
    <motion.section
      className={styles.search}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeInUp}
    >
      <div className={styles.search__media}>
        <Image
          src="/images/events/search-desktop.png"
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 1280px"
          className={styles.search__imageDesktop}
        />
        <Image
          src="/images/events/search-mobile.png"
          alt=""
          fill
          sizes="100vw"
          className={styles.search__imageMobile}
        />
        <div className={styles.search__overlay} />
      </div>

      <div className={styles.search__content}>
        <div className={styles.search__top}>
          <h2 className={styles.search__title}>
            {t("searchTitle", {
              fallback: "Find Events That Move You",
            })}
          </h2>

          <div className={styles.search__text}>
            <p>
              {t("searchTextOne", {
                fallback:
                  "Looking for something specific? Or ready to be inspired?",
              })}
            </p>
            <p>
              {t("searchTextTwo", {
                fallback: "Our platform lets you search by:",
              })}
            </p>
            <ul>
              <li>
                {t("searchListOne", {
                  fallback: "Date",
                })}
              </li>
              <li>
                {t("searchListTwo", {
                  fallback: "Location",
                })}
              </li>
              <li>
                {t("searchListThree", {
                  fallback: "Artist or Performer",
                })}
              </li>
              <li>
                {t("searchListFour", {
                  fallback: "Category",
                })}
              </li>
            </ul>
            <p>
              {t("searchTextThree", {
                fallback:
                  "From intimate local shows to internationally acclaimed performances — your perfect event is just a few clicks away.",
              })}
            </p>
          </div>
        </div>

        <EventsSearchBar />
      </div>
    </motion.section>
  );
};
