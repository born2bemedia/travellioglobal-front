"use client";

import { useTranslations } from "next-intl";

import {
  WEBSITE_EMAIL,
  WEBSITE_OFFICE_ADDRESS,
  WEBSITE_OFFICE_ADDRESS_MAP,
  WEBSITE_PHONE,
  WEBSITE_REGISTERED_ADDRESS,
  WEBSITE_REGISTERED_ADDRESS_MAP,
} from "@/shared/lib/constants/constants";

import styles from "./ContactsInfo.module.scss";

export const ContactsInfo = () => {
  const t = useTranslations("contactsPage");

  return (
    <section className={styles.info}>
      <div className="container">
        {/* Call Us */}
        <div className={styles.info__address}>
          <div className={styles.info__addressContent}>
            <h2 className={styles.info__heading}>
              {t("callUsTitle", { fallback: "Call Us" })}
            </h2>
          </div>
          <div className={styles.info__email}>
            <a href={`tel:${WEBSITE_PHONE}`} className={styles.info__emailLink}>
              {WEBSITE_PHONE}
            </a>
          </div>
        </div>
        {/* Email Us */}
        <div className={styles.info__address}>
          <div className={styles.info__addressContent}>
            <h2 className={styles.info__heading}>
              {t("emailUsTitle", { fallback: "Email Us" })}
            </h2>
          </div>
          <div className={styles.info__email}>
            <a
              href={`mailto:${WEBSITE_EMAIL}`}
              className={styles.info__emailLink}
            >
              {WEBSITE_EMAIL}
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
              {WEBSITE_REGISTERED_ADDRESS}
            </p>
          </div>
          <div
            className={styles.info__map}
            dangerouslySetInnerHTML={{ __html: WEBSITE_REGISTERED_ADDRESS_MAP }}
          />
        </div>

        {/* Office Address */}
        <div className={styles.info__address}>
          <div className={styles.info__addressContent}>
            <h2 className={styles.info__heading}>
              {t("officeAddressTitle", { fallback: "Office Address" })}
            </h2>
            <p className={styles.info__addressText}>{WEBSITE_OFFICE_ADDRESS}</p>
          </div>
          <div
            className={styles.info__map}
            dangerouslySetInnerHTML={{ __html: WEBSITE_OFFICE_ADDRESS_MAP }}
          />
        </div>
      </div>
    </section>
  );
};
