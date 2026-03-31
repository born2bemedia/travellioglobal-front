"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { useLocale, useTranslations } from "next-intl";

import { useAuthStore } from "@/features/account/store/auth";

import {
  FACEBOOK_URL,
  INSTAGRAM_URL,
  WEBSITE_EMAIL,
  WEBSITE_PHONE,
  X_URL,
} from "@/shared/lib/constants/constants";
import {
  EmailIcon,
  FacebookIcon,
  InstagramIcon,
  PhoneIcon,
  XIcon,
} from "@/shared/ui/icons";

//import { LangSelector } from "../language-switcher/LangSelector";
import styles from "./Header.module.scss";

import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

type HeaderNavItem = {
  key: string;
  text: string;
  href?: string;
};

type HeaderDropdownItem = {
  key: string;
  text: string;
  href?: string;
};

type HeaderDropdown = {
  key: "addons" | "affiliates";
  text: string;
  items: readonly HeaderDropdownItem[];
};

const normalizePath = (path: string) => {
  if (path.length > 1 && path.endsWith("/")) {
    return path.slice(0, -1);
  }

  return path;
};

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isWhiteTopbar, setIsWhiteTopbar] = useState(false);
  const [openDesktopDropdown, setOpenDesktopDropdown] = useState<
    HeaderDropdown["key"] | null
  >(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<
    HeaderDropdown["key"] | null
  >(null);
  const pathname = usePathname();
  const locale = useLocale();
  const user = useAuthStore((state) => state.user);
  const fetchUser = useAuthStore((s) => s.fetchUser);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    const whiteTopbarPathnames = [
      "/tours",
      "/excursion",
      "/places",
      "/flights",
      "/visas",
    ];
    const isWhite = whiteTopbarPathnames.some((path) =>
      pathname.includes(path),
    );
    console.log(isWhite, isWhiteTopbar, pathname);
    if (isWhite !== isWhiteTopbar) {
      setTimeout(() => {
        setIsWhiteTopbar(isWhite);
      }, 0);
    }
  }, [pathname, isWhiteTopbar]);

  const t = useTranslations("header");

  const NAV_ITEMS: readonly HeaderNavItem[] = [
    { key: "home", text: t("home", { fallback: "Home" }), href: "/" },
    { key: "about", text: t("about", { fallback: "About" }), href: "/about" },
    { key: "tours", text: t("tours", { fallback: "Tours" }), href: "/tours" },
    {
      key: "excursions",
      text: t("excursions", { fallback: "Excursions" }),
      href: "/excursion",
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
    {
      key: "contacts",
      text: t("contacts", { fallback: "Contacts" }),
      href: "/contacts",
    },
  ] as const;

  const DROPDOWNS: readonly HeaderDropdown[] = [
    {
      key: "addons",
      text: t("addons", { fallback: "Add-Ons" }),
      items: [
        {
          key: "visas",
          text: t("visas", { fallback: "Visas" }),
          href: "/visas",
        },
        {
          key: "insurance",
          text: t("insurance", { fallback: "Insurance" }),
          href: "/insurance",
        },
        { key: "refunds", text: t("refunds", { fallback: "Refunds" }) },
        { key: "bikes", text: t("bikes", { fallback: "Bikes" }) },
        { key: "events", text: t("events", { fallback: "Events" }) },
      ],
    },
    {
      key: "affiliates",
      text: t("affiliates", { fallback: "Affiliates" }),
      items: [
        {
          key: "we-go-trip",
          text: t("weGoTrip", { fallback: "We Go Trip" }),
          href:
            "https://tp.media/r?marker=552524&trs=327401&p=4487&u=https%3A%2F%2Fwegotrip.com&campaign_id=150",
        },
        {
          key: "tiqets",
          text: t("tiqets", { fallback: "Tiqets" }),
          href:
            "https://tp.media/r?marker=552524&trs=327401&p=2074&u=https%3A%2F%2Ftiqets.com&campaign_id=89",
        },
        {
          key: "searadar",
          text: t("searadar", { fallback: "Searadar" }),
          href:
            "https://tp.media/r?marker=552524&trs=327401&p=5907&u=https%3A%2F%2Fsearadar.com&campaign_id=258",
        },
        {
          key: "qeeq",
          text: t("qeeq", { fallback: "QEEQ" }),
          href:
            "https://tp.media/r?marker=552524&trs=327401&p=4845&u=https%3A%2F%2Fqeeq.com&campaign_id=172",
        },
        {
          key: "iway",
          text: t("iway", { fallback: "I’way" }),
          href:
            "https://tp.media/click?shmarker=552524&promo_id=7544&source_type=link&type=click&campaign_id=142&trs=327401",
        },
        {
          key: "drimsim",
          text: t("drimsim", { fallback: "Drimsim" }),
          href:
            "https://tp.media/r?marker=552524&trs=327401&p=2762&u=https%3A%2F%2Fw1.drimsim.com&campaign_id=102",
        },
      ],
    },
  ] as const;

  const getLocalizedHref = (href: string) => {
    if (href === "/") {
      return locale === routing.defaultLocale ? "/" : `/${locale}`;
    }

    return locale === routing.defaultLocale ? href : `/${locale}${href}`;
  };

  const isActivePath = (href: string) => {
    return normalizePath(pathname) === normalizePath(getLocalizedHref(href));
  };

  const renderNavItem = (item: HeaderNavItem, mobileIndex?: number) => {
    const content = (
      <>
        <span>{item.text}</span>
        {typeof mobileIndex === "number" && <span>0{mobileIndex + 1}</span>}
      </>
    );

    if (item.href) {
      return (
        <Link
          key={item.key}
          href={item.href}
          className={`${styles.header__navItem} ${
            isActivePath(item.href) ? styles.active : ""
          }`}
        >
          {content}
        </Link>
      );
    }

    return (
      <button key={item.key} type="button" className={styles.header__navItem}>
        {content}
      </button>
    );
  };

  const renderMobileNavItem = (item: HeaderNavItem) => {
    if (item.href) {
      return (
        <Link
          key={item.key}
          href={item.href}
          className={`${styles.header__mobileNavItem} ${
            isActivePath(item.href) ? styles.active : ""
          }`}
        >
          {item.text}
        </Link>
      );
    }

    return (
      <button
        key={item.key}
        type="button"
        className={styles.header__mobileNavItem}
      >
        {item.text}
      </button>
    );
  };

  const renderDropdownItem = (item: HeaderDropdownItem) => {
    if (item.href) {
      return (
        <Link
          key={item.key}
          href={item.href}
          className={styles.header__dropdownItem}
        >
          {item.text}
        </Link>
      );
    }

    return (
      <button
        key={item.key}
        type="button"
        className={styles.header__dropdownItem}
      >
        {item.text}
      </button>
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMobileMenuOpen(false);
      setOpenDesktopDropdown(null);
      setOpenMobileDropdown(null);
    }, 0);

    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = overflow;
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <div
        className={`${styles.header__topbar} ${
          isWhiteTopbar ? styles.white : ""
        }`}
      >
        <div className="container">
          <div className={styles.header__topbar__inner}>
            <div className={styles.header__topbar__contacts}>
              <Link
                href={`mailto:${WEBSITE_EMAIL}`}
                className={styles.header__contactLink}
              >
                <span className={styles.header__contactIcon} aria-hidden="true">
                  <EmailIcon />
                </span>
                <span>{WEBSITE_EMAIL}</span>
              </Link>

              {WEBSITE_PHONE && (
                <Link
                  href={`tel:${WEBSITE_PHONE}`}
                  className={styles.header__contactLink}
                >
                  <span
                    className={styles.header__contactIcon}
                    aria-hidden="true"
                  >
                    <PhoneIcon />
                  </span>
                  <span>{WEBSITE_PHONE}</span>
                </Link>
              )}
            </div>

            <div className={styles.header__topbar_right_column}>
              <div className={styles.header__topbar__socials}>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </a>
                <a
                  href={X_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X"
                >
                  <XIcon />
                </a>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <FacebookIcon />
                </a>
              </div>

              <div className={styles.header__actions}>
                <Link
                  href={user ? "/account" : "/log-in"}
                  className={styles.header__login}
                >
                  <span>
                    {user
                      ? t("account", { fallback: "Account" })
                      : t("login", { fallback: "Login" })}
                  </span>
                </Link>

                {!user && (
                  <Link href="/sign-up" className={styles.header__signin}>
                    {t("sign-up", { fallback: "Sign up" })}
                  </Link>
                )}
                <Link href="/checkout" className={styles.header__wishlist}>
                  {t("cart", { fallback: "Cart" })}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <header
        className={`${styles.header} ${isMobileMenuOpen ? styles.open : ""} ${
          isScrolled ? styles.scrolled : ""
        }`}
      >
        <div className={styles.header__main}>
          <div className="container">
            <div className={styles.header__main__inner}>
              <div className={styles.header__left}>
                <Link
                  href="/"
                  className={styles.header__logo}
                  aria-label="Travellio Global"
                >
                  <Image
                    src="/images/logo.svg"
                    alt="travellioglobal"
                    width={168}
                    height={28}
                  />
                  <span className={styles.header__logoText}>Travellio</span>
                </Link>
              </div>

              <nav className={styles.header__nav}>
                {NAV_ITEMS.map((item) => renderNavItem(item))}
              </nav>

              <div className={styles.header__utilityNav}>
                {DROPDOWNS.map((dropdown) => {
                  const isOpen = openDesktopDropdown === dropdown.key;

                  return (
                    <div
                      key={dropdown.key}
                      className={styles.header__dropdown}
                      onMouseEnter={() => setOpenDesktopDropdown(dropdown.key)}
                      onMouseLeave={() => setOpenDesktopDropdown(null)}
                    >
                      <button
                        type="button"
                        className={`${styles.header__utilityButton} ${
                          isOpen ? styles.open : ""
                        }`}
                        onClick={() =>
                          setOpenDesktopDropdown((prev) =>
                            prev === dropdown.key ? null : dropdown.key,
                          )
                        }
                        aria-expanded={isOpen}
                      >
                        <span>{dropdown.text}</span>
                        <svg
                          className={styles.header__utilityChevron}
                          xmlns="http://www.w3.org/2000/svg"
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                        >
                          <path
                            d="M9.8668 3.71161L5.32157 7.87781C5.27936 7.91655 5.22923 7.94728 5.17405 7.96824C5.11888 7.98921 5.05973 8 5 8C4.94027 8 4.88112 7.98921 4.82594 7.96824C4.77077 7.94728 4.72064 7.91655 4.67842 7.87781L0.133201 3.71161C0.0479136 3.63344 0 3.52741 0 3.41685C0 3.3063 0.0479136 3.20027 0.133201 3.12209C0.218487 3.04392 0.334161 3 0.454775 3C0.575389 3 0.691063 3.04392 0.77635 3.12209L5 6.99406L9.22365 3.12209C9.26588 3.08338 9.31601 3.05268 9.37119 3.03173C9.42636 3.01078 9.4855 3 9.54522 3C9.60495 3 9.66408 3.01078 9.71926 3.03173C9.77444 3.05268 9.82457 3.08338 9.8668 3.12209C9.90903 3.1608 9.94253 3.20675 9.96538 3.25733C9.98824 3.3079 10 3.36211 10 3.41685C10 3.47159 9.98824 3.5258 9.96538 3.57637C9.94253 3.62695 9.90903 3.6729 9.8668 3.71161Z"
                            fill="#FFFDF1"
                          />
                        </svg>
                      </button>

                      <div
                        className={`${styles.header__dropdownMenuWrapper} ${
                          isOpen ? styles.open : ""
                        }`}
                      >
                        <div className={styles.header__dropdownMenu}>
                          {dropdown.items.map((item) =>
                            renderDropdownItem(item),
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className={styles.header__mobile_controls}>
                <button
                  type="button"
                  className={`${styles.header__burger} ${
                    isMobileMenuOpen ? styles.open : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                  aria-expanded={isMobileMenuOpen}
                  aria-controls="header-mobile-menu"
                  aria-label={
                    isMobileMenuOpen
                      ? t("close", { fallback: "Close" })
                      : t("menu", { fallback: "Menu" })
                  }
                >
                  <span
                    className={styles.header__burgerIcon}
                    aria-hidden="true"
                  >
                    <span />
                    <span />
                    <span />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          className={`${styles.header__mobile_backdrop} ${
            isMobileMenuOpen ? styles.open : ""
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label={t("close", { fallback: "Close" })}
        />
      </header>
      <div
        id="header-mobile-menu"
        className={`${styles.header__mobile_menu} ${
          isMobileMenuOpen ? styles.open : ""
        }`}
      >
        <div className={styles.header__mobile_menu_header}>
          <span
            className={styles.header__mobile_menu_spacer}
            aria-hidden="true"
          />
          <button
            type="button"
            className={styles.header__mobile_close}
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label={t("close", { fallback: "Close" })}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
            >
              <path
                d="M32.1346 30.3656C32.2507 30.4818 32.3428 30.6196 32.4057 30.7714C32.4686 30.9231 32.5009 31.0858 32.5009 31.25C32.5009 31.4142 32.4686 31.5769 32.4057 31.7286C32.3428 31.8804 32.2507 32.0182 32.1346 32.1344C32.0184 32.2505 31.8806 32.3426 31.7288 32.4055C31.5771 32.4683 31.4145 32.5007 31.2502 32.5007C31.086 32.5007 30.9233 32.4683 30.7716 32.4055C30.6198 32.3426 30.482 32.2505 30.3658 32.1344L20.0002 21.7672L9.63458 32.1344C9.40003 32.3689 9.08191 32.5007 8.75021 32.5007C8.4185 32.5007 8.10038 32.3689 7.86583 32.1344C7.63128 31.8998 7.49951 31.5817 7.49951 31.25C7.49951 30.9183 7.63128 30.6002 7.86583 30.3656L18.233 20L7.86583 9.63437C7.63128 9.39982 7.49951 9.0817 7.49951 8.74999C7.49951 8.41829 7.63128 8.10017 7.86583 7.86562C8.10038 7.63107 8.4185 7.4993 8.75021 7.4993C9.08191 7.4993 9.40003 7.63107 9.63458 7.86562L20.0002 18.2328L30.3658 7.86562C30.6004 7.63107 30.9185 7.4993 31.2502 7.4993C31.5819 7.4993 31.9 7.63107 32.1346 7.86562C32.3691 8.10017 32.5009 8.41829 32.5009 8.74999C32.5009 9.0817 32.3691 9.39982 32.1346 9.63437L21.7674 20L32.1346 30.3656Z"
                fill="#FFFDF1"
              />
            </svg>
          </button>
        </div>

        <nav className={styles.header__mobile_nav}>
          {NAV_ITEMS.map((item) => renderMobileNavItem(item))}
        </nav>

        <div className={styles.header__mobileShortcuts}>
          {DROPDOWNS.map((dropdown) => {
            const isOpen = openMobileDropdown === dropdown.key;

            return (
              <div key={dropdown.key} className={styles.header__mobileDropdown}>
                <button
                  type="button"
                  className={`${styles.header__utilityButton} ${
                    isOpen ? styles.open : ""
                  }`}
                  onClick={() =>
                    setOpenMobileDropdown((prev) =>
                      prev === dropdown.key ? null : dropdown.key,
                    )
                  }
                  aria-expanded={isOpen}
                >
                  <span>{dropdown.text}</span>
                  <svg
                    className={styles.header__utilityChevron}
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M9.8668 3.71161L5.32157 7.87781C5.27936 7.91655 5.22923 7.94728 5.17405 7.96824C5.11888 7.98921 5.05973 8 5 8C4.94027 8 4.88112 7.98921 4.82594 7.96824C4.77077 7.94728 4.72064 7.91655 4.67842 7.87781L0.133201 3.71161C0.0479136 3.63344 0 3.52741 0 3.41685C0 3.3063 0.0479136 3.20027 0.133201 3.12209C0.218487 3.04392 0.334161 3 0.454775 3C0.575389 3 0.691063 3.04392 0.77635 3.12209L5 6.99406L9.22365 3.12209C9.26588 3.08338 9.31601 3.05268 9.37119 3.03173C9.42636 3.01078 9.4855 3 9.54522 3C9.60495 3 9.66408 3.01078 9.71926 3.03173C9.77444 3.05268 9.82457 3.08338 9.8668 3.12209C9.90903 3.1608 9.94253 3.20675 9.96538 3.25733C9.98824 3.3079 10 3.36211 10 3.41685C10 3.47159 9.98824 3.5258 9.96538 3.57637C9.94253 3.62695 9.90903 3.6729 9.8668 3.71161Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>

                {isOpen && (
                  <div className={styles.header__mobileDropdownMenu}>
                    {dropdown.items.map((item) => renderDropdownItem(item))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className={styles.header__mobile_actions}>
          <Link
            href={user ? "/account" : "/log-in"}
            className={styles.header__btn_login}
          >
            <span>
              {user
                ? t("account", { fallback: "Account" })
                : t("login", { fallback: "Login" })}
            </span>
          </Link>
          {!user && (
            <Link href="/sign-up" className={styles.header__btn_signin}>
              {t("sign-up", { fallback: "Sign up" })}
            </Link>
          )}
          <Link href="/checkout" className={styles.header__btn_cart}>
            {t("cart", { fallback: "Cart" })}
          </Link>
        </div>
      </div>
    </>
  );
};
