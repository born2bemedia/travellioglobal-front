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
  formatDateDDMM,
  formatDateDisplay,
} from "../lib/date";
import { getFlightsSearchSelectStyles } from "../lib/selectStyles";
import styles from "./FlightsSearchForm.module.scss";

const AVIASALES_BASE_URL = "https://www.aviasales.com/search";

const selectValueLabel = (option: AirportOption) =>
  option.label.split(",")[0].trim();

const selectStyles = getFlightsSearchSelectStyles<AirportOption>();

export const FlightsSearchForm = () => {
  const t = useTranslations("homeReadyChapter");

  const today = new Date();
  const defaultDepart = formatDate(addDays(today, 1));
  const defaultReturn = formatDate(addDays(today, 8));

  const [origin, setOrigin] = useState<AirportOption | null>(
    airports.find((airport) => airport.value === "BUD") ?? null,
  );
  const [destination, setDestination] = useState<AirportOption | null>(null);
  const [departDate, setDepartDate] = useState(defaultDepart);
  const [returnDate, setReturnDate] = useState(defaultReturn);
  const [passengers, setPassengers] = useState(1);

  const passengerLabel = t("passengerLabel", { fallback: "passenger" });
  const passengerLabelPlural = t("passengerLabelPlural", {
    fallback: "passengers",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!origin || !destination) return;

    const originCode = origin.value;
    const destCode = destination.value;
    const depart = formatDateDDMM(departDate);
    const ret = formatDateDDMM(returnDate);
    const url = `${AVIASALES_BASE_URL}/${originCode}${depart}${destCode}${ret}Y${passengers}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={styles.search}>
      <form className={styles.search__form} onSubmit={handleSubmit}>
        <div className={styles.search__fields}>
          <div className={styles.search__rowTop}>
            <div className={styles.search__field}>
              <div className={styles.search__fieldInner}>
                <Image
                  src="/images/flights/map-pin.svg"
                  alt=""
                  width={24}
                  height={24}
                />
                <div className={styles.search__selectWrap}>
                  <Select<AirportOption>
                    options={airports}
                    value={origin}
                    onChange={setOrigin}
                    placeholder={t("originPlaceholder", {
                      fallback: "Origin country",
                    })}
                    aria-label={t("originLabel", {
                      fallback: "Origin country",
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
                  src="/images/flights/map-pin.svg"
                  alt=""
                  width={24}
                  height={24}
                />
                <div className={styles.search__selectWrap}>
                  <Select<AirportOption>
                    options={airports}
                    value={destination}
                    onChange={setDestination}
                    placeholder={t("destinationPlaceholder", {
                      fallback: "Destination",
                    })}
                    aria-label={t("destinationLabel", {
                      fallback: "Destination country",
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

          <div className={styles.search__rowBottom}>
            <label className={styles.search__field}>
              <span className={styles.search__fieldInner}>
                <Image
                  src="/images/flights/calendar-dots.svg"
                  alt=""
                  width={24}
                  height={24}
                />
                <span className={styles.search__dateDisplay}>
                  {formatDateDisplay(departDate)}
                </span>
                <input
                  type="date"
                  value={departDate}
                  onChange={(event) => setDepartDate(event.target.value)}
                  aria-label={t("departDateLabel", {
                    fallback: "Departure date",
                  })}
                  className={styles.search__dateInput}
                  required
                />
              </span>
            </label>

            <label className={styles.search__field}>
              <span className={styles.search__fieldInner}>
                <Image
                  src="/images/flights/calendar-dots.svg"
                  alt=""
                  width={24}
                  height={24}
                />
                <span className={styles.search__dateDisplay}>
                  {formatDateDisplay(returnDate)}
                </span>
                <input
                  type="date"
                  value={returnDate}
                  min={departDate}
                  onChange={(event) => setReturnDate(event.target.value)}
                  aria-label={t("returnDateLabel", {
                    fallback: "Return date",
                  })}
                  className={styles.search__dateInput}
                  required
                />
              </span>
            </label>

            <div className={styles.search__field}>
              <div className={styles.search__passengers}>
                <span className={styles.search__fieldInner}>
                  <Image
                    src="/images/flights/user.svg"
                    alt=""
                    width={24}
                    height={24}
                  />
                  <span className={styles.search__counterText}>
                    {passengers}{" "}
                    {passengers > 1 ? passengerLabelPlural : passengerLabel}
                  </span>
                </span>

                <div className={styles.search__counterButtons}>
                  <button
                    type="button"
                    className={styles.search__counterBtn}
                    onClick={() =>
                      setPassengers((current) => Math.min(current + 1, 9))
                    }
                    aria-label={t("increasePassengers", {
                      fallback: "Increase passengers",
                    })}
                  >
                    +
                  </button>
                  <button
                    type="button"
                    className={styles.search__counterBtn}
                    onClick={() =>
                      setPassengers((current) => Math.max(current - 1, 1))
                    }
                    aria-label={t("decreasePassengers", {
                      fallback: "Decrease passengers",
                    })}
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button type="submit" className={styles.search__submit}>
          <Image
            src="/images/flights/search.svg"
            alt=""
            width={20}
            height={20}
          />
          <span>{t("searchNow", { fallback: "Search now" })}</span>
        </button>
      </form>
    </div>
  );
};
