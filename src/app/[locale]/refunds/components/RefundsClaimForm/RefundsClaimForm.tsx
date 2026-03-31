"use client";

import { useState } from "react";
import Image from "next/image";

import { useLocale, useTranslations } from "next-intl";
import type { FormEvent } from "react";
import Select, {
  components,
  type DropdownIndicatorProps,
  type StylesConfig,
} from "react-select";

import type { AirportOption } from "@/features/flight-search/lib/airports";
import { airports } from "@/features/flight-search/lib/airports";
import { getPlacesSearchSelectStyles } from "@/features/places-search/lib/selectStyles";

import styles from "./RefundsClaimForm.module.scss";

const COMPENSAIR_URL = "https://www.compensair.com/en/check-flight.html";
const COMPENSAIR_SUB_ID = "0db6bc2c5ca240fbb04a05c2b-552524";

const DISRUPTION_TYPE_MAP: Record<string, string> = {
  delayed: "delay",
  cancelled: "cancellation",
  overbooked: "deniedBoarding",
  connection: "missedConnection",
};

type IssueOption = {
  value: string;
  label: string;
};

type RefundsClaimFormProps = {
  compact?: boolean;
};

const selectValueLabel = (option: AirportOption) =>
  option.label.split(",")[0].trim();

const baseAirportSelectStyles = getPlacesSearchSelectStyles<AirportOption>();
const baseSelectStyles = getPlacesSearchSelectStyles<IssueOption>();

const airportSelectStyles: StylesConfig<AirportOption, false> = {
  ...baseAirportSelectStyles,
  menuPortal: (provided) => ({
    ...provided,
    zIndex: 9999,
  }),
};

const issueSelectStyles: StylesConfig<IssueOption, false> = {
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
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: 0,
    color: "#fffcf1",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#fffcf1",
    fontFamily: "var(--font-plus-jakarta-sans), sans-serif",
    fontSize: "20px",
    fontWeight: 400,
    lineHeight: 1,
    margin: 0,
  }),
  menuPortal: (provided) => ({
    ...provided,
    zIndex: 9999,
  }),
};

const formatDepartureDate = (value: string, locale: string) => {
  if (!value) return null;

  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
};

const IssueDropdownIndicator = (
  props: DropdownIndicatorProps<IssueOption, false>,
) => (
  <components.DropdownIndicator {...props}>
    <Image
      src="/images/refunds/form-chevron.svg"
      alt=""
      width={24}
      height={19}
    />
  </components.DropdownIndicator>
);

