import { TOUR_CATALOG } from "./tours";
import { TOUR_CATALOG_DE } from "./tours.de";
import { TOUR_CATALOG_IT } from "./tours.it";

const TOUR_CATALOG_BY_LOCALE = {
  en: TOUR_CATALOG,
  de: TOUR_CATALOG_DE,
  it: TOUR_CATALOG_IT,
} as const;

export const getTourCatalog = (locale?: string) =>
  TOUR_CATALOG_BY_LOCALE[locale as keyof typeof TOUR_CATALOG_BY_LOCALE] ??
  TOUR_CATALOG_BY_LOCALE.en;
