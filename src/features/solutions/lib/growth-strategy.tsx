import { useTranslations } from "next-intl";

import { Service } from "../model/types";

export const useAllGrowthStrategyServices = (): Service[] => {
  const t = useTranslations("services");
  return [
    {
      id: "growth-mapping-goal-setting",
      title: t("growthMappingGoalSetting", {
        fallback: "Growth Mapping & Goal Setting",
      }),
      type: "purchasable",
      price: 8000,
    },
    {
      id: "scalable-process-development",
      title: t("scalableProcessDevelopment", {
        fallback: "Scalable Process Development",
      }),
      type: "orderable",
      price: 8500,
      prefix: t("from", { fallback: "From" }),
    },
    {
      id: "market-expansion-diversification",
      title: t("marketExpansionDiversification", {
        fallback: "Market Expansion & Diversification",
      }),
      type: "orderable",
      price: 12000,
      prefix: t("from", { fallback: "From" }),
    },
    {
      id: "brand-amplification-strategies",
      title: t("brandAmplificationStrategies", {
        fallback: "Brand Amplification Strategies",
      }),
      type: "orderable",
      price: 8000,
      prefix: t("from", { fallback: "From" }),
    },
    {
      id: "customer-acquisition-strategy",
      title: t("customerAcquisitionStrategy", {
        fallback: "Customer Acquisition Strategy",
      }),
      type: "orderable",
      price: 8500,
      prefix: t("from", { fallback: "From" }),
    },
    {
      id: "sales-strategy-funnel-optimization",
      title: t("salesStrategyFunnelOptimization", {
        fallback: "Sales Strategy & Funnel Optimization",
      }),
      type: "orderable",
      price: 7500,
      prefix: t("from", { fallback: "From" }),
    },
    {
      id: "partnership-development",
      title: t("partnershipDevelopment", {
        fallback: "Partnership Development",
      }),
      type: "purchasable",
      price: 7000,
    },
    {
      id: "performance-marketing-strategy",
      title: t("performanceMarketingStrategy", {
        fallback: "Performance Marketing Strategy",
      }),
      type: "orderable",
      price: 8500,
      prefix: t("from", { fallback: "From" }),
    },
    {
      id: "operational-efficiency-scaling",
      title: t("operationalEfficiencyScaling", {
        fallback: "Operational Efficiency for Scaling",
      }),
      type: "purchasable",
      price: 7500,
    },
    {
      id: "financial-planning-growth",
      title: t("financialPlanningGrowth", {
        fallback: "Financial Planning for Growth",
      }),
      type: "orderable",
      price: 8000,
      prefix: t("from", { fallback: "From" }),
    },
    {
      id: "leadership-development-team-scaling",
      title: t("leadershipDevelopmentTeamScaling", {
        fallback: "Leadership Development & Team Scaling",
      }),
      type: "orderable",
      price: 8000,
      prefix: t("from", { fallback: "From" }),
    },
    {
      id: "metrics-kpis-growth",
      title: t("metricsKpisGrowth", {
        fallback: "Metrics & KPIs for Growth",
      }),
      type: "purchasable",
      price: 7500,
    },
  ];
};