export const RefundsClaimForm = ({ compact = false }: RefundsClaimFormProps) => {
  const t = useTranslations("refundsPage");
  const locale = useLocale();
  const [from, setFrom] = useState<AirportOption | null>(null);
  const [to, setTo] = useState<AirportOption | null>(null);
  const [issue, setIssue] = useState("delayed");
  const [departureDate, setDepartureDate] = useState("");

  const issueOptions: IssueOption[] = [
    {
      value: "delayed",
      label: t("formIssueDelayed", { fallback: "Flight delayed" }),
    },
    {
      value: "cancelled",
      label: t("formIssueCancelled", { fallback: "Flight cancelled" }),
    },
    {
      value: "overbooked",
      label: t("formIssueOverbooked", { fallback: "Denied boarding" }),
    },
    {
      value: "connection",
      label: t("formIssueConnection", { fallback: "Missed connection" }),
    },
  ];

  const selectedIssue =
    issueOptions.find((option) => option.value === issue) ?? issueOptions[0];
  const menuPortalTarget =
    typeof window === "undefined" ? undefined : document.body;
  const departureLabel = formatDepartureDate(departureDate, locale);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const url = new URL(COMPENSAIR_URL);
    url.searchParams.set("sub_id", COMPENSAIR_SUB_ID);
    url.searchParams.set("utm_medium", "affiliate");
    url.searchParams.set("utm_source", "travelpayouts");

    const hashParams = new URLSearchParams();
    const departure = from?.value.toLowerCase() ?? "";
    const arrival = to?.value.toLowerCase() ?? "";

    if (departureDate) hashParams.set("date", departureDate);
    if (departure) hashParams.set("departure", departure);
    if (arrival) hashParams.set("arrival", arrival);
    hashParams.set(
      "typeOfDisruption",
      DISRUPTION_TYPE_MAP[issue] ?? DISRUPTION_TYPE_MAP.delayed,
    );
    url.hash = hashParams.toString();

    window.open(url.toString(), "_blank", "noopener,noreferrer");
  };

  return (
    <form
      className={`${styles.form} ${compact ? styles.formCompact : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.form__rowTop}>
        <label className={styles.form__field}>
          <span className={styles.form__fieldInner}>
            <span className={styles.form__icon}>
              <Image
                src="/images/refunds/form-map-pin.svg"
                alt=""
                width={24}
                height={24}
              />
            </span>
            <div className={styles.form__selectWrap}>
              <Select<AirportOption>
                options={airports}
                value={from}
                onChange={setFrom}
                placeholder={t("formFromPlaceholder", {
                  fallback: "From (e.g. London or LHR)",
                })}
                aria-label={t("formFromLabel", { fallback: "From" })}
                styles={airportSelectStyles}
                formatOptionLabel={(option, meta) =>
                  meta.context === "value"
                    ? selectValueLabel(option)
                    : option.label
                }
                isSearchable
                isClearable={false}
                menuPlacement="top"
                menuPosition="fixed"
                menuPortalTarget={menuPortalTarget}
              />
            </div>
          </span>
        </label>

        <label className={styles.form__field}>
          <span className={styles.form__fieldInner}>
            <span className={styles.form__icon}>
              <Image
                src="/images/refunds/form-map-pin.svg"
                alt=""
                width={24}
                height={24}
              />
            </span>
            <div className={styles.form__selectWrap}>
              <Select<AirportOption>
                options={airports}
                value={to}
                onChange={setTo}
                placeholder={t("formToPlaceholder", {
                  fallback: "To (e.g. Paris or CDG)",
                })}
                aria-label={t("formToLabel", { fallback: "To" })}
                styles={airportSelectStyles}
                formatOptionLabel={(option, meta) =>
                  meta.context === "value"
                    ? selectValueLabel(option)
                    : option.label
                }
                isSearchable
                isClearable={false}
                menuPlacement="top"
                menuPosition="fixed"
                menuPortalTarget={menuPortalTarget}
              />
            </div>
          </span>
        </label>
      </div>

      <div className={styles.form__rowBottom}>
        <label className={styles.form__field}>
          <div className={styles.form__fieldInner}>
            <div className={styles.form__selectWrap}>
              <Select<IssueOption>
                options={issueOptions}
                value={selectedIssue}
                onChange={(option) => setIssue(option?.value ?? "delayed")}
                aria-label={t("formIssueLabel", {
                  fallback: "Flight issue",
                })}
                isSearchable={false}
                isClearable={false}
                menuPlacement="top"
                menuPosition="fixed"
                menuPortalTarget={menuPortalTarget}
                styles={issueSelectStyles}
                components={{
                  DropdownIndicator: IssueDropdownIndicator,
                  IndicatorSeparator: null,
                }}
              />
            </div>
          </div>
        </label>

        <label className={styles.form__field}>
          <span className={styles.form__fieldInner}>
            <span className={styles.form__icon}>
              <Image
                src="/images/refunds/form-calendar.svg"
                alt=""
                width={24}
                height={24}
              />
            </span>
            <span className={styles.form__dateDisplay}>
              {departureLabel ??
                t("formDateLabel", { fallback: "Date of departure" })}
            </span>
            <input
              type="date"
              value={departureDate}
              onChange={(event) => setDepartureDate(event.target.value)}
              aria-label={t("formDateLabel", { fallback: "Date of departure" })}
              className={styles.form__dateInput}
            />
          </span>
        </label>

        <button type="submit" className={styles.form__submit}>
          <Image src="/images/refunds/form-search.svg" alt="" width={20} height={20} />
          <span>{t("formSubmit", { fallback: "Check flight" })}</span>
        </button>
      </div>
    </form>
  );
};
