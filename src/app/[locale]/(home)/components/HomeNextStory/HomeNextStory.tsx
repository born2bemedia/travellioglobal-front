"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";
import { Button } from "@/shared/ui/kit/button/Button";
import { formatDateDDMM } from "@/features/flights-search/lib/date";

import styles from "./HomeNextStory.module.scss";

const INACTIVE_WIDTH = 305;
const GAP = 20;
const AUTOPLAY_DELAY = 5000;
const AVIASALES_SEARCH_BASE_URL = "https://www.aviasales.com/search";
const AVIASALES_DEFAULT_ORIGIN_IATA = "BUD";
const AVIASALES_DEFAULT_DEPART_DATE = "2026-06-15";
const AVIASALES_DEFAULT_RETURN_DATE = "2026-06-22";

const buildAviasalesDestinationUrl = ({
  destinationIata,
}: {
  destinationIata: string;
}) => {
  const departDate = formatDateDDMM(AVIASALES_DEFAULT_DEPART_DATE);
  const returnDate = formatDateDDMM(AVIASALES_DEFAULT_RETURN_DATE);

  return `${AVIASALES_SEARCH_BASE_URL}/${AVIASALES_DEFAULT_ORIGIN_IATA}${departDate}${destinationIata}${returnDate}Y1`;
};

