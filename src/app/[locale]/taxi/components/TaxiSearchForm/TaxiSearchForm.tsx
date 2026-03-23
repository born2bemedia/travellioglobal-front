"use client";

import { useState } from "react";
import Image from "next/image";

import { useTranslations } from "next-intl";
import Select from "react-select";

import type { AirportOption } from "@/features/flight-search/lib/airports";
import { airports } from "@/features/flight-search/lib/airports";
import { getPlacesSearchSelectStyles } from "@/features/places-search/lib/selectStyles";

import styles from "./TaxiSearchForm.module.scss";

const KIWITAXI_BASE_URL = "https://www.kiwitaxi.com";

const selectValueLabel = (option: AirportOption) =>
  option.label.split(",")[0].trim();

const selectStyles = getPlacesSearchSelectStyles<AirportOption>();

export const TaxiSearchForm = () => {
  const t = useTranslations("taxiPage");

  const [fromLocation, setFromLocation] = useState<AirportOption | null>(null);
  const [toLocation, setToLocation] = useState<AirportOption | null>(null);

  const handleSwap = () => {
    setFromLocation(toLocation);
    setToLocation(fromLocation);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.open(KIWITAXI_BASE_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={styles.search}>
      <form className={styles.search__form} onSubmit={handleSubmit}>
        <div className={styles.search__fields}>
          <div className={styles.search__field}>
            <span className={styles.search__fieldLabel}>
              {t("fromLabel", { fallback: "From" })}
            </span>
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
                  value={fromLocation}
                  onChange={setFromLocation}
                  placeholder={t("fromPlaceholder", {
                    fallback: "City, airport, or train station...",
                  })}
                  aria-label={t("fromLabel", {
                    fallback: "From",
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

          <button
            type="button"
            className={styles.search__swap}
            onClick={handleSwap}
            aria-label={t("swapLabel", { fallback: "Swap locations" })}
          >
            <Image
              src="/images/taxi/swap-arrow.svg"
              alt=""
              width={24}
              height={24}
            />
          </button>

          <div className={styles.search__field}>
            <span className={styles.search__fieldLabel}>
              {t("toLabel", { fallback: "To" })}
            </span>
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
                  value={toLocation}
                  onChange={setToLocation}
                  placeholder={t("toPlaceholder", {
                    fallback: "City, airport, or train station...",
                  })}
                  aria-label={t("toLabel", {
                    fallback: "To",
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

        <div className={styles.search__submitWrap}>
          <button type="submit" className={styles.search__submit}>
            <Image
              src="/images/shared/flight-search/search.svg"
              alt=""
              width={20}
              height={20}
            />
            <span>{t("searchButton", { fallback: "Find Transfer" })}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
