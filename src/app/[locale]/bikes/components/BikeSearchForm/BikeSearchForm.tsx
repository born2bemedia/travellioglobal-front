"use client";

import { useState } from "react";
import Image from "next/image";

import { useLocale, useTranslations } from "next-intl";
import type { ChangeEvent, FormEvent } from "react";
import Select, {
  type StylesConfig,
} from "react-select";

import {
  addDays,
  formatDate,
} from "@/features/places-search/lib/date";
import { getPlacesSearchSelectStyles } from "@/features/places-search/lib/selectStyles";

import { BIKE_CITY_OPTIONS, createBikesSearchUrl } from "../../lib/search";
import styles from "./BikeSearchForm.module.scss";

type BikeSearchFormProps = {
  compact?: boolean;
};

type BikeSelectOption = {
  value: string;
  label: string;
};

const DEFAULT_CITY =
  BIKE_CITY_OPTIONS.find((option) => option.value === "16004") ??
  BIKE_CITY_OPTIONS[0];

const TIME_OPTIONS: BikeSelectOption[] = Array.from({ length: 48 }, (_, index) => {
  const hours = Math.floor(index / 2);
  const minutes = index % 2 === 0 ? "00" : "30";
  const value = `${String(hours).padStart(2, "0")}:${minutes}`;
  const period = hours >= 12 ? "pm" : "am";
  const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;

  return {
    value,
    label: `${displayHours}:${minutes} ${period}`,
  };
});

const toIsoDateTime = (date: string, time: string) => `${date}T${time}:00.000Z`;

const baseSelectStyles = getPlacesSearchSelectStyles<BikeSelectOption>();

const getBikeSelectStyles = (
  isMobileViewport: boolean,
): StylesConfig<BikeSelectOption, false> => ({
  ...baseSelectStyles,
  control: (provided, state) => ({
    ...(baseSelectStyles.control
      ? baseSelectStyles.control(provided, state)
      : provided),
    minHeight: "40px",
  }),
  valueContainer: (provided, state) => ({
    ...(baseSelectStyles.valueContainer
      ? baseSelectStyles.valueContainer(provided, state)
      : provided),
    padding: 0,
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    padding: 0,
    display: "none",
  }),
  singleValue: (provided, state) => ({
    ...(baseSelectStyles.singleValue
      ? baseSelectStyles.singleValue(provided, state)
      : provided),
    color: state.isDisabled ? "rgba(255, 253, 241, 0.55)" : "#fffcf1",
    margin: 0,
    fontSize: isMobileViewport ? "16px" : "20px",
    lineHeight: 1,
  }),
  placeholder: (provided, state) => ({
    ...(baseSelectStyles.placeholder
      ? baseSelectStyles.placeholder(provided, state)
      : provided),
    color: state.isDisabled ? "rgba(255, 253, 241, 0.4)" : "rgba(255, 252, 241, 0.72)",
    margin: 0,
    fontSize: isMobileViewport ? "16px" : "20px",
    lineHeight: 1,
  }),
  input: (provided, state) => ({
    ...(baseSelectStyles.input ? baseSelectStyles.input(provided, state) : provided),
    margin: 0,
    padding: 0,
    fontSize: isMobileViewport ? "16px" : "20px",
  }),
  menuPortal: (provided) => ({
    ...provided,
    zIndex: 9999,
  }),
});

const formatSearchDate = (value: string, locale: string) => {
  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
};

