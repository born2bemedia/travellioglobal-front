import { useTranslations } from "next-intl";

import { Service } from "../model/types";

export const useAllPositioningAndOfferDevelopmentServices = (): Service[] => {
  const t = useTranslations("services");
  return [
    {
      id: "usp-development",
      title: t("uspDevelopment", {
        fallback: "Unique Selling Proposition (USP) Development",
      }),
      type: "purchasable",
      price: 5000,
    },
    {
      id: "target-market-segmentation-persona",
      title: t("targetMarketSegmentation", {
        fallback: "Target Market Segmentation & Persona Development",
      }),
      type: "orderable",
      price: 8000,
      prefix: t("from", { fallback: "From" }),
    },
    {
      id: "value-proposition-refinement",
      title: t("valuePropositionRefinement", {
        fallback: "Value Proposition Refinement",
      }),
      type: "purchasable",
      price: 7500,
    },
    {
      id: "brand-messaging-strategy",
      title: t("brandMessagingStrategy", {
        fallback: "Brand Messaging Strategy",
      }),
      type: "purchasable",
      price: 10000,
    },
    {
      id: "pricing-strategy",
      title: t("pricingStrategy", { fallback: "Pricing Strategy" }),
      type: "orderable",
      price: 7000,
      prefix: t("from", { fallback: "From" }),
    },
    {
      id: "product-service-packaging-positioning",
      title: t("productServicePackaging", {
        fallback: "Product/Service Packaging & Positioning",
      }),
      type: "orderable",
      price: 8500,
      prefix: t("from", { fallback: "From" }),
    },
    {
      id: "customer-experience-mapping",
      title: t("customerExperienceMapping", {
        fallback: "Customer Experience Mapping",
      }),
      type: "orderable",
      price: 8500,
      prefix: t("from", { fallback: "From" }),
    },
    {
      id: "pitch-development",
      title: t("pitchDevelopment", { fallback: "Pitch Development" }),
      type: "orderable",
      price: 7500,
      prefix: t("from", { fallback: "From" }),
    },
    {
      id: "content-strategy",
      title: t("contentStrategy", { fallback: "Content Strategy" }),
      type: "purchasable",
      price: 7000,
    },
  ];
};
