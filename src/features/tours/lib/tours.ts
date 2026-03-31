import { useTranslations } from "next-intl";

import { TOUR_DETAIL_CONTENT } from "../data/tour-content";
import { TOUR_GALLERIES } from "../data/tour-galleries";
import { TOUR_CATALOG } from "../data/tours";
import type { Tour, TourRegion } from "../model/types";

export const TOUR_REGIONS: TourRegion[] = [
  "asia",
  "australia-pacific",
  "caribbean",
  "central-south-america",
  "europe",
  "middle-east-africa",
  "north-america",
];

export const useTourRegionLabels = (): Record<TourRegion, string> => {
  const t = useTranslations("tours");

  return {
    "asia": t("tourAsiaTitle", { fallback: "Asia" }),
    "australia-pacific": t("tourAustraliaPacificTitle", { fallback: "Australia & the Pacific" }),
    "caribbean": t("tourCaribbeanTitle", { fallback: "Caribbean" }),
    "central-south-america": t("tourCentralSouthAmericaTitle", { fallback: "Central & South America" }),
    "europe": t("tourEuropeTitle", { fallback: "Europe" }),
    "middle-east-africa": t("tourMiddleEastAfricaTitle", { fallback: "Middle East & Africa" }),
    "north-america": t("tourNorthAmericaTitle", { fallback: "North America" }),
  };
};

export const useTours = (): Tour[] => {
  return TOUR_CATALOG;
};

export const TOURS_PER_PAGE = 9;

export const getTourBySlug = (slug: string) =>
  TOUR_CATALOG.find((tour) => tour.slug === slug);

export const getTourContent = (key: string) => TOUR_DETAIL_CONTENT[key];

export const getTourGallery = (slug: string) => TOUR_GALLERIES[slug] ?? [];

export const getRelatedTours = (slug: string, limit = 10) =>
  TOUR_CATALOG.filter((tour) => tour.slug !== slug).slice(0, limit);
