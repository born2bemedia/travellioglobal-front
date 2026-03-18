"use client";

import { useEffect, useRef, useState } from "react";

import { useTranslations } from "next-intl";
import Select, { type StylesConfig } from "react-select";

import {
  type AirportOption,
  airports,
} from "@/features/flight-search/lib/airports";

import styles from "./ExtraordinarySearchForm.module.scss";

const TP_MEDIA_BASE_URL = "https://tp.media/content";
const DEFAULT_MIN_TRIP_DAYS = 7;
const DEFAULT_MAX_TRIP_DAYS = 14;
const WIDGET_STYLE_ID = "extraordinary-widget-overrides";
const WIDGET_STYLE_TEXT = `
  
`;

type ExtraordinarySearchFormProps = {
  suggestedDestinationIata: string;
};

const getDisplayCity = (label: string) => label.split(",")[0]?.trim() ?? label;

const selectStyles: StylesConfig<AirportOption, false> = {
  control: (base) => ({
    ...base,
    minHeight: "24px",
    border: 0,
    borderRadius: 0,
    background: "transparent",
    boxShadow: "none",
    cursor: "pointer",
    "&:hover": {
      border: 0,
    },
  }),
  valueContainer: (base) => ({
    ...base,
    padding: 0,
  }),
  singleValue: (base) => ({
    ...base,
    margin: 0,
    color: "#fffdf1",
    fontFamily: "var(--font-plus-jakarta-sans), sans-serif",
    fontSize: "20px",
    fontWeight: 600,
    lineHeight: 1,
  }),
  placeholder: (base) => ({
    ...base,
    margin: 0,
    color: "rgba(255, 253, 241, 0.54)",
    fontFamily: "var(--font-plus-jakarta-sans), sans-serif",
    fontSize: "20px",
    fontWeight: 600,
    lineHeight: 1,
  }),
  input: (base) => ({
    ...base,
    margin: 0,
    padding: 0,
    color: "#fffdf1",
    fontFamily: "var(--font-plus-jakarta-sans), sans-serif",
    fontSize: "20px",
    fontWeight: 600,
    lineHeight: 1,
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    padding: 0,
    color: "rgba(255, 253, 241, 0.65)",
    "&:hover": {
      color: "#fffdf1",
    },
    svg: {
      width: "18px",
      height: "18px",
    },
  }),
  menuPortal: (base) => ({
    ...base,
    zIndex: 120,
  }),
  menu: (base) => ({
    ...base,
    marginTop: "10px",
    overflow: "hidden",
    border: "1px solid rgba(235, 94, 40, 0.2)",
    borderRadius: "16px",
    background: "#fffdf1",
    boxShadow: "0 22px 40px rgba(60, 39, 24, 0.16)",
  }),
  menuList: (base) => ({
    ...base,
    padding: "8px",
  }),
  option: (base, state) => ({
    ...base,
    borderRadius: "12px",
    background: state.isSelected
      ? "rgba(235, 94, 40, 0.12)"
      : state.isFocused
        ? "rgba(64, 61, 56, 0.06)"
        : "transparent",
    color: "#403d38",
    fontFamily: "var(--font-plus-jakarta-sans), sans-serif",
    fontSize: "16px",
    fontWeight: 500,
    cursor: "pointer",
    padding: "12px 14px",
  }),
};

const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M12 20s6-5.686 6-11a6 6 0 1 0-12 0c0 5.314 6 11 6 11Z"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    />
    <circle
      cx="12"
      cy="9"
      r="2.4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    />
  </svg>
);

const injectWidgetStyles = (widgetHost: HTMLDivElement | null) => {
  const widgetElement = widgetHost?.querySelector("tp-cascoon-id") as
    | HTMLElement
    | null;
  const shadowRoot = widgetElement?.shadowRoot;

  if (!shadowRoot) {
    return false;
  }

  if (shadowRoot.getElementById(WIDGET_STYLE_ID)) {
    return true;
  }

  const style = document.createElement("style");
  style.id = WIDGET_STYLE_ID;
  style.textContent = WIDGET_STYLE_TEXT;
  shadowRoot.appendChild(style);

  return true;
};

