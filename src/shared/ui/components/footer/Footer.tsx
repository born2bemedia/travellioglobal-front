"use client";

import Image from "next/image";

import { useTranslations } from "next-intl";

import {
  FACEBOOK_URL,
  INSTAGRAM_URL,
  WEBSITE_EMAIL,
  WEBSITE_OFFICE_ADDRESS,
  WEBSITE_OFFICE_ADDRESS_MAP,
  WEBSITE_PHONE,
  WEBSITE_REGISTERED_ADDRESS,
  WEBSITE_REGISTERED_ADDRESS_MAP,
  X_URL,
} from "@/shared/lib/constants/constants";

import { FacebookIcon } from "../../icons/socials/facebook";
import { LinkedinIcon } from "../../icons/socials/linkedin";
import { XIcon } from "../../icons/socials/x";
import styles from "./Footer.module.scss";

import { Link } from "@/i18n/navigation";

type FooterLinkItem = {
  key: string;
  text: string;
  href?: string;
};

type FooterPartnerItem = {
  key: string;
  src: string;
  alt: string;
  width: number;
  height: number;
};

const renderFooterLink = (item: FooterLinkItem, className: string) => {
  if (item.href) {
    return (
      <Link key={item.key} href={item.href} className={className}>
        {item.text}
      </Link>
    );
  }

  return (
    <span key={item.key} className={className}>
      {item.text}
    </span>
  );
};

