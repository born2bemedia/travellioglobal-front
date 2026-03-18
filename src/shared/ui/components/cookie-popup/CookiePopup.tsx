"use client";

import { useEffect, useState } from "react";

import classNames from "classnames";
import { useTranslations } from "next-intl";

import { Button } from "@/shared/ui/kit/button/Button";

import styles from "./CookiePopup.module.scss";

import { Link } from "@/i18n/navigation";

export const CookiePopup = () => {
  const t = useTranslations("cookiePopup");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem("cookiesAccepted");
    const hasDeclined = localStorage.getItem("cookiesDeclined");
    if (!hasAccepted && !hasDeclined) {
      const id = setTimeout(() => setIsVisible(true), 0);
      return () => clearTimeout(id);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookiesDeclined", "true");
    setIsVisible(false);
  };

  return (
    <div
      className={classNames(styles.cookiePopup, {
        [styles.visible]: isVisible,
      })}
    >
      <h2>{t("title", { fallback: "Cookie settings" })}</h2>
      <p>
        {t("text", {
          fallback:
            "Cookies help us improve our website. By clicking Accept, you agree to our use of cookies for functionality, analytics, and personalized content. Learn more in our ",
        })}{" "}
        <Link href="/legal/cookie-policy">
          {t("link", { fallback: "Cookie Policy" })}
        </Link>
        .
      </p>
      <div className={styles.buttons}>
        <Button type="button" variant="blue" onClick={handleAccept}>
          {t("accept", { fallback: "Accept" })}
        </Button>
        <Button type="button" variant="bordered" onClick={handleDecline}>
          {t("decline", { fallback: "Decline" })}
        </Button>
      </div>
    </div>
  );
};
