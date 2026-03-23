"use client";

import { useState } from "react";
import Image from "next/image";

import { useTranslations } from "next-intl";
import Select from "react-select";

import type { AirportOption } from "@/features/flight-search/lib/airports";
import { airports } from "@/features/flight-search/lib/airports";
import {
  addDays,
  formatDate,
  formatDateDisplay,
} from "@/features/places-search/lib/date";
import { getPlacesSearchSelectStyles } from "@/features/places-search/lib/selectStyles";

import styles from "./CarSearchForm.module.scss";

const DISCOVERCARS_BASE_URL = "https://www.discovercars.com";

const selectValueLabel = (option: AirportOption) =>
  option.label.split(",")[0].trim();

const selectStyles = getPlacesSearchSelectStyles<AirportOption>();

export const CarSearchForm = () => {
  const t = useTranslations("carsPage");

  const today = new Date();
  const defaultPickup = formatDate(addDays(today, 1));
  const defaultDropoff = formatDate(addDays(today, 8));

  const [pickupLocation, setPickupLocation] = useState<AirportOption | null>(
    null,
  );
  const [dropoffLocation, setDropoffLocation] =
    useState<AirportOption | null>(null);
  const [differentDropoff, setDifferentDropoff] = useState(false);
  const [pickupDate, setPickupDate] = useState(defaultPickup);
  const [pickupTime, setPickupTime] = useState("10:00");
  const [dropoffDate, setDropoffDate] = useState(defaultDropoff);
  const [dropoffTime, setDropoffTime] = useState("10:00");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.open(DISCOVERCARS_BASE_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={styles.search}>
      <form className={styles.search__form} onSubmit={handleSubmit}>
        <div className={styles.search__fields}>
          <div className={styles.search__rowTop}>
            <div className={styles.search__field}>
              <div className={styles.search__fieldInner}>
                <Image
                  src="/images/places/map-pin.svg"
                  alt=""
                  width={24}
                  height={24}
                />
                <div className={styles.search__selectWrap}>
                  <Select<AirportOption>
                    options={airports}
                    value={pickupLocation}
                    onChange={setPickupLocation}
                    placeholder={t("pickupPlaceholder", {
                      fallback: "Enter pick-up location",
                    })}
                    aria-label={t("pickupLabel", {
                      fallback: "Pick-up location",
                    })}
                    styles={selectStyles}
                    formatOptionLabel={(option, meta) =>
                      meta.context === "value"
                        ? selectValueLabel(option)
                        : option.label
                    }
                    isSearchable
                    isClearable={false}
                    menuPlacement="top"
                  />
                </div>
              </div>
            </div>

            <div className={styles.search__field}>
              <div className={styles.search__fieldInner}>
                <Image
                  src="/images/places/map-pin.svg"
                  alt=""
                  width={24}
                  height={24}
                />
                <div className={styles.search__selectWrap}>
                  <Select<AirportOption>
                    options={airports}
                    value={dropoffLocation}
                    onChange={setDropoffLocation}
                    placeholder={t("dropoffPlaceholder", {
                      fallback: "Enter drop-off location",
                    })}
                    aria-label={t("dropoffLabel", {
                      fallback: "Drop-off location",
                    })}
                    styles={selectStyles}
                    formatOptionLabel={(option, meta) =>
                      meta.context === "value"
                        ? selectValueLabel(option)
                        : option.label
                    }
                    isSearchable
                    isClearable={false}
                    menuPlacement="top"
                  />
                </div>
              </div>
            </div>
          </div>

          <label className={styles.search__checkbox}>
            <input
              type="checkbox"
              checked={differentDropoff}
              onChange={(e) => setDifferentDropoff(e.target.checked)}
              className={styles.search__checkboxInput}
            />
            <span className={styles.search__checkboxBox} />
            <span>
              {t("differentDropoff", {
                fallback: "Drop car off at different location",
              })}
            </span>
          </label>

          <div className={styles.search__rowBottom}>
            <label className={styles.search__field}>
              <span className={styles.search__fieldInner}>
                <Image
                  src="/images/places/calendar-dots.svg"
                  alt=""
                  width={24}
                  height={24}
                />
                <span className={styles.search__dateDisplay}>
                  {formatDateDisplay(pickupDate)}
                </span>
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  aria-label={t("pickupDateLabel", {
                    fallback: "Pick-up date",
                  })}
                  className={styles.search__dateInput}
                  required
                />
              </span>
            </label>

            <div className={styles.search__field}>
              <div className={styles.search__fieldInner}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="9.75"
                    stroke="#fffcf1"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M12 7V12L15 15"
                    stroke="#fffcf1"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <select
                  className={styles.search__timeSelect}
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  aria-label={t("pickupTimeLabel", {
                    fallback: "Pick-up time",
                  })}
                >
                  {Array.from({ length: 48 }, (_, i) => {
                    const h = Math.floor(i / 2);
                    const m = i % 2 === 0 ? "00" : "30";
                    const value = `${String(h).padStart(2, "0")}:${m}`;
                    const period = h >= 12 ? "pm" : "am";
                    const displayH = h === 0 ? 12 : h > 12 ? h - 12 : h;
                    const label = `${displayH}:${m} ${period}`;
                    return (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <label className={styles.search__field}>
              <span className={styles.search__fieldInner}>
                <Image
                  src="/images/places/calendar-dots.svg"
                  alt=""
                  width={24}
                  height={24}
                />
                <span className={styles.search__dateDisplay}>
                  {formatDateDisplay(dropoffDate)}
                </span>
                <input
                  type="date"
                  value={dropoffDate}
                  min={pickupDate}
                  onChange={(e) => setDropoffDate(e.target.value)}
                  aria-label={t("dropoffDateLabel", {
                    fallback: "Drop-off date",
                  })}
                  className={styles.search__dateInput}
                  required
                />
              </span>
            </label>

            <div className={styles.search__field}>
              <div className={styles.search__fieldInner}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="9.75"
                    stroke="#fffcf1"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M12 7V12L15 15"
                    stroke="#fffcf1"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <select
                  className={styles.search__timeSelect}
                  value={dropoffTime}
                  onChange={(e) => setDropoffTime(e.target.value)}
                  aria-label={t("dropoffTimeLabel", {
                    fallback: "Drop-off time",
                  })}
                >
                  {Array.from({ length: 48 }, (_, i) => {
                    const h = Math.floor(i / 2);
                    const m = i % 2 === 0 ? "00" : "30";
                    const value = `${String(h).padStart(2, "0")}:${m}`;
                    const period = h >= 12 ? "pm" : "am";
                    const displayH = h === 0 ? 12 : h > 12 ? h - 12 : h;
                    const label = `${displayH}:${m} ${period}`;
                    return (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
        </div>

        <button type="submit" className={styles.search__submit}>
          <Image
            src="/images/shared/flight-search/search.svg"
            alt=""
            width={20}
            height={20}
          />
          <span>{t("searchButton", { fallback: "Search" })}</span>
        </button>
      </form>
    </div>
  );
};
