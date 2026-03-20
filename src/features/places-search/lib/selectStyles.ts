import type { GroupBase, StylesConfig } from "react-select";

import { getFlightSelectStyles } from "@/features/flight-search/lib/selectStyles";

export function getPlacesSearchSelectStyles<
  Option = { value: string; label: string },
>(): StylesConfig<Option, false, GroupBase<Option>> {
  const baseStyles = getFlightSelectStyles<Option>();
  const baseTextStyles = {
    color: "#FFFDF1",
    fontFamily: "var(--font-plus-jakarta-sans), sans-serif",
    fontSize: "20px",
    fontWeight: 400,
    lineHeight: 1,
    margin: 0,
  };

  return {
    ...baseStyles,
    control: (provided, state) => ({
      ...(baseStyles.control ? baseStyles.control(provided, state) : provided),
      minHeight: "24px",
    }),
    placeholder: (provided) => ({
      ...provided,
      ...baseTextStyles,
      opacity: 0.94,
    }),
    singleValue: (provided) => ({
      ...provided,
      ...baseTextStyles,
    }),
    input: (provided) => ({
      ...provided,
      ...baseTextStyles,
      padding: 0,
    }),
    dropdownIndicator: () => ({
      display: "none",
    }),
    clearIndicator: () => ({
      display: "none",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "rgba(20, 20, 20, 0.95)",
      backdropFilter: "blur(24px)",
      border: "1px solid rgba(215, 215, 215, 0.2)",
      borderRadius: "12px",
      overflow: "hidden",
      zIndex: 20,
    }),
  };
}