export const BikeSearchForm = ({ compact = false }: BikeSearchFormProps) => {
  const t = useTranslations("bikesPage");
  const locale = useLocale();
  const isMobileViewport =
    typeof window !== "undefined" && window.innerWidth <= 768;
  const bikesSelectStyles = getBikeSelectStyles(isMobileViewport);

  const today = new Date();
  const defaultPickupDate = formatDate(addDays(today, 2));
  const defaultDropoffDate = formatDate(addDays(today, 5));

  const [pickupCity, setPickupCity] = useState<string | null>(null);
  const [dropoffCity, setDropoffCity] = useState<string | null>(null);
  const [differentDropoff, setDifferentDropoff] = useState(false);
  const [pickupDate, setPickupDate] = useState(defaultPickupDate);
  const [pickupTime, setPickupTime] = useState("10:00");
  const [dropoffDate, setDropoffDate] = useState(defaultDropoffDate);
  const [dropoffTime, setDropoffTime] = useState("10:00");
  const menuPortalTarget =
    typeof window === "undefined" ? undefined : document.body;

  const handleDifferentDropoffChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const isChecked = event.target.checked;

    setDifferentDropoff(isChecked);

    if (!isChecked) {
      setDropoffCity(null);
    }
  };

  const handlePickupCityChange = (option: BikeSelectOption | null) => {
    const nextPickupCity = option?.value ?? null;

    setPickupCity(nextPickupCity);

    if (!differentDropoff) {
      setDropoffCity(null);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const url = createBikesSearchUrl({
      begin: toIsoDateTime(pickupDate, pickupTime),
      end: toIsoDateTime(dropoffDate, dropoffTime),
      pickUpCity: pickupCity ?? DEFAULT_CITY.value,
      dropOfCity: differentDropoff
        ? (dropoffCity ?? pickupCity ?? DEFAULT_CITY.value)
        : undefined,
      returnAtSameCity: !differentDropoff,
    });

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const selectedPickupCity =
    BIKE_CITY_OPTIONS.find((option) => option.value === pickupCity) ?? null;
  const selectedDropoffCity =
    BIKE_CITY_OPTIONS.find((option) => option.value === dropoffCity) ?? null;
  const selectedPickupTime =
    TIME_OPTIONS.find((option) => option.value === pickupTime) ?? TIME_OPTIONS[20];
  const selectedDropoffTime =
    TIME_OPTIONS.find((option) => option.value === dropoffTime) ?? TIME_OPTIONS[20];

  return (
    <div className={`${styles.search} ${compact ? styles.compact : ""}`}>
      <form className={styles.search__form} onSubmit={handleSubmit}>
        <div className={styles.search__fields}>
          <div className={styles.search__rowTop}>
            <label className={styles.search__field}>
              <span className={styles.search__fieldInner}>
                <Image
                  src="/images/bikes/form-map-pin.svg"
                  alt=""
                  width={24}
                  height={24}
                />
                <div className={styles.search__selectWrap}>
                  <Select<BikeSelectOption>
                    options={BIKE_CITY_OPTIONS}
                    value={selectedPickupCity}
                    onChange={handlePickupCityChange}
                    placeholder={t("searchPickupLabel", {
                      fallback: "Enter pick up city",
                    })}
                    aria-label={t("searchPickupLabel", {
                      fallback: "Enter pick up city",
                    })}
                    styles={bikesSelectStyles}
                    isSearchable={false}
                    isClearable={false}
                    menuPlacement="top"
                    menuPosition="fixed"
                    menuPortalTarget={menuPortalTarget}
                    components={{ IndicatorSeparator: null }}
                  />
                </div>
              </span>
            </label>

            <label className={styles.search__field}>
              <span className={styles.search__fieldInner}>
                <Image
                  src="/images/bikes/form-map-pin.svg"
                  alt=""
                  width={24}
                  height={24}
                />
                <div className={styles.search__selectWrap}>
                  <Select<BikeSelectOption>
                    options={BIKE_CITY_OPTIONS}
                    value={differentDropoff ? selectedDropoffCity : null}
                    onChange={(option) =>
                      setDropoffCity(option?.value ?? null)
                    }
                    placeholder={t("searchDropoffLabel", {
                      fallback: "Enter drop-off city",
                    })}
                    aria-label={t("searchDropoffLabel", {
                      fallback: "Enter drop-off city",
                    })}
                    styles={bikesSelectStyles}
                    isSearchable={false}
                    isClearable={false}
                    isDisabled={!differentDropoff}
                    menuPlacement="top"
                    menuPosition="fixed"
                    menuPortalTarget={menuPortalTarget}
                    components={{ IndicatorSeparator: null }}
                  />
                </div>
              </span>
            </label>
          </div>

          <label className={styles.search__checkbox}>
            <input
              type="checkbox"
              checked={differentDropoff}
              onChange={handleDifferentDropoffChange}
              className={styles.search__checkboxInput}
            />
            <span className={styles.search__checkboxBox} aria-hidden="true" />
            <span>
              {t("searchSameReturn", {
                fallback: "Drop car off at different location",
              })}
            </span>
          </label>

          <div className={styles.search__rowBottom}>
            <label className={styles.search__field}>
              <span className={styles.search__fieldInner}>
                <Image
                  src="/images/bikes/form-calendar.svg"
                  alt=""
                  width={24}
                  height={24}
                />
                <span className={styles.search__dateDisplay}>
                  {formatSearchDate(pickupDate, locale)}
                </span>
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(event) => setPickupDate(event.target.value)}
                  min={defaultPickupDate}
                  aria-label={t("searchPickupDateLabel", {
                    fallback: "Pick-up date",
                  })}
                  className={styles.search__dateInput}
                  required
                />
              </span>
            </label>

            <label className={styles.search__field}>
              <span className={styles.search__fieldInner}>
                <Image
                  src="/images/bikes/form-clock.svg"
                  alt=""
                  width={24}
                  height={24}
                />
                <div className={styles.search__selectWrap}>
                  <Select<BikeSelectOption>
                    options={TIME_OPTIONS}
                    value={selectedPickupTime}
                    onChange={(option) =>
                      setPickupTime(option?.value ?? TIME_OPTIONS[20].value)
                    }
                    placeholder={t("searchPickupTimeLabel", {
                      fallback: "Pick-up time",
                    })}
                    aria-label={t("searchPickupTimeLabel", {
                      fallback: "Pick-up time",
                    })}
                    styles={bikesSelectStyles}
                    isSearchable={false}
                    isClearable={false}
                    menuPlacement="top"
                    menuPosition="fixed"
                    menuPortalTarget={menuPortalTarget}
                    components={{ IndicatorSeparator: null }}
                  />
                </div>
              </span>
            </label>

            <label className={styles.search__field}>
              <span className={styles.search__fieldInner}>
                <Image
                  src="/images/bikes/form-calendar.svg"
                  alt=""
                  width={24}
                  height={24}
                />
                <span className={styles.search__dateDisplay}>
                  {formatSearchDate(dropoffDate, locale)}
                </span>
                <input
                  type="date"
                  value={dropoffDate}
                  min={pickupDate}
                  onChange={(event) => setDropoffDate(event.target.value)}
                  aria-label={t("searchDropoffDateLabel", {
                    fallback: "Drop-off date",
                  })}
                  className={styles.search__dateInput}
                  required
                />
              </span>
            </label>

            <label className={styles.search__field}>
              <span className={styles.search__fieldInner}>
                <Image
                  src="/images/bikes/form-clock.svg"
                  alt=""
                  width={24}
                  height={24}
                />
                <div className={styles.search__selectWrap}>
                  <Select<BikeSelectOption>
                    options={TIME_OPTIONS}
                    value={selectedDropoffTime}
                    onChange={(option) =>
                      setDropoffTime(option?.value ?? TIME_OPTIONS[20].value)
                    }
                    placeholder={t("searchDropoffTimeLabel", {
                      fallback: "Drop-off time",
                    })}
                    aria-label={t("searchDropoffTimeLabel", {
                      fallback: "Drop-off time",
                    })}
                    styles={bikesSelectStyles}
                    isSearchable={false}
                    isClearable={false}
                    menuPlacement="top"
                    menuPosition="fixed"
                    menuPortalTarget={menuPortalTarget}
                    components={{ IndicatorSeparator: null }}
                  />
                </div>
              </span>
            </label>
          </div>
        </div>

        <button type="submit" className={styles.search__submit}>
          <Image
            src="/images/bikes/form-search.svg"
            alt=""
            width={20}
            height={20}
          />
          <span>
            {t("searchButton", {
              fallback: "Search",
            })}
          </span>
        </button>
      </form>
    </div>
  );
};
