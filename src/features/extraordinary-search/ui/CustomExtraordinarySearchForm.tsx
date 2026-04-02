"use client";

import { useEffect, useMemo, useState } from "react";

import { useTranslations } from "next-intl";
import Select, { type StylesConfig } from "react-select";

import {
  type AirportOption,
  airports,
} from "@/features/flight-search/lib/airports";

import styles from "./CustomExtraordinarySearchForm.module.scss";

// ─── Constants ──────────────────────────────────────────────────────────────

const DEFAULT_MIN_TRIP_DAYS = 7;
const DEFAULT_MAX_TRIP_DAYS = 14;
const WEEKDAY_NAMES = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const AFFILIATE_MARKER = "552524";
const AFFILIATE_TRS = "327395";
const AFFILIATE_PROMO_ID = "4041";
const AFFILIATE_CAMPAIGN_ID = "100";

// ─── Types ───────────────────────────────────────────────────────────────────

type ViewMode = "year" | "month";

type CalMonth = {
  year: number;
  month: number; // 1-indexed
};

type MonthPrice = { month: string; price: number };
type DayPrice = { date: string; price: number };

type CustomExtraordinarySearchFormProps = {
  suggestedDestinationIata: string;
  /** Pre-fetched prices from the server (SSR) for the default origin→destination combo */
  initialMonthlyPrices?: Record<string, number>;
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

const getDisplayCity = (label: string) => label.split(",")[0]?.trim() ?? label;

const monthName = (month: number) =>
  new Date(2000, month - 1, 1).toLocaleString("en", { month: "long" });

const formatYM = (cm: CalMonth) =>
  `${cm.year}-${String(cm.month).padStart(2, "0")}`;

const formatDate = (d: Date): string => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const addDays = (dateStr: string, days: number): string => {
  const d = new Date(`${dateStr}T12:00:00`);
  d.setDate(d.getDate() + days);
  return formatDate(d);
};

const isPast = (d: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return d < today;
};

const formatPrice = (p: number): string =>
  `$${p.toLocaleString("en-US")}`;

/** Build 42-cell calendar grid (6 rows × 7 cols), week starts Monday */
const buildCalendarGrid = (year: number, month: number): Date[] => {
  const firstDay = new Date(year, month - 1, 1);
  const startOffset = (firstDay.getDay() + 6) % 7; // Mon=0 … Sun=6
  const start = new Date(year, month - 1, 1 - startOffset);
  return Array.from({ length: 42 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
};

const buildAviasalesUrl = (
  origin: string,
  destination: string,
  departDate: string,
  durationMin: number,
  oneWay: boolean,
): string => {
  const p = new URLSearchParams({
    depart_date: departDate,
    origin_iata: origin,
    destination_iata: destination,
    currency: "usd",
    with_request: "true",
    locale: "en",
    language: "en",
  });
  if (!oneWay) {
    p.set("return_date", addDays(departDate, durationMin));
  }
  const aviasalesUrl = `https://www.aviasales.com/search?${p.toString()}`;

  const tp = new URLSearchParams({
    locale: "en",
    marker: AFFILIATE_MARKER,
    p: AFFILIATE_PROMO_ID,
    trs: AFFILIATE_TRS,
    type: "click",
    campaign_id: AFFILIATE_CAMPAIGN_ID,
    u: aviasalesUrl,
  });
  return `https://tp.media/r?${tp.toString()}`;
};

// ─── Select styles (orange sidebar theme) ────────────────────────────────────

const selectStyles: StylesConfig<AirportOption, false> = {
  control: (base) => ({
    ...base,
    minHeight: "24px",
    border: 0,
    borderRadius: 0,
    background: "transparent",
    boxShadow: "none",
    cursor: "pointer",
    "&:hover": { border: 0 },
  }),
  valueContainer: (base) => ({ ...base, padding: 0 }),
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
  indicatorSeparator: () => ({ display: "none" }),
  dropdownIndicator: () => ({ display: "none" }),
  clearIndicator: () => ({ display: "none" }),
  menuPortal: (base) => ({ ...base, zIndex: 120 }),
  menu: (base) => ({
    ...base,
    marginTop: "10px",
    overflow: "hidden",
    border: "1px solid rgba(235, 94, 40, 0.2)",
    borderRadius: "16px",
    background: "#fffdf1",
    boxShadow: "0 22px 40px rgba(60, 39, 24, 0.16)",
  }),
  menuList: (base) => ({ ...base, padding: "8px" }),
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

// ─── Icons ────────────────────────────────────────────────────────────────────

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

const ChevronLeftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M15 18l-6-6 6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M9 18l6-6-6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect
      x="3"
      y="4"
      width="18"
      height="18"
      rx="3"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="M3 9h18M8 2v4M16 2v4"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.54 0C2.93 0 0 2.93 0 6.54c0 3.61 2.93 6.54 6.54 6.54 1.63 0 3.12-.59 4.26-1.57l4.35 4.35a.5.5 0 0 0 .71-.71L11.5 10.8A6.54 6.54 0 0 0 6.54 0Zm-5.54 6.54a5.54 5.54 0 1 1 11.08 0 5.54 5.54 0 0 1-11.08 0Z"
      fill="currentColor"
    />
  </svg>
);

// ─── Data hooks ───────────────────────────────────────────────────────────────

function useMonthlyPrices(
  origin: string,
  destination: string,
  oneWay: boolean,
  directOnly: boolean,
  durationMin: number,
  durationMax: number,
  initialData?: Record<string, number>,
) {
  const initialKey = destination
    ? `${origin}|${destination}|${oneWay}|${directOnly}|${durationMin}|${durationMax}`
    : "";

  const [prices, setPrices] = useState<Record<string, number>>(
    initialData ?? {},
  );
  const [fetchedKey, setFetchedKey] = useState(
    initialData && Object.keys(initialData).length > 0 ? initialKey : "",
  );

  const currentKey = destination
    ? `${origin}|${destination}|${oneWay}|${directOnly}|${durationMin}|${durationMax}`
    : "";
  const loading = destination ? currentKey !== fetchedKey : false;

  useEffect(() => {
    if (!destination) return;

    let cancelled = false;
    const key =
      `${origin}|${destination}|${oneWay}|${directOnly}|${durationMin}|${durationMax}`;
    const params = new URLSearchParams({
      origin,
      destination,
      one_way: String(oneWay),
      direct: String(directOnly),
    });

    if (!oneWay) {
      params.set("min_trip_duration", String(durationMin));
      params.set("max_trip_duration", String(durationMax));
    }

    fetch(`/api/flight-prices/monthly?${params.toString()}`)
      .then(async (r) => {
        if (!r.ok) {
          console.warn(`[monthly prices] ${r.status} ${origin}→${destination}`);
          if (!cancelled) setFetchedKey(key);
          return;
        }
        const json = (await r.json()) as { data?: MonthPrice[] };
        if (cancelled) return;
        const map: Record<string, number> = {};
        for (const entry of json.data ?? []) {
          map[entry.month] = entry.price;
        }
        setPrices(map);
        setFetchedKey(key);
      })
      .catch((err) => {
        console.error(err);
        if (!cancelled) setFetchedKey(key);
      });

    return () => {
      cancelled = true;
    };
  }, [origin, destination, oneWay, directOnly, durationMin, durationMax]);

  return { prices: destination ? prices : {}, loading };
}

function useCalendarPrices(
  origin: string,
  destination: string,
  calMonth: CalMonth,
  oneWay: boolean,
  enabled: boolean,
) {
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [fetchedKey, setFetchedKey] = useState("");

  const currentKey = enabled && destination
    ? `${origin}|${destination}|${formatYM(calMonth)}|${oneWay}`
    : "";
  const loading = enabled && destination ? currentKey !== fetchedKey : false;

  useEffect(() => {
    if (!enabled || !destination) return;

    let cancelled = false;
    const key = `${origin}|${destination}|${formatYM(calMonth)}|${oneWay}`;
    const params = new URLSearchParams({
      origin,
      destination,
      yearMonth: formatYM(calMonth),
      one_way: String(oneWay),
    });

    fetch(`/api/flight-prices/calendar?${params.toString()}`)
      .then(async (r) => {
        if (!r.ok) {
          console.warn(`[calendar prices] ${r.status} ${origin}→${destination}`);
          if (!cancelled) setFetchedKey(key);
          return;
        }
        const json = (await r.json()) as { data?: DayPrice[] };
        if (cancelled) return;
        const map: Record<string, number> = {};
        for (const entry of json.data ?? []) {
          map[entry.date] = entry.price;
        }
        setPrices(map);
        setFetchedKey(key);
      })
      .catch((err) => {
        console.error(err);
        if (!cancelled) setFetchedKey(key);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, origin, destination, calMonth.year, calMonth.month, oneWay]);

  return { prices, loading };
}

// ─── Component ────────────────────────────────────────────────────────────────

export const CustomExtraordinarySearchForm = ({
  suggestedDestinationIata,
  initialMonthlyPrices,
}: CustomExtraordinarySearchFormProps) => {
  const t = useTranslations("homeEmbarkExtraordinary");
  const menuPortalTarget =
    typeof window === "undefined" ? undefined : document.body;

  // ── Form state ──────────────────────────────────────────────────────────────
  const [origin, setOrigin] = useState<AirportOption | null>(
    airports.find((o) => o.value === "LHR") ??
      airports.find((o) => o.value === "LON") ??
      null,
  );
  const [manualDestination, setManualDestination] =
    useState<AirportOption | null>(null);
  const [oneWay, setOneWay] = useState(false);
  const [directOnly, setDirectOnly] = useState(false);
  const [durationMin, setDurationMin] = useState(DEFAULT_MIN_TRIP_DAYS);
  const [durationMax, setDurationMax] = useState(DEFAULT_MAX_TRIP_DAYS);

  // ── Navigation state ────────────────────────────────────────────────────────
  const [view, setView] = useState<ViewMode>("year");
  const [calMonth, setCalMonth] = useState<CalMonth>(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() + 1 };
  });

  // ── Derived values ──────────────────────────────────────────────────────────
  const suggestedDestination =
    airports.find((o) => o.value === suggestedDestinationIata) ?? null;
  const effectiveDestination = manualDestination ?? suggestedDestination;
  const originIata = origin?.value ?? "NYC";
  const destinationIata = effectiveDestination?.value ?? "";

  // ── Data ────────────────────────────────────────────────────────────────────
  const { prices: monthlyPrices, loading: monthlyLoading } = useMonthlyPrices(
    originIata,
    destinationIata,
    oneWay,
    directOnly,
    durationMin,
    durationMax,
    initialMonthlyPrices,
  );

  const { prices: calendarPrices, loading: calendarLoading } =
    useCalendarPrices(
      originIata,
      destinationIata,
      calMonth,
      oneWay,
      view === "month",
    );

  // ── Display ─────────────────────────────────────────────────────────────────
  const summaryLabel =
    effectiveDestination?.label ??
    t("summaryFallback", { fallback: "Select destination" });

  const tripSummary = oneWay
    ? `${t("summaryOneWay", { fallback: "One way" })}, ${durationMin}–${durationMax} ${t("durationDays", { fallback: "days" })}`
    : `${t("summaryRoundTrip", { fallback: "Round trip" })}, ${durationMin}–${durationMax} ${t("durationDays", { fallback: "days" })}`;

  // Next 12 months from today
  const twelveMonths = useMemo<CalMonth[]>(() => {
    const now = new Date();
    return Array.from({ length: 12 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
      return { year: d.getFullYear(), month: d.getMonth() + 1 };
    });
  }, []);

  // Best (lowest) price across all months
  const bestMonthPrice = useMemo(() => {
    const values = twelveMonths
      .map((m) => monthlyPrices[formatYM(m)])
      .filter((p): p is number => p !== undefined);
    return values.length > 0 ? Math.min(...values) : null;
  }, [monthlyPrices, twelveMonths]);

  // Calendar grid (42 cells)
  const calendarGrid = useMemo(
    () => buildCalendarGrid(calMonth.year, calMonth.month),
    [calMonth.year, calMonth.month],
  );

  // Best (cheapest) day in current calendar month
  const bestCalendarDay = useMemo(() => {
    const ym = formatYM(calMonth);
    const entries = Object.entries(calendarPrices).filter(
      ([date]) => date.startsWith(ym) && !isPast(new Date(`${date}T12:00:00`)),
    );
    if (entries.length === 0) return null;
    return entries.reduce((best, cur) => (cur[1] < best[1] ? cur : best))[0];
  }, [calendarPrices, calMonth]);

  // ── Handlers ─────────────────────────────────────────────────────────────────
  const handleMinDurationChange = (v: number) =>
    setDurationMin(Math.min(v, durationMax - 1));
  const handleMaxDurationChange = (v: number) =>
    setDurationMax(Math.max(v, durationMin + 1));

  const handleMonthClick = (cm: CalMonth) => {
    setCalMonth(cm);
    setView("month");
  };

  const handleBackToYear = () => setView("year");

  const handlePrevMonth = () =>
    setCalMonth((prev) => {
      const d = new Date(prev.year, prev.month - 2, 1);
      return { year: d.getFullYear(), month: d.getMonth() + 1 };
    });

  const handleNextMonth = () =>
    setCalMonth((prev) => {
      const d = new Date(prev.year, prev.month, 1);
      return { year: d.getFullYear(), month: d.getMonth() + 1 };
    });

  const handleAllMonth = () => {
    setView("year");
  };

  const handleDayClick = (dateStr: string) => {
    if (!destinationIata) return;
    window.open(
      buildAviasalesUrl(originIata, destinationIata, dateStr, durationMin, oneWay),
      "_blank",
      "noopener,noreferrer",
    );
  };


  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className={styles.custom}>
      {/* ── Left: Filter panel ── */}
      <div className={styles.custom__filters}>
        <div className={styles.custom__filtersInner}>
          {/* Top fields */}
          <div className={styles.custom__topSection}>
            {/* Origin */}
            <div className={styles.custom__field}>
              <div className={styles.custom__fieldMain}>
                <span className={styles.custom__fieldIcon}>
                  <MapPinIcon />
                </span>
                <div className={styles.custom__selectWrap}>
                  <Select<AirportOption>
                    aria-label={t("originLabel", { fallback: "Origin" })}
                    classNamePrefix="custom-origin"
                    instanceId="custom-origin"
                    inputId="custom-origin-input"
                    formatOptionLabel={(opt, meta) =>
                      meta.context === "menu"
                        ? opt.label
                        : getDisplayCity(opt.label)
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
              <span className={styles.custom__fieldCode}>
                {origin?.value ?? "NYC"}
              </span>
            </div>

            {/* Destination */}
            <div className={styles.custom__field}>
              <div className={styles.custom__fieldMain}>
                <span className={styles.custom__fieldIcon}>
                  <MapPinIcon />
                </span>
                <div className={styles.custom__selectWrap}>
                  <Select<AirportOption>
                    aria-label={t("destinationLabel", {
                      fallback: "Destination city",
                    })}
                    classNamePrefix="custom-destination"
                    instanceId="custom-destination"
                    inputId="custom-destination-input"
                    formatOptionLabel={(opt, meta) =>
                      meta.context === "menu"
                        ? opt.label
                        : getDisplayCity(opt.label)
                    }
                    isClearable
                    isSearchable
                    menuPortalTarget={menuPortalTarget}
                    onChange={setManualDestination}
                    options={airports.filter((o) => o.value !== origin?.value)}
                    placeholder={t("destinationPlaceholder", {
                      fallback: "City",
                    })}
                    styles={selectStyles}
                    value={manualDestination ?? suggestedDestination}
                  />
                </div>
              </div>
            </div>

            {/* Toggles */}
            <div className={styles.custom__toggles}>
              <button
                aria-pressed={oneWay}
                className={`${styles.custom__toggle} ${oneWay ? styles["custom__toggle--active"] : ""}`}
                onClick={() => setOneWay((p) => !p)}
                type="button"
              >
                <span aria-hidden="true" className={styles.custom__checkbox} />
                <span>{t("oneWay", { fallback: "One way" })}</span>
              </button>

              <button
                aria-pressed={directOnly}
                className={`${styles.custom__toggle} ${directOnly ? styles["custom__toggle--active"] : ""}`}
                onClick={() => setDirectOnly((p) => !p)}
                type="button"
              >
                <span aria-hidden="true" className={styles.custom__checkbox} />
                <span>{t("directOnly", { fallback: "Direct flights only" })}</span>
              </button>
            </div>
          </div>

          {/* Duration slider */}
          <div className={styles.custom__duration}>
            <div className={styles.custom__durationTitle}>
              {t("durationTitle", { fallback: "Vacation duration" })}
            </div>

            <div className={styles.custom__durationLabels}>
              <span>
                {t("duratioFrom", { fallback: "from " })}
                {durationMin} {t("durationDays", { fallback: "days" })}
              </span>
              <span>
                {t("duratioTo", { fallback: "to " })}
                {durationMax} {t("durationDays", { fallback: "days" })}
              </span>
            </div>

            <div className={styles.custom__rangeSlider}>
              <div className={styles.custom__rangeTrack} />
              <div
                className={styles.custom__rangeProgress}
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
                onChange={(e) =>
                  handleMinDurationChange(Number(e.target.value))
                }
                type="range"
                value={durationMin}
              />
              <input
                aria-label={t("durationMaxControl", {
                  fallback: "Maximum trip duration",
                })}
                max={21}
                min={1}
                onChange={(e) =>
                  handleMaxDurationChange(Number(e.target.value))
                }
                type="range"
                value={durationMax}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Right: Results panel ── */}
      <div className={styles.custom__results}>
        {/* Summary pill */}
        <div className={styles.custom__summary}>
          <span className={styles.custom__summaryTitle}>
            {getDisplayCity(summaryLabel)}
          </span>
          <span className={styles.custom__summaryMeta}>{tripSummary}</span>
        </div>

        {/* Calendar shell */}
        <div className={styles.custom__shell}>
          {!effectiveDestination ? (
            <div className={styles.custom__empty}>
              <p>
                {t("selectDestinationPrompt", {
                  fallback: "Select a destination to see prices",
                })}
              </p>
            </div>
          ) : view === "year" ? (
            /* ── Year view ── */
            <div className={styles.custom__yearView}>
              <div className={styles.custom__yearGrid}>
                {twelveMonths.map((cm) => {
                  const ym = formatYM(cm);
                  const price = monthlyPrices[ym];
                  const isBest =
                    price !== undefined && price === bestMonthPrice;
                  const hasPrice = price !== undefined;
                  const isSkeleton = monthlyLoading;

                  const cardClass = [
                    styles.custom__monthCard,
                    isSkeleton
                      ? styles["custom__monthCard--skeleton"]
                      : isBest
                        ? styles["custom__monthCard--best"]
                        : hasPrice
                          ? styles["custom__monthCard--hasPrice"]
                          : styles["custom__monthCard--noPrice"],
                  ]
                    .filter(Boolean)
                    .join(" ");

                  return (
                    <button
                      key={ym}
                      type="button"
                      className={cardClass}
                      onClick={() => handleMonthClick(cm)}
                    >
                      <span className={styles.custom__monthCardName}>
                        {monthName(cm.month)}
                      </span>

                      {hasPrice ? (
                        <span className={styles.custom__monthCardPrice}>
                          {formatPrice(price)}
                        </span>
                      ) : !isSkeleton ? (
                        <span className={styles.custom__monthCardSearch}>
                          <SearchIcon />
                        </span>
                      ) : null}

                      {isBest && (
                        <span className={styles.custom__monthCardBestLabel}>
                          {t("bestPrice", { fallback: "Best price" })}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* ── Month view ── */
            <div className={styles.custom__monthView}>
              {/* Header */}
              <div className={styles.custom__calendarHeader}>
                <div className={styles.custom__calendarNav}>
                  <button
                    type="button"
                    className={styles.custom__navBtn}
                    onClick={handlePrevMonth}
                    aria-label="Previous month"
                  >
                    <ChevronLeftIcon />
                  </button>

                  <button
                    type="button"
                    className={styles.custom__calendarMonthLabel}
                    onClick={handleBackToYear}
                    title="Back to year view"
                  >
                    {monthName(calMonth.month)} {calMonth.year}
                  </button>

                  <button
                    type="button"
                    className={styles.custom__navBtn}
                    onClick={handleNextMonth}
                    aria-label="Next month"
                  >
                    <ChevronRightIcon />
                  </button>
                </div>

                <button
                  type="button"
                  className={styles.custom__allMonthBtn}
                  onClick={handleAllMonth}
                  disabled={!destinationIata}
                >
                  {t("allMonth", { fallback: "All month" })}
                  <span className={styles.custom__calendarIcon}>
                    <CalendarIcon />
                  </span>
                </button>
              </div>

              {/* Weekday headers */}
              <div className={styles.custom__weekdayHeaders}>
                {WEEKDAY_NAMES.map((day) => (
                  <div key={day} className={styles.custom__weekdayHeader}>
                    {day}
                  </div>
                ))}
              </div>

              {/* Day grid */}
              <div className={styles.custom__dayGrid}>
                {calendarGrid.map((d) => {
                  const dateStr = formatDate(d);
                  const isCurrentMonth = d.getMonth() + 1 === calMonth.month;
                  const past = isPast(d);
                  const disabled = past || !isCurrentMonth;
                  const price =
                    !disabled ? calendarPrices[dateStr] : undefined;
                  const isBestDay = dateStr === bestCalendarDay;

                  if (calendarLoading && !disabled) {
                    return (
                      <div
                        key={dateStr}
                        className={styles.custom__dayCellSkeleton}
                      />
                    );
                  }

                  if (disabled) {
                    return (
                      <div
                        key={dateStr}
                        className={styles.custom__dayCellDisabled}
                      >
                        <span className={styles.custom__dayCellDate}>
                          {d.getDate()}
                        </span>
                      </div>
                    );
                  }

                  return (
                    <button
                      key={dateStr}
                      type="button"
                      className={[
                        styles.custom__dayCell,
                        isBestDay
                          ? styles["custom__dayCell--best"]
                          : price !== undefined
                            ? styles["custom__dayCell--hasPrice"]
                            : styles["custom__dayCell--noPrice"],
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      onClick={() => handleDayClick(dateStr)}
                    >
                      <span className={styles.custom__dayCellDate}>
                        {d.getDate()}
                      </span>
                      {price !== undefined ? (
                        <span className={styles.custom__dayCellPrice}>
                          {formatPrice(price)}
                        </span>
                      ) : (
                        <span className={styles.custom__dayCellSearch}>
                          <SearchIcon />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