export const Footer = () => {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  const TRAVEL_HUB_ITEMS: readonly FooterLinkItem[] = [
    { key: "tours", text: t("tours", { fallback: "Tours" }) },
    { key: "excursions", text: t("excursions", { fallback: "Excursions" }) },
    { key: "places", text: t("places", { fallback: "Places" }) },
    { key: "flights", text: t("flights", { fallback: "Flights" }) },
    { key: "cars", text: t("cars", { fallback: "Cars" }) },
    { key: "taxi", text: t("taxi", { fallback: "Taxi" }) },
    {
      key: "journal",
      text: t("journal", { fallback: "Journal" }),
      href: "/ideas",
    },
  ] as const;

  const POLICY_ITEMS: readonly FooterLinkItem[] = [
    {
      key: "terms",
      text: t("terms-and-conditions", { fallback: "Terms and Conditions" }),
      href: "/legal/terms-of-use",
    },
    {
      key: "privacy",
      text: t("privacy-policy-full", { fallback: "Privacy Policy" }),
      href: "/legal/privacy-policy",
    },
    {
      key: "cookie",
      text: t("cookie-policy-full", { fallback: "Cookie Policy" }),
      href: "/legal/cookie-policy",
    },
    {
      key: "refund",
      text: t("refund-policy-full", { fallback: "Refund Policy" }),
      href: "/legal/refund-policy",
    },
    {
      key: "affiliate",
      text: t("affiliate-disclaimer", { fallback: "Affiliate Disclaimer" }),
    },
  ] as const;

  const PARTNER_LOGOS: readonly FooterPartnerItem[] = [
    {
      key: "qeeq",
      src: "/images/footer/partners/qeeq.svg",
      alt: "QEEQ.COM",
      width: 150,
      height: 33,
    },
    {
      key: "discovercars",
      src: "/images/footer/partners/discovercarscom.svg",
      alt: "Discover Cars",
      width: 150,
      height: 41,
    },
    {
      key: "searadar",
      src: "/images/footer/partners/searadar.svg",
      alt: "Searadar",
      width: 150,
      height: 24,
    },
    {
      key: "rentalcars",
      src: "/images/footer/partners/rentalcarscom.svg",
      alt: "Rentalcars.com",
      width: 150,
      height: 24,
    },
    {
      key: "aviasales",
      src: "/images/footer/partners/aviasales.svg",
      alt: "Aviasales",
      width: 136,
      height: 72,
    },
    {
      key: "kiwi",
      src: "/images/footer/partners/kiwi.svg",
      alt: "Kiwi.com",
      width: 150,
      height: 74,
    },
    {
      key: "make-my-trip",
      src: "/images/footer/partners/make-my-trip.svg",
      alt: "Make My Trip",
      width: 150,
      height: 48,
    },
    {
      key: "booking",
      src: "/images/footer/partners/booking.svg",
      alt: "Booking.com",
      width: 150,
      height: 25,
    },
  ] as const;

  const phoneValue = WEBSITE_PHONE;
  const registeredAddress =
    WEBSITE_REGISTERED_ADDRESS ||
    t("address-placeholder", { fallback: "Address" });
  const officeAddress =
    WEBSITE_OFFICE_ADDRESS || t("address-placeholder", { fallback: "Address" });

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footer__inner}>
          <div className={styles.footer__top}>
            <div className={styles.footer__brand}>
              <Link href="/" className={styles.footer__wordmark}>
                <Image
                  src="/images/logo_footer.svg"
                  alt="Travellio"
                  width={168}
                  height={28}
                  unoptimized
                />
              </Link>

              <div className={styles.footer__socials}>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className={styles.footer__socialLink}
                >
                  <LinkedinIcon />
                </a>
                <a
                  href={X_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X"
                  className={styles.footer__socialLink}
                >
                  <XIcon />
                </a>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className={styles.footer__socialLink}
                >
                  <FacebookIcon />
                </a>
              </div>
            </div>

            <div className={styles.footer__columns}>
              <div className={styles.footer__column}>
                <h3>{t("travel-hub", { fallback: "Travel Hub" })}</h3>
                <div className={styles.footer__linkList}>
                  {TRAVEL_HUB_ITEMS.map((item) =>
                    renderFooterLink(item, styles.footer__linkItem),
                  )}
                </div>
              </div>

              <div className={styles.footer__column}>
                <h3>{t("stay-connected", { fallback: "Stay Connected" })}</h3>
                <div className={styles.footer__contacts}>
                  <p>
                    {t("company-name", { fallback: "Travellio Limited UK" })}
                  </p>
                  <p>
                    <strong>{t("footer-email", { fallback: "Email" })}:</strong>{" "}
                    <Link href={`mailto:${WEBSITE_EMAIL}`}>
                      {WEBSITE_EMAIL}
                    </Link>
                  </p>
                  {phoneValue && (
                    <p>
                      <strong>
                        {t("phone-number", { fallback: "Phone number" })}:
                      </strong>{" "}
                      <Link href={`tel:${phoneValue}`}>{phoneValue}</Link>
                    </p>
                  )}
                  <p>
                    <strong>
                      {t("footer-registered-address", {
                        fallback: "Registered address",
                      })}
                      :
                    </strong>{" "}
                    <span>{registeredAddress}</span>
                    <div
                      className={styles.footer__addressMap}
                      dangerouslySetInnerHTML={{
                        __html: WEBSITE_REGISTERED_ADDRESS_MAP,
                      }}
                    />
                  </p>
                  <p>
                    <strong>
                      {t("footer-office-address", {
                        fallback: "Office address",
                      })}
                      :
                    </strong>{" "}
                    <span>{officeAddress}</span>
                    <div
                      className={styles.footer__addressMap}
                      dangerouslySetInnerHTML={{
                        __html: WEBSITE_OFFICE_ADDRESS_MAP,
                      }}
                    />
                  </p>
                </div>
              </div>

              <div className={styles.footer__column}>
                <h3>
                  {t("policies-and-terms", { fallback: "Policies & Terms" })}
                </h3>
                <div className={styles.footer__linkList}>
                  {POLICY_ITEMS.map((item) =>
                    renderFooterLink(item, styles.footer__linkItem),
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.footer__partners}>
            <p className={styles.footer__partnersTitle}>
              {t("partners-title", {
                fallback:
                  "Partnering with industry leaders to make your journey effortless.",
              })}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.footer__partnersTrack} aria-hidden="true">
        {PARTNER_LOGOS.map((item) => (
          <div
            key={`${item.key}-duplicate`}
            className={styles.footer__partnerLogo}
          >
            <Image
              src={item.src}
              alt=""
              width={item.width}
              height={item.height}
            />
          </div>
        ))}
        {PARTNER_LOGOS.map((item) => (
          <div
            key={`${item.key}-duplicate`}
            className={styles.footer__partnerLogo}
          >
            <Image
              src={item.src}
              alt=""
              width={item.width}
              height={item.height}
            />
          </div>
        ))}
      </div>

      <div className="container">
        <div className={styles.footer__bottom}>
          <p className={styles.footer__bottomText}>© {year} Vellio Int Ltd.</p>
          <p className={styles.footer__bottomText}>
            {t("crafted-for-travellers", {
              fallback: "Crafted for global travellers. All rights reserved.",
            })}
          </p>
        </div>
      </div>
    </footer>
  );
};
