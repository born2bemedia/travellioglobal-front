"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { useCartStore } from "@/features/cart";
import { useTourRegionLabels, useTours } from "@/features/tours";

import { fadeInUp } from "@/shared/lib/helpers/animations";
import { Button } from "@/shared/ui/kit/button/Button";

import styles from "./HomeGatewayAdventures.module.scss";

import { Link } from "@/i18n/navigation";

const INACTIVE_WIDTH = 305;
const GAP = 20;
const AUTOPLAY_DELAY = 5000;

export const HomeGatewayAdventures = () => {
  const t = useTranslations("homeGatewayAdventures");
  const addToCart = useCartStore((state) => state.addToCart);
  const regionLabels = useTourRegionLabels();
  const allTours = useTours();
  const touchStartX = useRef(0);

  const tours = useMemo(
    () =>
      allTours.map((tour) => ({
        key: tour.id,
        title: tour.title,
        price: `€${tour.price.toLocaleString("en-IE")}`,
        numericPrice: tour.price,
        image: tour.image,
        area: regionLabels[tour.region],
        rating: `${tour.rating}/5`,
        alt: tour.title,
      })),
    [allTours, regionLabels],
  );

  // Slides: [copy1, copy2, copy3] — three copies of tours.
  // Start at displayIndex 0 so the first card sits at the left edge on load.
  // Forward wrap: when displayIndex reaches copy3 (>= tours.length * 2),
  //   instantly jump back by tours.length.
  // Backward wrap: at displayIndex 0 we teleport to tours.length,
  //   then animate to tours.length - 1. Subsequent transitionEnd
  //   jumps us forward by tours.length to stay in copy2 range.
  const slides = useMemo(() => [...tours, ...tours, ...tours], [tours]);

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
    (tour: typeof tours[number]) => {
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
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M9.5 7.45508C9.5 7.36879 9.5117 7.28225 9.53418 7.19824L9.56641 7.10059L9.60254 7.01855C9.62726 6.96847 9.65716 6.92041 9.69141 6.87402L9.75684 6.79395L9.82324 6.72754C9.8648 6.69079 9.91143 6.65798 9.96191 6.62793L10.0518 6.58008L10.1455 6.54395C10.1884 6.53009 10.232 6.51895 10.2764 6.51172L10.417 6.5C10.5442 6.50002 10.6684 6.52767 10.7822 6.5791C10.8969 6.63093 10.9985 6.7049 11.0811 6.79492L15.2471 11.3408C15.3299 11.4313 15.393 11.5365 15.4355 11.6484C15.4675 11.7325 15.4881 11.8206 15.4961 11.9102L15.5 12C15.5 12.1202 15.4781 12.2395 15.4355 12.3516C15.393 12.4635 15.3299 12.5687 15.2471 12.6592L11.0811 17.2051C10.9342 17.3653 10.7325 17.4711 10.5127 17.4951L10.417 17.499L10.3145 17.4941C10.0995 17.4692 9.90398 17.3651 9.75879 17.209L9.69238 17.1299C9.56789 16.9626 9.5026 16.7587 9.50098 16.5527L9.50586 16.4482C9.52305 16.2734 9.58588 16.1041 9.69238 15.9609L9.76953 15.8672L13.0049 12.3379L13.3154 12L13.0049 11.6621L9.77051 8.13379L9.69238 8.04004C9.63949 7.96901 9.59768 7.89087 9.56641 7.80957L9.53418 7.71191C9.51153 7.62753 9.50003 7.54113 9.5 7.45508Z"
                                fill="#FFFDF1"
                              />
                            </svg>
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

            <Link
              href="/tours"
              className={styles.home_gateway__cta}
            >
              {t("cta", { fallback: "Let's Go Touring" })}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
