import type { GroupBase, StylesConfig } from "react-select";

/**
 * Glassmorphic select styles matching the flight-search form design.
 */
export function getFlightSelectStyles<
  Option = { value: string; label: string },
>(): StylesConfig<Option, false, GroupBase<Option>> {
  return {
    control: (base, state) => ({
      ...base,
      backgroundColor: "transparent",
      border: 0,
      borderRadius: 0,
      boxShadow: "none",
      minHeight: "40px",
      cursor: "pointer",
      "&:hover": {
        border: 0,
      },
      ...(state.isFocused && { border: 0 }),
    }),
    valueContainer: (base) => ({
      ...base,
      padding: 0,
    }),
    placeholder: (base) => ({
      ...base,
      color: "#fffcf1",
      opacity: 0.94,
      fontFamily: "var(--font-plus-jakarta-sans), sans-serif",
      fontSize: "20px",
      fontWeight: 400,
      lineHeight: 1,
      margin: 0,
    }),
    singleValue: (base) => ({
      ...base,
      color: "#fffcf1",
      fontFamily: "var(--font-plus-jakarta-sans), sans-serif",
      fontSize: "20px",
      fontWeight: 400,
      lineHeight: 1,
      margin: 0,
    }),
    input: (base) => ({
      ...base,
      color: "#fffcf1",
      fontFamily: "var(--font-plus-jakarta-sans), sans-serif",
      fontSize: "20px",
      fontWeight: 400,
      lineHeight: 1,
      margin: 0,
      padding: 0,
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "rgba(20, 20, 20, 0.95)",
      backdropFilter: "blur(24px)",
      border: "1px solid rgba(215, 215, 215, 0.2)",
      borderRadius: "12px",
      zIndex: 9999,
      overflow: "hidden",
    }),
    menuList: (base) => ({
      ...base,
      padding: "4px 0",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "rgba(235, 94, 40, 0.3)"
        : state.isFocused
          ? "rgba(255, 255, 255, 0.08)"
          : "transparent",
      color: "#fffcf1",
      fontFamily: "var(--font-plus-jakarta-sans), sans-serif",
      fontSize: "16px",
      fontWeight: 400,
      cursor: "pointer",
      padding: "10px 16px",
      "&:active": {
        backgroundColor: "rgba(235, 94, 40, 0.2)",
      },
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "rgba(255, 252, 241, 0.6)",
      padding: "0 4px",
      "&:hover": {
        color: "#fffcf1",
      },
      svg: {
        width: "18px",
        height: "18px",
      },
    }),
    noOptionsMessage: (base) => ({
      ...base,
      color: "rgba(255, 252, 241, 0.5)",
      fontFamily: "var(--font-plus-jakarta-sans), sans-serif",
      fontSize: "16px",
    }),
  };
}
