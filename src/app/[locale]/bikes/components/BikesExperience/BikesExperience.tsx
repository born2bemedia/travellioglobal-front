"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./BikesExperience.module.scss";

export const BikesExperience = () => {
  const t = useTranslations("bikesPage");

  const EXPERIENCE_ROWS = [
    {
      key: "customised",
      title: t("experienceCustomisedTitle", {
        fallback: "Customised Riding Experience",
      }),
      lead: t("experienceCustomisedLead", {
        fallback: "Your trip is unique — your ride should be too.",
      }),
      subtitle: t("experienceCustomisedSubtitle", {
        fallback: "Choose from:",
      }),
      list: [
        t("experienceCustomisedList1", {
          fallback: "Urban-friendly models",
        }),
        t("experienceCustomisedList2", {
          fallback: "Touring motorcycles",
        }),
        t("experienceCustomisedList3", {
          fallback: "Sport performance bikes",
        }),
        t("experienceCustomisedList4", {
          fallback: "Comfortable cruisers",
        }),
      ] as const,
      foot: t("experienceCustomisedFoot", {
        fallback:
          "Optional gear available, including helmets and navigation support, so you can focus on the road ahead.",
      }),
    },
    {
      key: "speed",
      title: t("experienceSpeedTitle", {
        fallback: "Explore at Your Own Speed",
      }),
      lead: t("experienceSpeedLead", {
        fallback: "Forget schedules. Forget crowded tours.",
      }),
      subtitle: t("experienceSpeedSubtitle", {
        fallback: "With a bike, you decide:",
      }),
      list: [
        t("experienceSpeedList1", {
          fallback: "When to stop",
        }),
        t("experienceSpeedList2", {
          fallback: "Where to turn",
        }),
        t("experienceSpeedList3", {
          fallback: "How far to go",
        }),
      ] as const,
      foot: t("experienceSpeedFoot", {
        fallback:
          "Discover quiet villages, scenic coastal roads, mountain passes, and vibrant city districts — all on your terms.",
      }),
    },
  ] as const;

  return (
    <section className={styles.experience}>
      <div className="container">
        <motion.div
          className={styles.experience__table}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          {EXPERIENCE_ROWS.map((row, index) => (
            <div
              key={row.key}
              className={`${styles.experience__row} ${
                index > 0 ? styles["experience__row--divider"] : ""
              }`}
            >
              <div className={styles.experience__heading}>
                <h2>{row.title}</h2>
              </div>

              <div className={styles.experience__body}>
                <p>{row.lead}</p>

                <ul>
                  {row.list.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>

                <p>{row.foot}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
