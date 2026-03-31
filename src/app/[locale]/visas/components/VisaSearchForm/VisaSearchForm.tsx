"use client";

import { useState } from "react";
import Image from "next/image";

import { useTranslations } from "next-intl";
import Select from "react-select";

import type { CountryOption } from "@/features/forms/lib/countries";
import { formCountries } from "@/features/forms/lib/countries";
import { getPlacesSearchSelectStyles } from "@/features/places-search/lib/selectStyles";

import { getVisaCountryFlagSrc } from "../../lib/flags";
import styles from "./VisaSearchForm.module.scss";

const IVISA_URL = "https://www.ivisa.com";

const selectStyles = getPlacesSearchSelectStyles<CountryOption>();

const renderCountryOption = (option: CountryOption) => (
  <span className={styles.search__option}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src={getVisaCountryFlagSrc(option.value)}
      alt=""
      width={24}
      height={18}
      className={styles.search__optionFlagImage}
      loading="lazy"
    />
    <span>{option.label}</span>
  </span>
);

export const VisaSearchForm = () => {
  const t = useTranslations("visasPage");

  const [passportCountry, setPassportCountry] = useState<CountryOption | null>(
    formCountries.find((country) => country.value === "UA") ?? null,
  );
  const [destinationCountry, setDestinationCountry] =
    useState<CountryOption | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.open(IVISA_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={styles.search}>
      <form className={styles.search__form} onSubmit={handleSubmit}>
        <div className={styles.search__fields}>
          <div className={styles.search__field}>
            <span className={styles.search__fieldLabel}>
              {t("searchPassportLabel", { fallback: "My passport" })}
            </span>

            <div className={styles.search__fieldInner}>
              <div className={styles.search__selectWrap}>
                <Select<CountryOption>
                  options={formCountries}
                  value={passportCountry}
                  onChange={setPassportCountry}
                  placeholder={t("searchPassportPlaceholder", {
                    fallback: "Choose passport",
                  })}
                  aria-label={t("searchPassportLabel", {
                    fallback: "My passport",
                  })}
                  styles={selectStyles}
                  formatOptionLabel={(option) => renderCountryOption(option)}
                  isSearchable
                  isClearable={false}
                  menuPlacement="auto"
                />
              </div>

              <Image
                src="/images/visas/search-chevron.svg"
                alt=""
                width={14}
                height={7}
                className={styles.search__chevron}
              />
            </div>
          </div>

          <div className={styles.search__field}>
            <span className={styles.search__fieldLabel}>
              {t("searchDestinationLabel", { fallback: "My destination" })}
            </span>

            <div className={styles.search__fieldInner}>
              <Image
                src="/images/visas/search-map-pin.svg"
                alt=""
                width={24}
                height={24}
              />

              <div className={styles.search__selectWrap}>
                <Select<CountryOption>
                  options={formCountries}
                  value={destinationCountry}
                  onChange={setDestinationCountry}
                  placeholder={t("searchDestinationPlaceholder", {
                    fallback: "Traveling to",
                  })}
                  aria-label={t("searchDestinationLabel", {
                    fallback: "My destination",
                  })}
                  styles={selectStyles}
                  isSearchable
                  isClearable={false}
                  menuPlacement="auto"
                />
              </div>

              <Image
                src="/images/visas/search-chevron.svg"
                alt=""
                width={14}
                height={7}
                className={styles.search__chevron}
              />
            </div>
          </div>
        </div>

        <div className={styles.search__submitWrap}>
          <button type="submit" className={styles.search__submit}>
            <Image
              src="/images/visas/search-submit-arrow.svg"
              alt=""
              width={24}
              height={20}
            />
            <span>{t("searchButton", { fallback: "Get Started" })}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