export const ExtraordinarySearchForm = ({
  suggestedDestinationIata,
}: ExtraordinarySearchFormProps) => {
  const t = useTranslations("homeEmbarkExtraordinary");
  const widgetHostRef = useRef<HTMLDivElement | null>(null);
  const menuPortalTarget =
    typeof window === "undefined" ? undefined : document.body;

  const [origin, setOrigin] = useState<AirportOption | null>(
    airports.find((option) => option.value === "NYC") ??
      airports.find((option) => option.value === "JFK") ??
      null,
  );
  const [manualDestination, setManualDestination] =
    useState<AirportOption | null>(null);
  const [oneWay, setOneWay] = useState(false);
  const [directOnly, setDirectOnly] = useState(false);
  const [durationMin, setDurationMin] = useState(DEFAULT_MIN_TRIP_DAYS);
  const [durationMax, setDurationMax] = useState(DEFAULT_MAX_TRIP_DAYS);

  const suggestedDestination =
    airports.find((option) => option.value === suggestedDestinationIata) ?? null;
  const effectiveDestination = manualDestination ?? suggestedDestination;
  const summaryLabel =
    effectiveDestination?.label ??
    t("summaryFallback", { fallback: "Select destination" });
  const tripSummary = oneWay
    ? `${t("summaryOneWay", { fallback: "One way" })}, ${durationMin}-${durationMax} ${t("durationDays", { fallback: "days" })}`
    : `${t("summaryRoundTrip", { fallback: "Round trip" })}, ${durationMin}-${durationMax} ${t("durationDays", { fallback: "days" })}`;

  useEffect(() => {
    const widgetHost = widgetHostRef.current;

    if (!widgetHost || !origin || !effectiveDestination) {
      return;
    }

    widgetHost.innerHTML = "";

    const script = document.createElement("script");
    script.async = true;
    script.charset = "utf-8";
    const searchParams = new URLSearchParams({
      currency: "usd",
      trs: "327395",
      shmarker: "552524",
      searchUrl: "www.aviasales.com/search",
      locale: "en",
      powered_by: "false",
      origin: "NYC",
      destination: "BKK",
      one_way: "false",
      only_direct: "false",
      period: "year",
      range: "7,14",
      primary: "#eb5e28",
      color_background: "#f9faf5",
      dark: "#262626",
      light: "#f9faf5",
      achieve: "#eb5e28",
      promo_id: "4041",
      campaign_id: "100",
    });

    //script.src = `${TP_MEDIA_BASE_URL}`;
    script.src = `${TP_MEDIA_BASE_URL}?${searchParams.toString()}`;
    widgetHost.appendChild(script);

    const observer = new MutationObserver(() => {
      injectWidgetStyles(widgetHost);
    });

    observer.observe(widgetHost, {
      childList: true,
      subtree: true,
    });

    const retryTimer = window.setInterval(() => {
      if (injectWidgetStyles(widgetHost)) {
        window.clearInterval(retryTimer);
      }
    }, 200);

    return () => {
      observer.disconnect();
      window.clearInterval(retryTimer);
      widgetHost.innerHTML = "";
    };
  }, [directOnly, durationMax, durationMin, effectiveDestination, oneWay, origin]);

  const handleMinDurationChange = (nextValue: number) => {
    setDurationMin(Math.min(nextValue, durationMax - 1));
  };

  const handleMaxDurationChange = (nextValue: number) => {
    setDurationMax(Math.max(nextValue, durationMin + 1));
  };

  return (
    <div className={styles.search}>
      <div className={styles.search__filters}>
        <div className={styles.search__filtersInner}>
          <div className={styles.search__topFields}>
            <div className={styles.search__field}>
              <div className={styles.search__fieldMain}>
                <span className={styles.search__fieldIcon}>
                  <MapPinIcon />
                </span>
                <div className={styles.search__selectWrap}>
                  <Select<AirportOption>
                    aria-label={t("originLabel", { fallback: "Origin" })}
                    classNamePrefix="extraordinary-origin"
                    formatOptionLabel={(option, meta) =>
                      meta.context === "menu" ? option.label : getDisplayCity(option.label)
                    }
                    isSearchable
                    menuPortalTarget={menuPortalTarget}
                    onChange={setOrigin}
                    options={airports}
                    styles={selectStyles}
                    value={origin}
                  />
                </div>
              </div>

              <span className={styles.search__fieldCode}>{origin?.value ?? "NYC"}</span>
            </div>

            <div className={styles.search__field}>
              <div className={styles.search__fieldMain}>
                <span className={styles.search__fieldIcon}>
                  <MapPinIcon />
                </span>
                <div className={styles.search__selectWrap}>
                  <Select<AirportOption>
                    aria-label={t("destinationLabel", {
                      fallback: "Destination city",
                    })}
                    classNamePrefix="extraordinary-destination"
                    formatOptionLabel={(option, meta) =>
                      meta.context === "menu" ? option.label : getDisplayCity(option.label)
                    }
                    isClearable
                    isSearchable
                    menuPortalTarget={menuPortalTarget}
                    onChange={setManualDestination}
                    options={airports.filter((option) => option.value !== origin?.value)}
                    placeholder={t("destinationPlaceholder", { fallback: "City" })}
                    styles={selectStyles}
                    value={manualDestination}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.search__toggles}>
            <button
              aria-pressed={oneWay}
              className={`${styles.search__toggle} ${oneWay ? styles.search__toggleActive : ""}`}
              onClick={() => setOneWay((current) => !current)}
              type="button"
            >
              <span aria-hidden="true" className={styles.search__checkbox} />
              <span>{t("oneWay", { fallback: "One way" })}</span>
            </button>

            <button
              aria-pressed={directOnly}
              className={`${styles.search__toggle} ${directOnly ? styles.search__toggleActive : ""}`}
              onClick={() => setDirectOnly((current) => !current)}
              type="button"
            >
              <span aria-hidden="true" className={styles.search__checkbox} />
              <span>{t("directOnly", { fallback: "Direct flights only" })}</span>
            </button>
          </div>

          <div className={styles.search__duration}>
            <div className={styles.search__durationTitle}>
              {t("durationTitle", { fallback: "Vacation duration" })}
            </div>

            <div className={styles.search__durationLabels}>
              <span>
                {t("duratioFrom", { fallback: "from " })}
                {durationMin} {t("durationDays", { fallback: "days" })}
              </span>
              <span>
                {t("duratioTo", { fallback: "to " })}
                {durationMax} {t("durationDays", { fallback: "days" })}
              </span>
            </div>

            <div className={styles.search__rangeSlider}>
              <div className={styles.search__rangeTrack} />
              <div
                className={styles.search__rangeProgress}
                style={{
                  left: `${((durationMin - 1) / 20) * 100}%`,
                  right: `${100 - ((durationMax - 1) / 20) * 100}%`,
                }}
              />

              <input
                aria-label={t("durationMinControl", {
                  fallback: "Minimum trip duration",
                })}
                max={21}
                min={1}
                onChange={(event) => handleMinDurationChange(Number(event.target.value))}
                type="range"
                value={durationMin}
              />

              <input
                aria-label={t("durationMaxControl", {
                  fallback: "Maximum trip duration",
                })}
                max={21}
                min={1}
                onChange={(event) => handleMaxDurationChange(Number(event.target.value))}
                type="range"
                value={durationMax}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.search__results}>
        <div className={styles.search__summary}>
          <span className={styles.search__summaryTitle}>{summaryLabel}</span>
          <span className={styles.search__summaryMeta}>{tripSummary}</span>
        </div>

        <div className={styles.search__widgetShell}>
          <div className={styles.search__widgetHost} ref={widgetHostRef} />
        </div>
      </div>
    </div>
  );
};
