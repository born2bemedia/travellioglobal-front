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

import { InstagramIcon } from "../../icons";
import { FacebookIcon } from "../../icons/socials/facebook";
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
    { key: "tours", text: t("tours", { fallback: "Tours" }), href: "/tours" },
    {
      key: "excursions",
      text: t("excursions", { fallback: "Excursions" }),
      href: "/excursions",
    },
    {
      key: "places",
      text: t("places", { fallback: "Places" }),
      href: "/places",
    },
    {
      key: "flights",
      text: t("flights", { fallback: "Flights" }),
      href: "/flights",
    },
    { key: "cars", text: t("cars", { fallback: "Cars" }), href: "/cars" },
    { key: "bikes", text: t("bikes", { fallback: "Bikes" }), href: "/bikes" },
    {
      key: "events",
      text: t("events", { fallback: "Events" }),
      href: "/events",
    },
    { key: "taxi", text: t("taxi", { fallback: "Taxi" }), href: "/taxi" },
    {
      key: "journal",
      text: t("journal", { fallback: "Journal" }),
      href: "/journal",
    },
  ] as const;

  const MOBILE_TRAVEL_HUB_ITEMS: readonly FooterLinkItem[] = [
    { key: "tours", text: t("tours", { fallback: "Tours" }), href: "/tours" },
    {
      key: "excursions",
      text: t("excursions", { fallback: "Excursions" }),
      href: "/excursions",
    },
    {
      key: "places",
      text: t("places", { fallback: "Places" }),
      href: "/places",
    },
    {
      key: "flights",
      text: t("flights", { fallback: "Flights" }),
      href: "/flights",
    },
    { key: "cars", text: t("cars", { fallback: "Cars" }), href: "/cars" },
    { key: "taxi", text: t("taxi", { fallback: "Taxi" }), href: "/taxi" },
    {
      key: "journal",
      text: t("journal", { fallback: "Journal" }),
      href: "/journal",
    },
  ] as const;

  const POLICY_ITEMS: readonly FooterLinkItem[] = [
    {
      key: "terms",
      text: t("terms-and-conditions", { fallback: "Terms and Conditions" }),
      href: "/legal/terms-and-conditions",
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
      href: "/legal/affiliate-disclaimer",
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

  const MOBILE_PARTNER_LOGOS: readonly FooterPartnerItem[] = [
    {
      key: "tiqets",
      src: "/images/footer/partners/tiqets.svg",
      alt: "Tiqets",
      width: 150,
      height: 41,
    },
    {
      key: "drimsim",
      src: "/images/footer/partners/drimsim.svg",
      alt: "Drimsim",
      width: 150,
      height: 41,
    },
    {
      key: "sixt",
      src: "/images/footer/partners/sixt.svg",
      alt: "Sixt",
      width: 150,
      height: 63,
    },
    {
      key: "booking",
      src: "/images/footer/partners/booking.svg",
      alt: "Booking.com",
      width: 150,
      height: 25,
    },
    {
      key: "qeeq",
      src: "/images/footer/partners/qeeq.svg",
      alt: "QEEQ.COM",
      width: 150,
      height: 33,
    },
    {
      key: "kiwi",
      src: "/images/footer/partners/kiwi.svg",
      alt: "Kiwi.com",
      width: 150,
      height: 74,
    },
    {
      key: "discovercars",
      src: "/images/footer/partners/discovercarscom.svg",
      alt: "Discover Cars",
      width: 150,
      height: 41,
    },
    {
      key: "rentalcars",
      src: "/images/footer/partners/rentalcarscom.svg",
      alt: "Rentalcars.com",
      width: 150,
      height: 24,
    },
    {
      key: "make-my-trip",
      src: "/images/footer/partners/make-my-trip.svg",
      alt: "Make My Trip",
      width: 150,
      height: 48,
    },
    {
      key: "searadar",
      src: "/images/footer/partners/searadar.svg",
      alt: "Searadar",
      width: 150,
      height: 24,
    },
    {
      key: "wegotrip",
      src: "/images/footer/partners/wegotrip.svg",
      alt: "WeGoTrip",
      width: 150,
      height: 47,
    },
    {
      key: "aviasales",
      src: "/images/footer/partners/aviasales.svg",
      alt: "Aviasales",
      width: 136,
      height: 72,
    },
    {
      key: "iway",
      src: "/images/footer/partners/iway.svg",
      alt: "iway",
      width: 150,
      height: 63,
    },
    {
      key: "skyscanner",
      src: "/images/footer/partners/skyscanner.svg",
      alt: "Skyscanner",
      width: 150,
      height: 27,
    },
  ] as const;

  const phoneValue = WEBSITE_PHONE || "";
  const registeredAddress = WEBSITE_REGISTERED_ADDRESS || "";
  const officeAddress = WEBSITE_OFFICE_ADDRESS || "";

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
                {INSTAGRAM_URL && (
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className={styles.footer__socialLink}
                >
                  <InstagramIcon />
                </a>
                )}
                {X_URL && (
                <a
                  href={X_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X"
                  className={styles.footer__socialLink}
                >
                  <XIcon />
                </a>
                )}
                {FACEBOOK_URL && (
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className={styles.footer__socialLink}
                >
                  <FacebookIcon />
                </a>
                )}
              </div>
            </div>

            <div className={styles.footer__columns}>
              <div className={styles.footer__column}>
                <h3>{t("travel-hub", { fallback: "Travel Hub" })}</h3>
                <div
                  className={`${styles.footer__linkList} ${styles["footer__linkList--desktop"]}`}
                >
                  {TRAVEL_HUB_ITEMS.map((item) =>
                    renderFooterLink(item, styles.footer__linkItem),
                  )}
                </div>
                <div
                  className={`${styles.footer__linkList} ${styles["footer__linkList--mobile"]}`}
                >
                  {MOBILE_TRAVEL_HUB_ITEMS.map((item) =>
                    renderFooterLink(item, styles.footer__linkItem),
                  )}
                </div>
              </div>

              <div className={styles.footer__column}>
                <h3>{t("stay-connected", { fallback: "Stay Connected" })}</h3>
                <div className={styles.footer__contacts}>
                  <p>Vellio Int Ltd</p>
                  {phoneValue && (
                    <p>
                      <strong>
                        {t("phone-number", { fallback: "Phone number" })}:
                      </strong>{" "}
                      <Link href={`tel:${phoneValue}`}>{phoneValue}</Link>
                    </p>
                  )}
                  <p>
                    <strong>{t("footer-email", { fallback: "Email" })}:</strong>{" "}
                    <Link href={`mailto:${WEBSITE_EMAIL}`}>
                      {WEBSITE_EMAIL}
                    </Link>
                  </p>
                  <div className={styles.footer__address}>
                    <strong>
                      {t("footer-registered-address", {
                        fallback: "Registered address",
                      })}
                      :
                    </strong>{" "}
                    <span>{registeredAddress}</span>
                    <div
                      className={`${styles.footer__addressMap} ${styles["footer__addressMap--embed"]}`}
                      dangerouslySetInnerHTML={{
                        __html: WEBSITE_REGISTERED_ADDRESS_MAP,
                      }}
                    />
                    <div
                      className={`${styles.footer__addressMap} ${styles["footer__addressMap--image"]}`}
                    >
                      <Image
                        src="/images/footer/mobile-office-map.svg"
                        alt=""
                        width={179}
                        height={100}
                        unoptimized
                      />
                    </div>
                  </div>
                  <div className={styles.footer__address}>
                    <strong>
                      {t("footer-office-address", {
                        fallback: "Office address",
                      })}
                      :
                    </strong>{" "}
                    <span>{officeAddress}</span>
                    <div
                      className={`${styles.footer__addressMap} ${styles["footer__addressMap--embed"]}`}
                      dangerouslySetInnerHTML={{
                        __html: WEBSITE_OFFICE_ADDRESS_MAP,
                      }}
                    />
                  </div>
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
            <div
              className={styles.footer__partnersMobileGrid}
              aria-hidden="true"
            >
              {MOBILE_PARTNER_LOGOS.map((item) => (
                <div
                  key={item.key}
                  className={styles.footer__partnerLogoMobile}
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
          </div>
        </div>
      </div>

      <div className={styles.footer__partnersMarquee}>
        <div className={styles.footer__partnersTrack} aria-hidden="true">
          {PARTNER_LOGOS.map((item) => (
            <div
              key={`${item.key}-loop-1`}
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
              key={`${item.key}-loop-2`}
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
