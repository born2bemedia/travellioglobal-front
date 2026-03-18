"use client";

import { useState } from "react";
import Image from "next/image";

import { useTranslations } from "next-intl";
import Select from "react-select";

import type { AirportOption } from "../lib/airports";
import { airports } from "../lib/airports";
import { getFlightSelectStyles } from "../lib/selectStyles";
import styles from "./FlightSearchForm.module.scss";

const AVIASALES_SEARCH_URL = "https://search.aviasales.com/flights/";

const formatDate = (date: Date) => date.toISOString().split("T")[0];

const addDays = (date: Date, days: number) => {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
};

const formatDateDisplay = (dateStr: string) => {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

type TabKey = "flights" | "hotels";

const selectStyles = getFlightSelectStyles<AirportOption>();

export const FlightSearchForm = () => {
  const t = useTranslations("homeReadyChapter");

  const today = new Date();
  const defaultDepart = formatDate(addDays(today, 1));
  const defaultReturn = formatDate(addDays(today, 8));

  const [activeTab, setActiveTab] = useState<TabKey>("flights");
  const [origin, setOrigin] = useState<AirportOption | null>(
    airports.find((c) => c.value === "BUD") ?? null,
  );
  const [destination, setDestination] = useState<AirportOption | null>(null);
  const [departDate, setDepartDate] = useState(defaultDepart);
  const [returnDate, setReturnDate] = useState(defaultReturn);
  const [passengers, setPassengers] = useState(1);
  const [hotelDestination, setHotelDestination] =
    useState<AirportOption | null>(null);
  const [checkIn, setCheckIn] = useState(defaultDepart);
  const [checkOut, setCheckOut] = useState(defaultReturn);
  const [guests, setGuests] = useState(2);

  const passengerLabel = t("passengerLabel", { fallback: "passenger" });
  const passengerLabelPlural = t("passengerLabelPlural", {
    fallback: "passengers",
  });
  const guestLabel = t("guestLabel", { fallback: "guest" });
  const guestLabelPlural = t("guestLabelPlural", { fallback: "guests" });

  const handleFlightSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!origin || !destination) return;

    const searchParams = new URLSearchParams({
      origin_iata: origin.value,
      destination_iata: destination.value,
      depart_date: departDate,
      return_date: returnDate,
      adults: String(passengers),
      children: "0",
      infants: "0",
      trip_class: "0",
      currency: "USD",
      locale: "en",
      oneway: "0",
    });

    window.open(
      `${AVIASALES_SEARCH_URL}?${searchParams.toString()}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const increasePassengers = () =>
    setPassengers((current) => Math.min(current + 1, 9));
  const decreasePassengers = () =>
    setPassengers((current) => Math.max(current - 1, 1));
  const increaseGuests = () =>
    setGuests((current) => Math.min(current + 1, 8));
  const decreaseGuests = () =>
    setGuests((current) => Math.max(current - 1, 1));

  return (
    <div className={styles.search}>
      <div className={styles.search__tabs}>
        <button
          type="button"
          className={`${styles.search__tab} ${
            activeTab === "flights" ? styles.search__tabActive : ""
          }`}
          onClick={() => setActiveTab("flights")}
          aria-pressed={activeTab === "flights"}
        >
          <Image
            src="/images/shared/flight-search/airplane.svg"
            alt=""
            width={24}
            height={24}
          />
          <span>
            {t("tabFlights", { fallback: "Flights" })}
          </span>
        </button>

        <button
          type="button"
          className={`${styles.search__tab} ${
            activeTab === "hotels" ? styles.search__tabActive : ""
          }`}
          onClick={() => setActiveTab("hotels")}
          aria-pressed={activeTab === "hotels"}
        >
          <Image
            src="/images/shared/flight-search/bed.svg"
            alt=""
            width={24}
            height={24}
          />
          <span>
            {t("tabHotels", { fallback: "Hotels" })}
          </span>
        </button>
      </div>

      <div className={styles.search__panel}>
        {activeTab === "flights" ? (
          <form className={styles.search__form} onSubmit={handleFlightSubmit}>
            <div className={styles.search__fields}>
              <div className={styles.search__row}>
                <div className={styles.search__field}>
                  <div className={styles.search__fieldInner}>
                    <Image
                      src="/images/shared/flight-search/map-pin.svg"
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
                        isSearchable
                        isClearable
                        menuPlacement="auto"
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.search__field}>
                  <div className={styles.search__fieldInner}>
                    <Image
                      src="/images/shared/flight-search/map-pin.svg"
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
                        isSearchable
                        isClearable
                        menuPlacement="auto"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.search__row}>
                <label className={styles.search__field}>
                  <span className={styles.search__fieldInner}>
                    <Image
                      src="/images/shared/flight-search/calendar.svg"
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
                      onChange={(e) => setDepartDate(e.target.value)}
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
                      src="/images/shared/flight-search/calendar.svg"
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
                      onChange={(e) => setReturnDate(e.target.value)}
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
                        src="/images/shared/flight-search/user.svg"
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
                        onClick={increasePassengers}
                        aria-label={t("increasePassengers", {
                          fallback: "Increase passengers",
                        })}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        className={styles.search__counterBtn}
                        onClick={decreasePassengers}
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
                src="/images/shared/flight-search/search.svg"
                alt=""
                width={20}
                height={20}
              />
              <span>{t("searchNow", { fallback: "Search now" })}</span>
            </button>
          </form>
        ) : (
          <div className={styles.search__form}>
            <div className={styles.search__fields}>
              <div className={styles.search__row}>
                <div className={styles.search__field}>
                  <div className={styles.search__fieldInner}>
                    <Image
                      src="/images/shared/flight-search/map-pin.svg"
                      alt=""
                      width={24}
                      height={24}
                    />
                    <div className={styles.search__selectWrap}>
                      <Select<AirportOption>
                        options={airports}
                        value={hotelDestination}
                        onChange={setHotelDestination}
                        placeholder={t("hotelDestinationPlaceholder", {
                          fallback: "Destination",
                        })}
                        aria-label={t("hotelDestinationLabel", {
                          fallback: "Hotel destination",
                        })}
                        styles={selectStyles}
                        isSearchable
                        isClearable
                        menuPlacement="auto"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.search__row}>
                <label className={styles.search__field}>
                  <span className={styles.search__fieldInner}>
                    <Image
                      src="/images/shared/flight-search/calendar.svg"
                      alt=""
                      width={24}
                      height={24}
                    />
                    <span className={styles.search__dateDisplay}>
                      {formatDateDisplay(checkIn)}
                    </span>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      aria-label={t("checkInLabel", {
                        fallback: "Check-in date",
                      })}
                      className={styles.search__dateInput}
                    />
                  </span>
                </label>

                <label className={styles.search__field}>
                  <span className={styles.search__fieldInner}>
                    <Image
                      src="/images/shared/flight-search/calendar.svg"
                      alt=""
                      width={24}
                      height={24}
                    />
                    <span className={styles.search__dateDisplay}>
                      {formatDateDisplay(checkOut)}
                    </span>
                    <input
                      type="date"
                      value={checkOut}
                      min={checkIn}
                      onChange={(e) => setCheckOut(e.target.value)}
                      aria-label={t("checkOutLabel", {
                        fallback: "Check-out date",
                      })}
                      className={styles.search__dateInput}
                    />
                  </span>
                </label>

                <div className={styles.search__field}>
                  <div className={styles.search__passengers}>
                    <span className={styles.search__fieldInner}>
                      <Image
                        src="/images/shared/flight-search/user.svg"
                        alt=""
                        width={24}
                        height={24}
                      />
                      <span className={styles.search__counterText}>
                        {guests}{" "}
                        {guests > 1 ? guestLabelPlural : guestLabel}
                      </span>
                    </span>

                    <div className={styles.search__counterButtons}>
                      <button
                        type="button"
                        className={styles.search__counterBtn}
                        onClick={increaseGuests}
                        aria-label={t("increaseGuests", {
                          fallback: "Increase guests",
                        })}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        className={styles.search__counterBtn}
                        onClick={decreaseGuests}
                        aria-label={t("decreaseGuests", {
                          fallback: "Decrease guests",
                        })}
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              className={`${styles.search__submit} ${styles.search__submitDisabled}`}
              disabled
            >
              <Image
                src="/images/shared/flight-search/search.svg"
                alt=""
                width={20}
                height={20}
              />
              <span>{t("searchNow", { fallback: "Search now" })}</span>
            </button>

            <p className={styles.search__notice}>
              {t("hotelNotice", {
                fallback:
                  "Hotels search is disabled here because Travelpayouts closed the Hotellook program on October 20, 2025.",
              })}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
