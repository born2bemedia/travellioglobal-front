"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { useCartStore } from "@/features/cart";

import { fadeInUp } from "@/shared/lib/helpers/animations";
import { Button } from "@/shared/ui/kit/button/Button";

import styles from "./HomeGatewayAdventures.module.scss";

const INACTIVE_WIDTH = 305;
const GAP = 20;
const AUTOPLAY_DELAY = 5000;

export const HomeGatewayAdventures = () => {
  const t = useTranslations("homeGatewayAdventures");
  const addToCart = useCartStore((state) => state.addToCart);
  const touchStartX = useRef(0);

  const tours = useMemo(
    () => [
      {
        key: "kenyaMain",
        title: t("tourKenyaMainTitle", {
          fallback: "Ultimate Kenya, Tanzania, and Zanzibar Experience 2024",
        }),
        price: t("tourKenyaMainPrice", { fallback: "€33,100" }),
        numericPrice: 33100,
        image: "/images/home/section-gateway/tour-kenya-main.webp",
        area: t("tourKenyaMainArea", { fallback: "Middle East & Africa" }),
        rating: t("tourKenyaMainRating", { fallback: "4.5/5" }),
        alt: t("tourKenyaMainAlt", {
          fallback: "Kenya and Tanzania safari landscape",
        }),
      },
      {
        key: "kenyaWildlife",
        title: t("tourKenyaWildlifeTitle", {
          fallback: "16-Day Kenya and Tanzania Wildlife Adventure",
        }),
        price: t("tourKenyaWildlifePrice", { fallback: "€19,500" }),
        numericPrice: 19500,
        image: "/images/home/section-gateway/tour-kenya-wildlife.webp",
        area: t("tourKenyaWildlifeArea", { fallback: "Middle East & Africa" }),
        rating: t("tourKenyaWildlifeRating", { fallback: "4.7/5" }),
        alt: t("tourKenyaWildlifeAlt", {
          fallback: "Zebras during sunset safari",
        }),
      },
      {
        key: "kyotoTea",
        title: t("tourKyotoTeaTitle", {
          fallback:
            "7-Day Tea Craftsmanship Journey Through Kyoto, Uji, and Aizu-Wakamatsu",
        }),
        price: t("tourKyotoTeaPrice", { fallback: "€5,100" }),
        numericPrice: 5100,
        image: "/images/home/section-gateway/tour-kyoto-tea.webp",
        area: t("tourKyotoTeaArea", { fallback: "Asia" }),
        rating: t("tourKyotoTeaRating", { fallback: "4.8/5" }),
        alt: t("tourKyotoTeaAlt", { fallback: "Tea leaves in hand" }),
      },
      {
        key: "safariAdventure",
        title: t("tourSafariAdventureTitle", {
          fallback:
            "9 Days Safari to Amboseli, Lake Manyara, Ngorongoro, Serengeti and Maasai Mara",
        }),
        price: t("tourSafariAdventurePrice", { fallback: "€6,500" }),
        numericPrice: 6500,
        image: "/images/home/section-gateway/tour-safari.webp",
        area: t("tourSafariAdventureArea", {
          fallback: "Middle East & Africa",
        }),
        rating: t("tourSafariAdventureRating", { fallback: "4.6/5" }),
        alt: t("tourSafariAdventureAlt", {
          fallback: "Safari canyon and sky view",
        }),
      },
    ],
    [t],
  );

  // Slides: [copy1, copy2, copy3] — three copies of tours.
  // Start at displayIndex 0 so the first card sits at the left edge on load.
  // Forward wrap: when displayIndex reaches copy3 (>= tours.length * 2),
  //   instantly jump back by tours.length.
  // Backward wrap: at displayIndex 0 we teleport to tours.length,
  //   then animate to tours.length - 1. Subsequent transitionEnd
  //   jumps us forward by tours.length to stay in copy2 range.
  const slides = useMemo(
    () => [...tours, ...tours, ...tours],
    [tours],
  );

  const [displayIndex, setDisplayIndex] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const hasLooped = useRef(false);

  const realIndex = displayIndex % tours.length;

  const slideNext = useCallback(() => {
    setTransitionEnabled(true);
    setDisplayIndex((prev) => prev + 1);
  }, []);

  const slidePrev = useCallback(() => {
    if (displayIndex <= 0) {
      // Teleport to clone range, then animate one step back
      setTransitionEnabled(false);
      setDisplayIndex(tours.length);
      hasLooped.current = true;
      requestAnimationFrame(() => {
        setTransitionEnabled(true);
        setDisplayIndex(tours.length - 1);
      });
      return;
    }
    setTransitionEnabled(true);
    setDisplayIndex((prev) => prev - 1);
  }, [displayIndex, tours.length]);

  const handleTransitionEnd = useCallback(() => {
    if (displayIndex >= tours.length * 2) {
      // Forward overflow → jump back into copy2 range
      setTransitionEnabled(false);
      setDisplayIndex(displayIndex - tours.length);
      hasLooped.current = true;
    } else if (hasLooped.current && displayIndex < tours.length) {
      // Backward into copy1 after a loop → jump forward into copy2
      setTransitionEnabled(false);
      setDisplayIndex(displayIndex + tours.length);
    }
  }, [displayIndex, tours.length]);

  // Autoplay
  /**useEffect(() => {
    if (isPaused) return;
    const id = setInterval(slideNext, AUTOPLAY_DELAY);
    return () => clearInterval(id);
  }, [isPaused, slideNext]); */

  // Touch handling
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

  const handleAddToCart = useCallback(
    (tour: (typeof tours)[number]) => {
      addToCart({
        id: tour.key,
        title: String(tour.title),
        price: tour.numericPrice,
        quantity: 1,
      });
    },
    [addToCart],
  );

  const trackOffset = -(displayIndex * (INACTIVE_WIDTH + GAP));
  const progressWidth = `${((realIndex + 1) / tours.length) * 100}%`;

  return (
    <section className={styles.home_gateway}>
      <div className="container">
        <motion.div
          className={styles.home_gateway__content}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={fadeInUp}
        >
          <div className={styles.home_gateway__headline}>
            <h2>
              {t("title", {
                fallback: "Your Gateway to Worldwide Adventures",
              })}
            </h2>

            <p>
              {t("description", {
                fallback:
                  "Choose your departure. Set your preferences. Filter by mood (yes, mood). Discover places that feel made for you.",
              })}
            </p>
          </div>

          <div className={styles.home_gateway__toolbar}>
            <p className={styles.home_gateway__lead}>
              {t("lead", {
                fallback:
                  "Spain sunshine? Paris romance? New York energy? Maldives serenity? All within reach.",
              })}
            </p>

            <div className={styles.home_gateway__navigation}>
              <button
                type="button"
                className={styles.home_gateway__navButton}
                onClick={slidePrev}
                aria-label={t("previousAria", { fallback: "Previous tours" })}
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
                className={styles.home_gateway__navButton}
                onClick={slideNext}
                aria-label={t("nextAria", { fallback: "Next tours" })}
              >
                <Image
                  src="/images/home/section-gateway/arrow-outline.svg"
                  alt=""
                  width={30}
                  height={25}
                />
              </button>
            </div>
          </div>

          <div
            className={styles.home_gateway__slider}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className={styles.home_gateway__track}
              style={{
                transform: `translateX(${trackOffset}px)`,
                transition: transitionEnabled
                  ? "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                  : "none",
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {slides.map((tour, index) => {
                const isActive = index === displayIndex;
                return (
                  <div
                    key={`${tour.key}-${index}`}
                    className={`${styles.home_gateway__slide} ${
                      isActive ? styles.home_gateway__slideActive : ""
                    }`}
                  >
                    <article className={styles.home_gateway__card}>
                      <div className={styles.home_gateway__cardMedia}>
                        <Image
                          src={tour.image}
                          alt={tour.alt}
                          fill
                          sizes="(max-width: 768px) 78vw, (max-width: 1024px) 48vw, 24vw"
                        />

                        <div className={styles.home_gateway__cardOverlay} />

                        <div className={styles.home_gateway__cardTop}>
                          <div className={styles.home_gateway__cardMeta}>
                            <span className={styles.home_gateway__area}>
                              {tour.area}
                            </span>

                            <div className={styles.home_gateway__rating}>
                              <span
                                className={styles.home_gateway__stars}
                                aria-hidden="true"
                              >
                                ★★★★★
                              </span>
                              <span>{tour.rating}</span>
                            </div>
                          </div>

                          <button
                            type="button"
                            className={styles.home_gateway__cardArrow}
                            aria-label={t("tourAria", {
                              fallback: "View tour details",
                            })}
                          >
                            <Image
                              src="/images/home/section-gateway/arrow-solid.svg"
                              alt=""
                              width={31}
                              height={30}
                            />
                          </button>
                        </div>

                        <h3>{tour.title}</h3>
                      </div>

                      <div className={styles.home_gateway__cardBottom}>
                        <p className={styles.home_gateway__price}>
                          {tour.price}
                        </p>

                        <Button
                          type="button"
                          variant="orange"
                          onClick={() => handleAddToCart(tour)}
                        >
                          <span>
                            {t("addToCart", { fallback: "Add to cart" })}
                          </span>
                          <span
                            className={styles.home_gateway__cartArrow}
                            aria-hidden="true"
                          >
                            ›
                          </span>
                        </Button>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={styles.home_gateway__footer}>
            <div className={styles.home_gateway__progress} aria-hidden="true">
              <span style={{ width: progressWidth }} />
            </div>

            <button type="button" className={styles.home_gateway__cta}>
              {t("cta", { fallback: "Let's Go Touring" })}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
