"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

import { useTranslations } from "next-intl";
import Select from "react-select";

import { useAuthStore } from "@/features/account/store/auth";
import { useCartStore } from "@/features/cart/store/cart";

import { getTourGallery } from "../../lib/tours";
import type { Tour, TourDetailContent } from "../../model/types";
import { TourCard } from "../TourCard";
import styles from "./TourDetailPage.module.scss";

import { Link, useRouter } from "@/i18n/navigation";

type TourDetailPageProps = {
  tour: Tour;
  content: TourDetailContent;
  galleryImages: string[];
  relatedTours: Tour[];
};

const INACTIVE_WIDTH = 305;
const GAP = 20;

const formatPrice = (value: number) =>
  `€${value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;

const formatShortDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(`${value}T00:00:00`));

const formatDisplayDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));

const formatDisplayTime = (value: string) => {
  const [hours, minutes] = value.split(":").map(Number);
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(2026, 0, 1, hours, minutes));
};

const parseMaxParticipants = (value?: string | null) => {
  if (!value) return null;

  const match = value.match(/\d+/);
  return match ? Number(match[0]) : null;
};

const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  return `${"★".repeat(fullStars)}${hasHalf ? "★" : ""}`;
};

const SearchIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="9" cy="9" r="6.25" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M13.5 13.5L17.25 17.25"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const CalendarIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M7 2.75V5.25M17 2.75V5.25M3.75 8.5H20.25M5 4.75H19C19.6904 4.75 20.25 5.30964 20.25 6V19C20.25 19.6904 19.6904 20.25 19 20.25H5C4.30964 20.25 3.75 19.6904 3.75 19V6C3.75 5.30964 4.30964 4.75 5 4.75Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ClockIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M12 7.5V12L15.5 14"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const UserIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M16.25 7.75C16.25 10.0972 14.3472 12 12 12C9.65279 12 7.75 10.0972 7.75 7.75C7.75 5.40279 9.65279 3.5 12 3.5C14.3472 3.5 16.25 5.40279 16.25 7.75Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M5 20.25C5 16.9363 8.13401 14.25 12 14.25C15.866 14.25 19 16.9363 19 20.25"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const LocationIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M12 21C12 21 18 15.75 18 10.5C18 7.18629 15.3137 4.5 12 4.5C8.68629 4.5 6 7.18629 6 10.5C6 15.75 12 21 12 21Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="12"
      cy="10.5"
      r="2.25"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const TimerIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M9 2.75H15M12 8V12L14.5 14.5M18.25 12C18.25 15.4518 15.4518 18.25 12 18.25C8.54822 18.25 5.75 15.4518 5.75 12C5.75 8.54822 8.54822 5.75 12 5.75C15.4518 5.75 18.25 8.54822 18.25 12Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronDownIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M3 5.5L8 10.5L13 5.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CalendarNavIcon = ({ direction }: { direction: "prev" | "next" }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
    style={direction === "next" ? { transform: "rotate(180deg)" } : undefined}
  >
    <path
      d="M10 3L5 8L10 13"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const BookmarkIcon = ({ active }: { active: boolean }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M7 4.75H17C17.1381 4.75 17.25 4.86193 17.25 5V20.2051C17.25 20.4115 17.0147 20.5292 16.8496 20.4054L12.15 16.8807C12.0611 16.8141 11.9389 16.8141 11.85 16.8807L7.15037 20.4054C6.98533 20.5292 6.75 20.4115 6.75 20.2051V5C6.75 4.86193 6.86193 4.75 7 4.75Z"
      stroke="currentColor"
      strokeWidth="1.8"
      fill={active ? "currentColor" : "transparent"}
    />
  </svg>
);

const FeatureIcon = ({
  kind,
}: {
  kind: TourDetailContent["featureCards"][number]["icon"];
}) => {
  const assetMap = {
    calendar: "/images/tours/detail/feature-calendar.svg",
    lifebuoy: "/images/tours/detail/feature-lifebuoy.svg",
    ticket: "/images/tours/detail/feature-ticket.svg",
    shield: "/images/tours/detail/feature-shield.svg",
  } as const;

  return <Image src={assetMap[kind]} alt="" width={60} height={60} />;
};

export const TourDetailPage = ({
  tour,
  content,
  galleryImages,
  relatedTours,
}: TourDetailPageProps) => {
  const t = useTranslations("tourDetailPage");
  const router = useRouter();
  const addToCart = useCartStore((state) => state.addToCart);
  const user = useAuthStore((state) => state.user);
  const fetchUser = useAuthStore((s) => s.fetchUser);
  const addToWishlist = useAuthStore((state) => state.addToWishlist);
  const removeFromWishlist = useAuthStore((state) => state.removeFromWishlist);

  const bookingRef = useRef<HTMLFormElement | null>(null);
  const expectationRef = useRef<HTMLElement | null>(null);
  const calendarRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef(0);
  const hasLooped = useRef(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState(
    content.availabilityTimes[0] ?? "",
  );
  const [participants, setParticipants] = useState(tour.minCapacity);
  const [wishlistBusy, setWishlistBusy] = useState(false);
  const [showExpectations, setShowExpectations] = useState(false);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  const maxParticipants = useMemo(
    () => parseMaxParticipants(tour.maxCapacityLabel),
    [tour.maxCapacityLabel],
  );

  const calendarMinDate = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const calendarMaxDate = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setMonth(d.getMonth() + 3);
    return d;
  }, []);

  const isDateAvailable = useCallback(
    (dateStr: string) => {
      const d = new Date(`${dateStr}T00:00:00`);
      return d >= calendarMinDate && d <= calendarMaxDate;
    },
    [calendarMinDate, calendarMaxDate],
  );

  const [calendarYear, setCalendarYear] = useState(
    () => new Date().getFullYear(),
  );
  const [calendarMonth, setCalendarMonth] = useState(
    () => new Date().getMonth(),
  );

  const canCalendarGoPrev =
    calendarYear > calendarMinDate.getFullYear() ||
    calendarMonth > calendarMinDate.getMonth();

  const canCalendarGoNext =
    calendarYear < calendarMaxDate.getFullYear() ||
    calendarMonth < calendarMaxDate.getMonth();

  const calendarDays = useMemo(() => {
    const firstDay = new Date(calendarYear, calendarMonth, 1).getDay();
    const startOffset = (firstDay + 6) % 7;
    const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
    const cells: Array<{ day: number | null; dateStr: string | null }> = [];
    for (let i = 0; i < startOffset; i++) {
      cells.push({ day: null, dateStr: null });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const mm = String(calendarMonth + 1).padStart(2, "0");
      const dd = String(d).padStart(2, "0");
      cells.push({ day: d, dateStr: `${calendarYear}-${mm}-${dd}` });
    }
    return cells;
  }, [calendarYear, calendarMonth]);

  const handleCalendarPrev = () => {
    if (!canCalendarGoPrev) return;
    if (calendarMonth === 0) {
      setCalendarMonth(11);
      setCalendarYear((y) => y - 1);
    } else {
      setCalendarMonth((m) => m - 1);
    }
  };

  const handleCalendarNext = () => {
    if (!canCalendarGoNext) return;
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear((y) => y + 1);
    } else {
      setCalendarMonth((m) => m + 1);
    }
  };

  const timeOptions = useMemo(
    () =>
      content.availabilityTimes.map((value) => ({
        value,
        label: formatDisplayTime(value),
      })),
    [content.availabilityTimes],
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(e.target as Node)
      ) {
        setCalendarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const slides = useMemo(
    () =>
      relatedTours.length > 0
        ? [...relatedTours, ...relatedTours, ...relatedTours]
        : [],
    [relatedTours],
  );
  const mobileRelatedTours = useMemo(
    () => relatedTours.slice(0, 3),
    [relatedTours],
  );

  const wishlistedEntry =
    user?.wishlist?.find(
      (item) => item.product === tour.title || item.product === tour.id,
    ) ?? null;
  const isWishlisted = Boolean(wishlistedEntry);
  const operatorLink = tour.operatorWebsite?.trim().split(/\s+/)[0] ?? "";

  const total = tour.price * participants;
  const dateLabel = selectedDate ? formatDisplayDate(selectedDate) : "";
  const timeLabel = selectedTime ? formatDisplayTime(selectedTime) : "";
  const realIndex =
    relatedTours.length > 0 ? displayIndex % relatedTours.length : 0;
  const trackOffset = -(displayIndex * (INACTIVE_WIDTH + GAP));
  const relatedProgressWidth =
    relatedTours.length > 0
      ? `${((realIndex + 1) / relatedTours.length) * 100}%`
      : "0%";

  useEffect(() => {
    setTimeout(() => {
      setDisplayIndex(0);
    }, 0);
    setTimeout(() => {
      setTransitionEnabled(true);
    }, 0);
    hasLooped.current = false;
  }, [relatedTours.length]);

  const handleScrollToBooking = () => {
    bookingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    if (!showExpectations) {
      return;
    }

    expectationRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [showExpectations]);

  const handleParticipantsChange = (delta: number) => {
    setParticipants((current) => {
      const next = current + delta;
      if (next < tour.minCapacity) return tour.minCapacity;
      if (maxParticipants && next > maxParticipants) return maxParticipants;
      return next;
    });
  };

  const handleWishlistToggle = async () => {
    if (!user) {
      router.push("/log-in");
      return;
    }

    setWishlistBusy(true);

    if (isWishlisted) {
      await removeFromWishlist(wishlistedEntry?.product ?? tour.id);
    } else {
      await addToWishlist({ product: tour.id });
    }

    setWishlistBusy(false);
  };

  const handleBookNow = () => {
    if (!selectedDate || !selectedTime) {
      handleScrollToBooking();
      return;
    }

    addToCart({
      id: `${tour.slug}-${selectedDate}-${selectedTime}`,
      title: tour.title,
      price: tour.price,
      quantity: participants,
      description: `${dateLabel} • ${timeLabel}`,
      bookingDetails: {
        date: dateLabel,
        time: timeLabel,
        participants,
        duration: content.duration,
        meetingPoint: content.meetingPoint,
      },
    });

    router.push("/checkout");
  };

  const handleAvailabilitySubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setShowExpectations(true);
  };

  const slideNext = useCallback(() => {
    if (relatedTours.length <= 1) return;
    setTransitionEnabled(true);
    setDisplayIndex((prev) => prev + 1);
  }, [relatedTours.length]);

  const slidePrev = useCallback(() => {
    if (relatedTours.length <= 1) return;

    if (displayIndex <= 0) {
      setTransitionEnabled(false);
      setDisplayIndex(relatedTours.length);
      hasLooped.current = true;
      requestAnimationFrame(() => {
        setTransitionEnabled(true);
        setDisplayIndex(relatedTours.length - 1);
      });
      return;
    }

    setTransitionEnabled(true);
    setDisplayIndex((prev) => prev - 1);
  }, [displayIndex, relatedTours.length]);

  const handleTransitionEnd = useCallback(() => {
    if (relatedTours.length <= 1) return;

    if (displayIndex >= relatedTours.length * 2) {
      setTransitionEnabled(false);
      setDisplayIndex(displayIndex - relatedTours.length);
      hasLooped.current = true;
    } else if (hasLooped.current && displayIndex < relatedTours.length) {
      setTransitionEnabled(false);
      setDisplayIndex(displayIndex + relatedTours.length);
    }
  }, [displayIndex, relatedTours.length]);

  const handleTouchStart = useCallback((event: React.TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (event: React.TouchEvent) => {
      const delta = event.changedTouches[0].clientX - touchStartX.current;
      if (Math.abs(delta) > 50) {
        if (delta < 0) slideNext();
        else slidePrev();
      }
    },
    [slideNext, slidePrev],
  );

  const renderRelatedCard = useCallback(
    (item: Tour, key: string, isExpanded = false) => (
      <div
        key={key}
        className={`${styles.relatedSlide} ${
          isExpanded ? styles.relatedSlideActive : ""
        }`}
      >
        <TourCard tour={item} galleryImages={getTourGallery(item.slug)} />
      </div>
    ),
    [],
  );

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Image
          src={galleryImages[0]}
          alt={tour.title}
          fill
          priority
          className={styles.heroImage}
          sizes="100vw"
        />
        <div className={styles.heroOverlay} />
        <div className="container">
          <div className={styles.heroInner}>
            <Link href="/tours" className={styles.backLink}>
              <span className={styles.backArrow}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M15.5 18.8174C15.5 18.8988 15.489 18.9821 15.4678 19.0645L15.4355 19.1641L15.3975 19.252L15.3105 19.3916L15.2461 19.4707L15.1797 19.5371C15.1476 19.565 15.1081 19.5941 15.0586 19.624L14.9678 19.6729L14.8779 19.707C14.8369 19.7203 14.7993 19.7301 14.7646 19.7363L14.6143 19.749C14.4996 19.7476 14.3867 19.723 14.2822 19.6758C14.1718 19.6258 14.075 19.5547 13.9971 19.4697L7.74805 12.6504C7.6688 12.5638 7.60603 12.4616 7.56348 12.3496C7.53141 12.2652 7.51178 12.1776 7.50391 12.0898L7.5 12L7.50391 11.9102C7.51202 11.8212 7.53188 11.7337 7.56348 11.6504C7.60606 11.5383 7.66872 11.4352 7.74805 11.3486L13.9971 4.5293C14.1363 4.37756 14.325 4.27904 14.5264 4.25488L14.6318 4.25098L14.7285 4.25586C14.9199 4.28003 15.0997 4.37307 15.2383 4.51855L15.3154 4.60938C15.4313 4.76798 15.4956 4.96376 15.499 5.16504L15.4941 5.27832C15.4772 5.45059 15.4158 5.61407 15.3164 5.75098L15.21 5.88086L10.375 11.1543L9.9082 11.6611L9.59766 12L10.374 12.8447L15.2158 18.125L15.3164 18.2471C15.3628 18.311 15.4022 18.3829 15.4326 18.4609L15.4678 18.5693C15.4782 18.6092 15.4859 18.6494 15.4912 18.6895L15.5 18.8174Z"
                    fill="#FFFDF1"
                  />
                </svg>
              </span>
              <span>{t("back", { fallback: "Back" })}</span>
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.surface}>
        <div className="container">
          <div className={styles.header}>
            <h1 className={styles.title}>{tour.title}</h1>
            <p className={styles.operator}>
              {t("operatedBy", { fallback: "Operated by" })}{" "}
              {operatorLink ? (
                <a href={operatorLink} target="_blank" rel="noreferrer">
                  {tour.operator}
                </a>
              ) : (
                <span>{tour.operator}</span>
              )}
            </p>
          </div>

          <div className={styles.mediaCard}>
            <div className={styles.mediaVisual}>
              <Image
                src={galleryImages[1]}
                alt={tour.title}
                fill
                className={styles.mediaImage}
                sizes="(max-width: 768px) 100vw, 900px"
              />
              <div className={styles.mediaOverlay} />
            </div>

            <aside className={styles.summaryCard}>
              <div className={styles.summaryTop}>
                <div className={styles.summaryRating}>
                  <span className={styles.stars}>
                    {renderStars(tour.rating)}
                  </span>
                  <span>{tour.rating.toFixed(1)}/5</span>
                  <strong>
                    {tour.reviewCount} {t("reviews", { fallback: "reviews" })}
                  </strong>
                </div>

                <button
                  type="button"
                  className={styles.wishlistButton}
                  aria-pressed={isWishlisted}
                  disabled={wishlistBusy}
                  onClick={handleWishlistToggle}
                >
                  <span>
                    {isWishlisted
                      ? t("wishlist1", { fallback: "Remove from wishlist" })
                      : t("wishlist2", { fallback: "Add to wishlist" })}
                  </span>
                  <BookmarkIcon active={isWishlisted} />
                </button>
              </div>

              <div className={styles.summaryBody}>
                <div className={styles.summaryPriceBlock}>
                  <h2 className={styles.summaryPrice}>
                    {t("fromPrice", {
                      fallback: "From {price} per person",
                      price: formatPrice(tour.price),
                    })}
                  </h2>
                  <p className={styles.summaryText}>
                    {t("summaryMessage", {
                      fallback:
                        "You can secure your spot. Reserve now and pay later, with no upfront payment required today.",
                    })}
                  </p>
                </div>

                <button
                  type="button"
                  className={styles.availabilityButton}
                  onClick={handleScrollToBooking}
                >
                  <SearchIcon />
                  <span>
                    {t("checkAvailability", { fallback: "Check availability" })}
                  </span>
                </button>
              </div>
            </aside>
          </div>

          <p className={styles.lead}>{content.leadParagraph}</p>

          <div className={styles.layout}>
            <div className={styles.mainColumn}>
              <div className={styles.featureGrid}>
                {content.featureCards.map((feature) => (
                  <article key={feature.number} className={styles.featureCard}>
                    <div className={styles.featureCopy}>
                      <h2>{feature.title}</h2>
                      <p>{feature.body}</p>
                    </div>
                    <div className={styles.featureFooter}>
                      <span>{feature.number}</span>
                      <div className={styles.featureIcon}>
                        <FeatureIcon kind={feature.icon} />
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <form
                className={styles.bookingCard}
                ref={bookingRef}
                onSubmit={handleAvailabilitySubmit}
              >
                <h2>
                  {t("checkAvailability", { fallback: "Check availability" })}
                </h2>

                <div className={styles.bookingFields}>
                  <div
                    className={styles.calendarDropdown}
                    ref={calendarRef}
                  >
                    <button
                      type="button"
                      className={`${styles.bookingField} ${styles.calendarTrigger}`}
                      onClick={() => setCalendarOpen((o) => !o)}
                      aria-expanded={calendarOpen}
                    >
                      <span className={styles.bookingIcon}>
                        <CalendarIcon />
                      </span>
                      <span className={styles.bookingLabel}>
                        {selectedDate
                          ? formatShortDate(selectedDate)
                          : t("selectDate", { fallback: "Select date" })}
                      </span>
                      <span
                        className={`${styles.calendarChevron} ${calendarOpen ? styles.calendarChevronOpen : ""}`}
                      >
                        <ChevronDownIcon />
                      </span>
                    </button>

                    {calendarOpen && (
                      <div className={styles.calendarDropdownPanel}>
                        <div className={styles.calendarHeader}>
                          <button
                            type="button"
                            className={styles.calendarNavBtn}
                            onClick={handleCalendarPrev}
                            disabled={!canCalendarGoPrev}
                            aria-label="Previous month"
                          >
                            <CalendarNavIcon direction="prev" />
                          </button>
                          <span className={styles.calendarMonthLabel}>
                            {new Intl.DateTimeFormat("en-US", {
                              month: "long",
                              year: "numeric",
                            }).format(new Date(calendarYear, calendarMonth))}
                          </span>
                          <button
                            type="button"
                            className={styles.calendarNavBtn}
                            onClick={handleCalendarNext}
                            disabled={!canCalendarGoNext}
                            aria-label="Next month"
                          >
                            <CalendarNavIcon direction="next" />
                          </button>
                        </div>
                        <div className={styles.calendarGrid}>
                          {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map(
                            (d) => (
                              <span key={d} className={styles.calendarDayName}>
                                {d}
                              </span>
                            ),
                          )}
                          {calendarDays.map((cell, i) => {
                            if (!cell.day) {
                              return <span key={`empty-${i}`} />;
                            }
                            const isAvailable = cell.dateStr
                              ? isDateAvailable(cell.dateStr)
                              : false;
                            const isSelected = cell.dateStr === selectedDate;
                            return (
                              <button
                                key={cell.dateStr ?? i}
                                type="button"
                                disabled={!isAvailable}
                                className={`${styles.calendarDay} ${
                                  isAvailable
                                    ? styles.calendarDayAvailable
                                    : styles.calendarDayDisabled
                                } ${isSelected ? styles.calendarDaySelected : ""}`}
                                onClick={() => {
                                  if (cell.dateStr) {
                                    setSelectedDate(cell.dateStr);
                                    setCalendarOpen(false);
                                  }
                                }}
                              >
                                {cell.day}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className={styles.bookingField}>
                    <span className={styles.bookingIcon}>
                      <ClockIcon />
                    </span>
                    <Select
                      options={timeOptions}
                      value={
                        timeOptions.find((o) => o.value === selectedTime) ??
                        null
                      }
                      onChange={(option) =>
                        option && setSelectedTime(option.value)
                      }
                      isSearchable={false}
                      menuPortalTarget={
                        typeof document !== "undefined" ? document.body : null
                      }
                      menuPosition="fixed"
                      styles={{
                        container: (base) => ({
                          ...base,
                          flex: 1,
                        }),
                        control: (base) => ({
                          ...base,
                          backgroundColor: "transparent",
                          border: 0,
                          boxShadow: "none",
                          minHeight: "unset",
                          cursor: "pointer",
                          "&:hover": { border: 0 },
                        }),
                        valueContainer: (base) => ({
                          ...base,
                          padding: 0,
                        }),
                        singleValue: (base) => ({
                          ...base,
                          color: "#fffdf1",
                          fontSize: "20px",
                          fontFamily: "inherit",
                          margin: 0,
                        }),
                        indicatorSeparator: () => ({ display: "none" }),
                        dropdownIndicator: (base) => ({
                          ...base,
                          color: "#fffdf1",
                          padding: "0 4px",
                          "&:hover": { color: "#fffdf1" },
                          svg: { width: "16px", height: "16px" },
                        }),
                        menu: (base) => ({
                          ...base,
                          backgroundColor: "#fffdf1",
                          borderRadius: "12px",
                          overflow: "hidden",
                          zIndex: 9999,
                          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                        }),
                        menuList: (base) => ({
                          ...base,
                          padding: "4px 0",
                        }),
                        option: (base, state) => ({
                          ...base,
                          backgroundColor: state.isSelected
                            ? "rgba(235, 94, 40, 0.15)"
                            : state.isFocused
                              ? "rgba(235, 94, 40, 0.07)"
                              : "transparent",
                          color: state.isSelected ? "#eb5e28" : "#252422",
                          fontSize: "16px",
                          fontFamily: "inherit",
                          fontWeight: state.isSelected ? 600 : 400,
                          cursor: "pointer",
                          padding: "10px 16px",
                          "&:active": {
                            backgroundColor: "rgba(235, 94, 40, 0.2)",
                          },
                        }),
                      }}
                    />
                  </div>

                  <div className={styles.bookingField}>
                    <span className={styles.bookingIcon}>
                      <UserIcon />
                    </span>
                    <span className={styles.bookingLabel}>
                      {participants}{" "}
                      {participants === 1
                        ? t("participant", { fallback: "participant" })
                        : t("participants", { fallback: "participants" })}
                    </span>
                    <div className={styles.stepper}>
                      <button
                        type="button"
                        onClick={() => handleParticipantsChange(1)}
                        aria-label={t("increaseParticipants", {
                          fallback: "Increase participants",
                        })}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => handleParticipantsChange(-1)}
                        aria-label={t("decreaseParticipants", {
                          fallback: "Decrease participants",
                        })}
                      >
                        −
                      </button>
                    </div>
                  </div>
                </div>

                <button type="submit" className={styles.availabilityButton}>
                  <SearchIcon />
                  <span>
                    {t("checkAvailability", { fallback: "Check availability" })}
                  </span>
                </button>
              </form>

              {showExpectations ? (
                <section className={styles.bookingCard} ref={expectationRef}>
                  <h2>
                    {t("whatYouCanExpect", { fallback: "What you can expect" })}
                  </h2>

                  <div className={styles.expectationGrid}>
                    <div className={styles.expectationItem}>
                      <span className={styles.expectationIcon}>
                        <TimerIcon />
                      </span>
                      <div>
                        <p>{t("duration", { fallback: "Duration" })}</p>
                        <strong>{content.duration}</strong>
                      </div>
                    </div>

                    <div className={styles.expectationItem}>
                      <span className={styles.expectationIcon}>
                        <ClockIcon />
                      </span>
                      <div>
                        <p>{t("startsAt", { fallback: "Starts at" })}</p>
                        <strong>{content.startTime}</strong>
                      </div>
                    </div>

                    <div className={styles.expectationItemWide}>
                      <span className={styles.expectationIcon}>
                        <LocationIcon />
                      </span>
                      <div>
                        <p>
                          {t("meetingPoint", { fallback: "Meeting point" })}
                        </p>
                        <strong>{content.meetingPoint}</strong>
                      </div>
                    </div>
                  </div>

                  <ul className={styles.bookingNotes}>
                    {content.bookingNote ? (
                      <li>{content.bookingNote}</li>
                    ) : null}
                    <li>
                      {t("priceBreakdown", {
                        fallback:
                          "Price breakdown: {count} participants x {price}",
                        count: participants,
                        price: formatPrice(tour.price),
                      })}
                    </li>
                  </ul>

                  <div className={styles.bookingFooter}>
                    <div>
                      <h3>
                        {t("totalLabel", {
                          fallback: "Total: {price}",
                          price: formatPrice(total),
                        })}
                      </h3>
                      <p>
                        {t("totalNote", {
                          fallback:
                            "The total price includes all taxes and fees",
                        })}
                      </p>
                    </div>

                    <button
                      type="button"
                      className={styles.bookButton}
                      onClick={handleBookNow}
                    >
                      {t("bookNow", { fallback: "Book now" })}
                    </button>
                  </div>
                </section>
              ) : null}

              <article className={styles.article}>
                <h2>{content.overviewTitle}</h2>

                {content.overviewSections.map((section, index) => (
                  <section
                    key={`${section.title || "section"}-${index}`}
                    className={styles.articleSection}
                  >
                    {section.title ? <h3>{section.title}</h3> : null}
                    {section.body?.map((paragraph, paragraphIndex) => (
                      <p
                        key={`${
                          section.title || "section"
                        }-body-${paragraphIndex}`}
                      >
                        {paragraph}
                      </p>
                    ))}
                    {section.bullets ? (
                      <ul>
                        {section.bullets.map((item, itemIndex) => (
                          <li
                            key={`${
                              section.title || "section"
                            }-bullet-${itemIndex}`}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </section>
                ))}
              </article>


            </div>
          </div>

          {content.cancellationPolicy ? (
            <section className={styles.policyCard}>
              <h2>{content.cancellationPolicy.heading}</h2>
              <div className={styles.policySections}>
                {content.cancellationPolicy.sections.map(
                  (section, sectionIndex) => (
                    <div
                      key={`${section.subtitle ?? "policy"}-${sectionIndex}`}
                      className={styles.policySection}
                    >
                      {section.subtitle ? (
                        <p className={styles.policyLead}>{section.subtitle}</p>
                      ) : null}
                      {section.bullets ? (
                        <ul className={styles.policyList}>
                          {section.bullets.map((item, itemIndex) => (
                            <li
                              key={`${
                                section.subtitle ?? "policy"
                              }-${itemIndex}`}
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      {section.body?.map((paragraph, paragraphIndex) => (
                        <p
                          key={`${
                            section.subtitle ?? "policy"
                          }-body-${paragraphIndex}`}
                          className={styles.policyBody}
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  ),
                )}
              </div>
            </section>
          ) : null}

          {relatedTours.length ? (
            <section className={styles.relatedSection}>
              <div className={styles.relatedHeader}>
                <h2>
                  {t("relatedTours", {
                    fallback:
                      "Free your inner traveller, consider exploring...",
                  })}
                </h2>
                <div className={styles.relatedActions}>
                  <button
                    type="button"
                    className={styles.relatedNavButton}
                    onClick={slidePrev}
                    aria-label={t("previousAria", {
                      fallback: "Previous tours",
                    })}
                  >
                    <Image
                      src="/images/tours/detail/arrow-outline.svg"
                      alt=""
                      width={30}
                      height={25}
                    />
                  </button>

                  <button
                    type="button"
                    className={styles.relatedNavButton}
                    onClick={slideNext}
                    aria-label={t("nextAria", { fallback: "Next tours" })}
                  >
                    <Image
                      src="/images/tours/detail/arrow-outline.svg"
                      alt=""
                      width={30}
                      height={25}
                    />
                  </button>
                </div>
              </div>

              <div
                className={styles.relatedSlider}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <div
                  className={styles.relatedTrack}
                  style={{
                    transform: `translateX(${trackOffset}px)`,
                    transition: transitionEnabled
                      ? "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                      : "none",
                  }}
                  onTransitionEnd={handleTransitionEnd}
                >
                  {slides.map((item, index) =>
                    renderRelatedCard(
                      item,
                      `${item.slug}-${index}`,
                      index === displayIndex,
                    ),
                  )}
                </div>
              </div>

              <div className={styles.relatedMobileList}>
                {mobileRelatedTours.map((item) =>
                  renderRelatedCard(item, item.slug, true),
                )}
              </div>

              <div className={styles.relatedFooter}>
                <div className={styles.relatedProgress} aria-hidden="true">
                  <span style={{ width: relatedProgressWidth }} />
                </div>
              </div>
            </section>
          ) : null}
        </div>
      </section>
    </main>
  );
};
