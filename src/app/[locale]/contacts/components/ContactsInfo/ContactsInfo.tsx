"use client";

import Image from "next/image";

import { useTranslations } from "next-intl";

import styles from "./ContactsInfo.module.scss";

export const ContactsInfo = () => {
  const t = useTranslations("contactsPage");

  return (
    <section className={styles.info}>
      <div className="container">
        {/* Email Us */}
        <div className={styles.info__address}>
          <div className={styles.info__addressContent}>
            <h2 className={styles.info__heading}>
              {t("emailUsTitle", { fallback: "Email Us" })}
            </h2>
          </div>
          <div className={styles.info__email}>
            <a
              href="mailto:info@travellioglobal.com"
              className={styles.info__emailLink}
            >
              info@travellioglobal.com
            </a>
          </div>
        </div>

        {/* Registered Address */}
        <div className={styles.info__address}>
          <div className={styles.info__addressContent}>
            <h2 className={styles.info__heading}>
              {t("registeredAddressTitle", { fallback: "Registered Address" })}
            </h2>
            <p className={styles.info__addressText}>
              {t("registeredAddress", {
                fallback:
                  "2nd Floor College House, 17 King Edwards Road, Ruislip, London, United Kingdom, HA4 7AE",
              })}
            </p>
          </div>
          <div className={styles.info__map}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2479.6!2d-0.4317!3d51.5756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876126f3d93e1b1%3A0x0!2s17%20King%20Edwards%20Road%2C%20Ruislip%2C%20London%20HA4%207AE!5e0!3m2!1sen!2suk!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={t("registeredAddressTitle", {
                fallback: "Registered Address",
              })}
            />
          </div>
        </div>

        {/* Office Address */}
        <div className={styles.info__address}>
          <div className={styles.info__addressContent}>
            <h2 className={styles.info__heading}>
              {t("officeAddressTitle", { fallback: "Office Address" })}
            </h2>
            <p className={styles.info__addressText}>
              {t("officeAddress", {
                fallback:
                  "Suite 513, 5th Floor, Tuition House, 27-37 St. George\u2019s Road, London, SW19 4EU",
              })}
            </p>
          </div>
          <div className={styles.info__map}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2488.8!2d-0.1857!3d51.4138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487608a9b1b1b1b1%3A0x0!2sTuition%20House%2C%2027-37%20St%20Georges%20Road%2C%20London%20SW19%204EU!5e0!3m2!1sen!2suk!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={t("officeAddressTitle", { fallback: "Office Address" })}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
