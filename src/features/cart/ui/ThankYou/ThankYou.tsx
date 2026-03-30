"use client";

import { useEffect, useState } from "react";

import { useTranslations } from "next-intl";

import type { CartItem } from "@/features/cart/store/cart";
import { CheckoutPageShell } from "@/features/cart/ui/CheckoutPageShell/CheckoutPageShell";

import { WEBSITE_EMAIL } from "@/shared/lib/constants/constants";
import { SuccessPageCard } from "@/shared/ui/components/SuccessPageCard/SuccessPageCard";

type LastOrder = {
  orderNumber: string;
  items: CartItem[];
  total: number;
};

export const ThankYou = () => {
  const t = useTranslations("thankYou");
  const [order, setOrder] = useState<LastOrder | null>(null);

  useEffect(() => {
    if (typeof sessionStorage === "undefined") return;

    try {
      const raw = sessionStorage.getItem("lastOrder");

      if (raw) {
        setTimeout(() => {
          setOrder(JSON.parse(raw) as LastOrder);
        }, 100);
      }
    } catch {
      // ignore persisted session data failures
    }
  }, []);

  return (
    <CheckoutPageShell>
      <SuccessPageCard
        title={t("thankYou", {
          fallback: "Booking Successfully Received",
        })}
        body={
          <>
            <p>
              {t("bookingIntro", {
                fallback: "Thank you for choosing Travellio Global.",
              })}
            </p>
            <p>
              {order?.orderNumber
                ? t("bookingProcessedWithOrder", {
                    fallback: `Your reservation request has been received and is currently being processed. A confirmation email with your booking details will be sent to you shortly.`,
                  })
                : t("bookingProcessed", {
                    fallback:
                      "Your reservation request has been received and is currently being processed. A confirmation email with your booking details will be sent to you shortly.",
                  })}
            </p>
            <p>
              {t("bookingSupportPrefix", {
                fallback: "If you need any assistance, please contact us at ",
              })}
              <a href={`mailto:${WEBSITE_EMAIL}`}>{WEBSITE_EMAIL}</a>.
            </p>
          </>
        }
        note={
          <p>
            {t("journeyCloser", {
              fallback: "Your next journey is closer than you think.",
            })}
          </p>
        }
        prompt={t("prompt", {
          fallback: "Return to the previous page or:",
        })}
        ctaLabel={t("backToHomePage", {
          fallback: "Head Back Home",
        })}
        ctaHref="/"
      />
    </CheckoutPageShell>
  );
};
