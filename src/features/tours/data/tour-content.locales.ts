import { TOUR_DETAIL_CONTENT } from "./tour-content";
import { TOUR_DETAIL_CONTENT_DE } from "./tour-content.de";
import { TOUR_DETAIL_CONTENT_IT } from "./tour-content.it";

const TOUR_DETAIL_CONTENT_BY_LOCALE = {
  en: TOUR_DETAIL_CONTENT,
  de: TOUR_DETAIL_CONTENT_DE,
  it: TOUR_DETAIL_CONTENT_IT,
} as const;

export const getTourContentMap = (locale?: string) =>
  TOUR_DETAIL_CONTENT_BY_LOCALE[
    locale as keyof typeof TOUR_DETAIL_CONTENT_BY_LOCALE
  ] ?? TOUR_DETAIL_CONTENT_BY_LOCALE.en;
