import { useTranslations } from "next-intl";

import { Service } from "../model/types";

export const useAllOperationalFoundationsAndSystemsServices = (): Service[] => {
  const t = useTranslations("services");
  return [
    {
      id: "business-process-mapping-optimization",
      title: t("businessProcessMapping", {
        fallback: "Business Process Mapping & Optimization",
      }),
      type: "purchasable",
      price: 8000,
    },
    {
      id: "standard-operating-procedures",
      title: t("sops", {
        fallback: "Standard Operating Procedures (SOPs)",
      }),
      type: "orderable",
      price: 7500,
      prefix: t("from", { fallback: "From" }),
    },
    {
      id: "systems-integration-automation",
      title: t("systemsIntegrationAutomation", {
        fallback: "Systems Integration & Automation",
      }),
      type: "orderable",
      price: 10000,
      prefix: t("from", { fallback: "From" }),
    },
    {
      id: "financial-systems-management",
      title: t("financialSystemsManagement", {
        fallback: "Financial Systems & Management",
      }),
      type: "purchasable",
      price: 8000,
    },
    {
      id: "project-management-frameworks",
      title: t("projectManagementFrameworks", {
        fallback: "Project Management Frameworks",
      }),
      type: "purchasable",
      price: 7500,
    },
    {
      id: "team-collaboration-tools-platforms",
      title: t("teamCollaborationTools", {
        fallback: "Team Collaboration Tools & Platforms",
      }),
      type: "purchasable",
      price: 5500,
    },
    {
      id: "scalability-assessment",
      title: t("scalabilityAssessment", {
        fallback: "Scalability Assessment",
      }),
      type: "orderable",
      price: 8000,
      prefix: t("from", { fallback: "From" }),
    },
    {
      id: "risk-management-systems",
      title: t("riskManagementSystems", {
        fallback: "Risk Management Systems",
      }),
      type: "orderable",
      price: 8500,
      prefix: t("from", { fallback: "From" }),
    },
    {
      id: "business-continuity-planning",
      title: t("businessContinuityPlanning", {
        fallback: "Business Continuity Planning",
      }),
      type: "purchasable",
      price: 7500,
    },
  ];
};
