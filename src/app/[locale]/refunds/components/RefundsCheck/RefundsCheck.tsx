"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import { RefundsClaimForm } from "../RefundsClaimForm";
import styles from "./RefundsCheck.module.scss";

type StatCard = {
  key: string;
  number: string;
  title: string;
  icon: string;
};

export const RefundsCheck = () => {
  const t = useTranslations("refundsPage");

  const statCards: StatCard[] = [
    {
      key: "refunds",
      number: "01.",
      title: t("checkStat1Title", { fallback: "Refunds" }),
      icon: "/images/refunds/stat-credit-card.svg",
    },
    {
      key: "compensation",
      number: "02.",
      title: t("checkStat2Title", { fallback: "Compensation" }),
      icon: "/images/refunds/stat-money.svg",
    },
    {
      key: "reimbursement",
      number: "03.",
      title: t("checkStat3Title", { fallback: "Reimbursement options" }),
      icon: "/images/refunds/stat-hand-coins.svg",
    },
  ];

  const supportBullets = [
    t("checkNeed1", { fallback: "Your flight number" }),
    t("checkNeed2", { fallback: "Travel date" }),
    t("checkNeed3", { fallback: "Departure & arrival airports" }),
  ];

  return (
    <section className={styles.check}>
      <div className="container">
        <motion.div
          className={styles.check__card}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeInUp}
        >
          <div className={styles.check__media}>
            <Image
              src="/images/refunds/check-desktop.png"
              alt=""
              fill
              sizes="(max-width: 768px) 0px, 1280px"
              className={styles.check__imageDesktop}
            />
            <Image
              src="/images/refunds/check-desktop.png"
              alt=""
              width={1280}
              height={1617}
              className={styles.check__imageMobile}
            />
            <div className={styles.check__overlay} />
          </div>

          <div className={styles.check__header}>
            <h2 className={styles.check__title}>
              {t("checkTitle", {
                fallback: "Check Your Flight in Minutes",
              })}
            </h2>

            <div className={styles.check__copy}>
              <p>{t("checkSidebarLead", { fallback: "All we need:" })}</p>
              <ul>
                {supportBullets.map((bullet, index) => (
                  <li key={index}>{bullet}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.check__content}>
            <div className={styles.check__formWrap}>
              <RefundsClaimForm />
            </div>

            <h3 className={styles.check__eligibility}>
              {t("checkEligibilityTitle", {
                fallback:
                  "Our system reviews your situation and lets you know if you’re eligible for:",
              })}
            </h3>

            <div className={styles.check__stats}>
              {statCards.map((card) => (
                <article key={card.key} className={styles.stat}>
                  <div className={styles.stat__top}>
                    <h3>{card.title}</h3>
                  </div>
                  <div className={styles.stat__bottom}>
                    <span>{card.number}</span>
                    <Image src={card.icon} alt="" width={60} height={60} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
