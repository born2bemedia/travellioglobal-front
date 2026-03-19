"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import type { SortOption, TourRegion } from "@/features/tours";
import {
  TOUR_REGIONS,
  TourCard,
  TOURS_PER_PAGE,
  useTourRegionLabels,
  useTours,
} from "@/features/tours";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./ToursContent.module.scss";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "default", label: "Default order" },
  { value: "popularity", label: "By Popularity" },
  { value: "rating", label: "By Rating" },
  { value: "latest", label: "By Latest" },
  { value: "price-asc", label: "By Price: Low to High" },
  { value: "price-desc", label: "By Price: High to Low" },
];

export const ToursContent = () => {
  const t = useTranslations("toursPage");
  const tours = useTours();
  const regionLabels = useTourRegionLabels();
  const sortRef = useRef<HTMLDivElement>(null);

  const [search, setSearch] = useState("");
  const [selectedRegions, setSelectedRegions] = useState<TourRegion[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [sortOpen, setSortOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleRegion = useCallback((region: TourRegion) => {
    setSelectedRegions((prev) =>
      prev.includes(region)
        ? prev.filter((r) => r !== region)
        : [...prev, region],
    );
    setCurrentPage(1);
  }, []);

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
    setCurrentPage(1);
  }, []);

  const handleSort = useCallback((option: SortOption) => {
    setSortBy(option);
    setSortOpen(false);
    setCurrentPage(1);
  }, []);

  const filteredAndSortedTours = useMemo(() => {
    let result = [...tours];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (tour) =>
          tour.title.toLowerCase().includes(q) ||
          regionLabels[tour.region].toLowerCase().includes(q),
      );
    }

    if (selectedRegions.length > 0) {
      result = result.filter((tour) => selectedRegions.includes(tour.region));
    }

    switch (sortBy) {
      case "popularity":
        result.sort((a, b) => b.popularity - a.popularity);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "latest":
        result.sort((a, b) => b.createdAt - a.createdAt);
        break;
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return result;
  }, [tours, search, selectedRegions, sortBy, regionLabels]);

  const totalPages = Math.ceil(filteredAndSortedTours.length / TOURS_PER_PAGE);
  const paginatedTours = filteredAndSortedTours.slice(
    (currentPage - 1) * TOURS_PER_PAGE,
    currentPage * TOURS_PER_PAGE,
  );

  const currentSortLabel =
    SORT_OPTIONS.find((o) => o.value === sortBy)?.label ?? "Default order";

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }

    const arrowIcon = (
      <svg
        width="30"
        height="25"
        viewBox="0 0 30 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 12.5H27M27 12.5L17 2.5M27 12.5L17 22.5"
          stroke="#eb5e28"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );

    return (
      <div className={styles.pagination}>
        <button
          type="button"
          className={`${styles.pagination__arrow} ${styles.pagination__arrowLeft}`}
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          {arrowIcon}
        </button>

        <div className={styles.pagination__pages}>
          {pages.map((page, idx) =>
            typeof page === "string" ? (
              <span key={`ellipsis-${idx}`} className={styles.pagination__dots}>
                ...
              </span>
            ) : (
              <button
                key={page}
                type="button"
                className={`${styles.pagination__page} ${
                  page === currentPage ? styles.pagination__pageActive : ""
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ),
          )}
        </div>

        <button
          type="button"
          className={styles.pagination__arrow}
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          {arrowIcon}
        </button>
      </div>
    );
  };

  return (
    <section className={styles.content}>
      <div className="container">
        <motion.div
          className={styles.content__inner}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
        >
          <h2 className={styles.content__heading}>
            {t("findDestination", {
              fallback: "Find Your Next Destination",
            })}
          </h2>

          <div className={styles.content__controls}>
            <div className={styles.content__search}>
              <input
                type="text"
                placeholder={t("searchPlaceholder", {
                  fallback: "Search for Your Dream Tour...",
                })}
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className={styles.content__searchInput}
              />
              <svg
                className={styles.content__searchIcon}
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="8"
                  stroke="#eb5e28"
                  strokeWidth="2"
                />
                <path
                  d="M17 17L24 24"
                  stroke="#eb5e28"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className={styles.content__sortRow}>
              <button
                type="button"
                className={styles.content__filterToggle}
                onClick={() => setFiltersOpen((prev) => !prev)}
                aria-label="Toggle filters"
              >
                <svg
                  width="21"
                  height="11"
                  viewBox="0 0 21 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.75 0.75H20.25"
                    stroke="#eb5e28"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M3.75 5.25H17.25"
                    stroke="#eb5e28"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M6.75 9.75H14.25"
                    stroke="#eb5e28"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              <div className={styles.content__sortWrapper} ref={sortRef}>
                <button
                  type="button"
                  className={styles.content__sortTrigger}
                  onClick={() => setSortOpen((prev) => !prev)}
                >
                  <span>{currentSortLabel}</span>
                  <svg
                    className={`${styles.content__chevron} ${sortOpen ? styles.content__chevronOpen : ""}`}
                    width="16"
                    height="13"
                    viewBox="0 0 16 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 4L8 11L15 4"
                      stroke="#eb5e28"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {sortOpen && (
                  <div className={styles.content__sortDropdown}>
                    {SORT_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        className={`${styles.content__sortOption} ${
                          sortBy === option.value
                            ? styles.content__sortOptionActive
                            : ""
                        }`}
                        onClick={() => handleSort(option.value)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={styles.content__body}>
            <aside
              className={`${styles.content__filters} ${filtersOpen ? styles.content__filtersOpen : ""}`}
            >
              <h3 className={styles.content__filtersTitle}>
                {t("tourCollections", { fallback: "Tour Collections" })}
              </h3>

              <div className={styles.content__filtersList}>
                {TOUR_REGIONS.map((region) => (
                  <label key={region} className={styles.content__filterItem}>
                    <input
                      type="checkbox"
                      checked={selectedRegions.includes(region)}
                      onChange={() => toggleRegion(region)}
                      className={styles.content__checkbox}
                    />
                    <span className={styles.content__filterLabel}>
                      {regionLabels[region]}
                    </span>
                  </label>
                ))}
              </div>
            </aside>

            <div className={styles.content__main}>
              {paginatedTours.length > 0 ? (
                <div className={styles.content__grid}>
                  {paginatedTours.map((tour) => (
                    <TourCard key={tour.id} tour={tour} />
                  ))}
                </div>
              ) : (
                <div className={styles.content__empty}>
                  <p>
                    {t("noTours", {
                      fallback:
                        "No tours found. Try adjusting your filters or search.",
                    })}
                  </p>
                </div>
              )}

              {renderPagination()}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
