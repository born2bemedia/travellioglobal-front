import { useTranslations } from "next-intl";

import { Service } from "../model/types";

export const useAllStrategicDirectionServices = (): Service[] => {
  const t = useTranslations("services");
  return [
    {
      id: "vision-development-and-refinement",
      title: t("visionDevelopment", { fallback: "Vision Development & Refinement" }),
      type: "purchasable",
      price: 5000,
    },
    {
      id: "strategic-goal-setting",
      title: t("strategicGoalSetting", { fallback: "Strategic Goal Setting" }),
      type: "orderable",
      price: 7500,
      prefix: t("from", { fallback: "From" }),
    },
    {
      id: "market-research-and-analysis",
      title: t("marketResearchAnalysis", { fallback: "Market Research & Analysis" }),
      type: "orderable",
      price: 10500,
      prefix: t("from", { fallback: "From" }),
    },
    {
      id: "swot-analysis",
      title: t("swotAnalysis", { fallback: "SWOT Analysis" }),
      type: "purchasable",
      price: 6000,
    },
    {
      id: "competitive-landscape-assessment",
      title: t("competitiveLandscapeAssessment", {
        fallback: "Competitive Landscape Assessment",
      }),
      type: "orderable",
      price: 8000,
      prefix: t("from", { fallback: "From" }),
    },
    {
      id: "opportunity-mapping",
      title: t("opportunityMapping", { fallback: "Opportunity Mapping" }),
      type: "orderable",
      price: 10000,
      prefix: t("from", { fallback: "From" }),
    },
    {
      id: "decision-making-frameworks",
      title: t("decisionMakingFrameworks", {
        fallback: "Decision-Making Frameworks",
      }),
      type: "purchasable",
      price: 7000,
    },
    {
      id: "strategic-roadmap-development",
      title: t("strategicRoadmapDevelopment", {
        fallback: "Strategic Roadmap Development",
      }),
      type: "purchasable",
      price: 12500,
    },
    {
      id: "ongoing-strategic-review-adjustments",
      title: t("ongoingStrategicReview", {
        fallback: "Ongoing Strategic Review & Adjustments",
      }),
      type: "orderable",
      price: 7500,
      prefix: t("from", { fallback: "From" }),
      suffix: t("perMonth", { fallback: "per month" }),
    },
  ];
};
