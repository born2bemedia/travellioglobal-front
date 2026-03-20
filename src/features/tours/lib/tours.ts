import { useTranslations } from "next-intl";

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
  const t = useTranslations("tours");

  return [
    {
      id: "safari-amboseli",
      title: t("tourSafariAmboseliTitle", {
        fallback:
          "9 Days Safari to Amboseli, Lake Manyara, Ngorongoro, Serengeti and Maasai Mara",
      }),
      price: 6500,
      region: "middle-east-africa",
      rating: 4.5,
      image: "/images/tours/tour-safari.webp",
      popularity: 95,
      createdAt: 9,
    },
    {
      id: "iceland-northern-lights",
      title: t("tourIcelandTitle", {
        fallback: "Iceland Northern Lights & Volcano Expedition",
      }),
      price: 6500,
      region: "europe",
      rating: 4.5,
      image: "/images/tours/tour-iceland.png",
      popularity: 90,
      createdAt: 8,
    },
    {
      id: "morocco-desert",
      title: t("tourMoroccoTitle", {
        fallback: "Morocco Desert & Atlas Mountains Journey",
      }),
      price: 6500,
      region: "middle-east-africa",
      rating: 4.5,
      image: "/images/tours/tour-morocco.png",
      popularity: 85,
      createdAt: 7,
    },
    {
      id: "kenya-tanzania-zanzibar",
      title: t("tourKenyaTanzaniaTitle", {
        fallback: "Ultimate Kenya, Tanzania, and Zanzibar Experience 2024",
      }),
      price: 33100,
      region: "middle-east-africa",
      rating: 4.5,
      image: "/images/tours/tour-kenya.webp",
      popularity: 92,
      createdAt: 6,
    },
    {
      id: "kenya-wildlife",
      title: t("tourKenyaWildlifeTitle", {
        fallback: "16-Day Kenya and Tanzania Wildlife Adventure",
      }),
      price: 19500,
      region: "middle-east-africa",
      rating: 4.5,
      image: "/images/tours/tour-wildlife.webp",
      popularity: 88,
      createdAt: 5,
    },
    {
      id: "kyoto-tea",
      title: t("tourKyotoTeaTitle", {
        fallback:
          "7-Day Tea Craftsmanship Journey Through Kyoto, Uji, and Aizu-Wakamatsu",
      }),
      price: 15500,
      region: "asia",
      rating: 4.5,
      image: "/images/tours/tour-kyoto.webp",
      popularity: 80,
      createdAt: 4,
    },
    {
      id: "japan-sakura",
      title: t("tourJapanSakuraTitle", {
        fallback: "Japan Spring Sakura Experience",
      }),
      price: 21100,
      region: "asia",
      rating: 4.5,
      image: "/images/tours/tour-sakura.png",
      popularity: 87,
      createdAt: 3,
    },
    {
      id: "peru-machu-picchu",
      title: t("tourPeruTitle", {
        fallback: "Peru Machu Picchu & Sacred Valley Trek",
      }),
      price: 19500,
      region: "central-south-america",
      rating: 4.5,
      image: "/images/tours/tour-peru.webp",
      popularity: 83,
      createdAt: 2,
    },
    {
      id: "italy-culinary",
      title: t("tourItalyTitle", {
        fallback: "Italy Culinary & Wine Discovery Tour",
      }),
      price: 8500,
      region: "europe",
      rating: 4.5,
      image: "/images/tours/tour-italy.webp",
      popularity: 78,
      createdAt: 1,
    },
  ];
};

export const TOURS_PER_PAGE = 6;