export const HomeNextStory = () => {
  const t = useTranslations("homeNextStory");
  const touchStartX = useRef(0);

  const destinations = useMemo(
    () => [
      {
        key: "madrid",
        city: t("cityMadrid", { fallback: "Madrid" }),
        country: t("countrySpain", { fallback: "Spain" }),
        image: "/images/home/section-story/madrid.webp",
        alt: t("altMadrid", { fallback: "Madrid city architecture" }),
        url: buildAviasalesDestinationUrl({
          destinationIata: "MAD",
        }),
      },
      {
        key: "paris",
        city: t("cityParis", { fallback: "Paris" }),
        country: t("countryFrance", { fallback: "France" }),
        image: "/images/home/section-story/paris.webp",
        alt: t("altParis", { fallback: "Paris golden bridge statue" }),
        url: buildAviasalesDestinationUrl({
          destinationIata: "CDG",
        }),
      },
      {
        key: "newyork",
        city: t("cityNewYork", { fallback: "New York" }),
        country: t("countryUSA", { fallback: "USA" }),
        image: "/images/home/section-story/newyork.webp",
        alt: t("altNewYork", { fallback: "New York skyscrapers" }),
        url: buildAviasalesDestinationUrl({
          destinationIata: "JFK",
        }),
      },
      {
        key: "cairo",
        city: t("cityCairo", { fallback: "Cairo" }),
        country: t("countryEgypt", { fallback: "Egypt" }),
        image: "/images/home/section-story/cairo.webp",
        alt: t("altCairo", { fallback: "Cairo desert landscape" }),
        url: buildAviasalesDestinationUrl({
          destinationIata: "CAI",
        }),
      },
    ],
    [t],
  );

  const slides = useMemo(
    () => [...destinations, ...destinations, ...destinations],
    [destinations],
  );

  const [displayIndex, setDisplayIndex] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const hasLooped = useRef(false);

  const realIndex = displayIndex % destinations.length;

  const slideNext = useCallback(() => {
    setTransitionEnabled(true);
    setDisplayIndex((prev) => prev + 1);
  }, []);

  const slidePrev = useCallback(() => {
    if (displayIndex <= 0) {
      setTransitionEnabled(false);
      setDisplayIndex(destinations.length);
      hasLooped.current = true;
      requestAnimationFrame(() => {
        setTransitionEnabled(true);
        setDisplayIndex(destinations.length - 1);
      });
      return;
    }
    setTransitionEnabled(true);
    setDisplayIndex((prev) => prev - 1);
  }, [displayIndex, destinations.length]);

  const handleTransitionEnd = useCallback(() => {
    if (displayIndex >= destinations.length * 2) {
      setTransitionEnabled(false);
      setDisplayIndex(displayIndex - destinations.length);
      hasLooped.current = true;
    } else if (hasLooped.current && displayIndex < destinations.length) {
      setTransitionEnabled(false);
      setDisplayIndex(displayIndex + destinations.length);
    }
  }, [displayIndex, destinations.length]);

  /*useEffect(() => {
    if (isPaused) return;
    const id = setInterval(slideNext, AUTOPLAY_DELAY);
    return () => clearInterval(id);
  }, [isPaused, slideNext]);*/

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const delta = e.changedTouches[0].clientX - touchStartX.current;
      if (Math.abs(delta) > 50) {
        if (delta < 0) slideNext();
        else slidePrev();
      }
    },
    [slideNext, slidePrev],
  );

  const trackOffset = -(displayIndex * (INACTIVE_WIDTH + GAP));

  return (
    <section className={styles.next_story}>
      <div className={styles.next_story__bg} aria-hidden="true">
        <Image
          src="/images/home/hero-figma/dashed-path.svg"
          alt=""
          width={1858}
          height={513}
        />
      </div>

      <div className="container">
        <motion.div
          className={styles.next_story__content}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={fadeInUp}
        >
          <div className={styles.next_story__headline}>
            <h2>{t("title", { fallback: "Your Next Story Starts Here" })}</h2>

            <div className={styles.next_story__description}>
              <p>
                {t("descriptionLine1", {
                  fallback:
                    "The world is big. Your vacation options? Even bigger.",
                })}
                <br />
                {t("descriptionLine2", {
                  fallback: "Let's plan something unforgettable.",
                })}
              </p>

              <span>
                {t("descriptionSmall", {
                  fallback: "Start your journey today.",
                })}
              </span>
            </div>

            <Button type="link" url="/tours" variant="orange">
              <Image
                src="/images/home/section-story/arrow-right.svg"
                alt=""
                width={23}
                height={20}
              />
              <span>{t("cta", { fallback: "Uncover New Destinations" })}</span>
            </Button>
          </div>

          <div className={styles.next_story__sliderSection}>
            <div className={styles.next_story__navigation}>
              <button
                type="button"
                className={styles.next_story__navButton}
                onClick={slidePrev}
                aria-label={t("previousAria", {
                  fallback: "Previous destinations",
                })}
              >
                <Image
                  src="/images/home/section-gateway/arrow-outline.svg"
                  alt=""
                  width={30}
                  height={25}
                />
              </button>

              <button
                type="button"
                className={styles.next_story__navButton}
                onClick={slideNext}
                aria-label={t("nextAria", {
                  fallback: "Next destinations",
                })}
              >
                <Image
                  src="/images/home/section-gateway/arrow-outline.svg"
                  alt=""
                  width={30}
                  height={25}
                />
              </button>
            </div>

            <div
              className={styles.next_story__slider}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className={styles.next_story__track}
                style={{
                  transform: `translateX(${trackOffset}px)`,
                  transition: transitionEnabled
                    ? "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                    : "none",
                }}
                onTransitionEnd={handleTransitionEnd}
              >
                {slides.map((dest, index) => {
                  const isActive = index === displayIndex;
                  return (
                    <div
                      key={`${dest.key}-${index}`}
                      className={`${styles.next_story__slide} ${
                        isActive ? styles.next_story__slideActive : ""
                      }`}
                    >
                      <a
                        href={dest.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.next_story__card}
                        aria-label={`${t("viewAria", {
                          fallback: "View destination",
                        })}: ${dest.city}`}
                      >
                        <div className={styles.next_story__cardMedia}>
                          <Image
                            src={dest.image}
                            alt={dest.alt}
                            fill
                            sizes="(max-width: 768px) 78vw, (max-width: 1024px) 48vw, 24vw"
                          />

                          <div className={styles.next_story__cardOverlay} />

                          <div className={styles.next_story__cardTop}>
                            <span className={styles.next_story__country}>
                              {dest.country}
                            </span>

                            <span
                              className={styles.next_story__cardArrow}
                              aria-hidden="true"
                            >
                              <Image
                                src="/images/home/section-story/arrow-right.svg"
                                alt=""
                                width={31}
                                height={30}
                              />
                            </span>
                          </div>

                          <h3 className={styles.next_story__cityName}>
                            {dest.city}
                          </h3>
                        </div>
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
