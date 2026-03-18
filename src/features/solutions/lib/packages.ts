import { useTranslations } from "next-intl";

import type { Package } from "../model/types";

export const usePackages = (): Package[] => {
  const t = useTranslations("pricingPackages");
  return [
    {
      id: "clarity-foundation",
      name: t("pkg1.name", { fallback: "Clarity Foundation" }),
      boldIntro: t("pkg1.boldIntro", {
        fallback:
          "For entrepreneurs who are laying the groundwork for scalable growth.",
      }),
      description: t("pkg1.desc", {
        fallback:
          "This package is designed for businesses in the early stages of development, helping them define their direction and establish a strong foundation for future growth.",
      }),
      price: 15000,
      cta: t("pkg1.cta", { fallback: "Order Clarity Foundation" }),
      items: [
        {
          title: t("pkg1.item1Title", {
            fallback: "Vision Development & Refinement",
          }),
          description: t("pkg1.item1Desc", {
            fallback:
              "Deep dive into your business vision to ensure alignment with your core values and long-term goals.",
          }),
          icon: "/images/pricing/icon-code-circle.svg",
        },
        {
          title: t("pkg1.item2Title", {
            fallback: "Market Research Overview",
          }),
          description: t("pkg1.item2Desc", {
            fallback:
              "Research to understand your industry, competitors, and target market, with actionable insights for your next steps.",
          }),
          icon: "/images/pricing/icon-search-status.svg",
        },
        {
          title: t("pkg1.item3Title", { fallback: "SWOT Analysis" }),
          description: t("pkg1.item3Desc", {
            fallback:
              "A detailed analysis of your Strengths, Weaknesses, Opportunities, and Threats, laying the groundwork for strategic decisions.",
          }),
          icon: "/images/pricing/icon-mask.svg",
        },
        {
          title: t("pkg1.item4Title", {
            fallback: "Strategic Goal Setting",
          }),
          description: t("pkg1.item4Desc", {
            fallback:
              "Define clear, measurable, and actionable goals that align with your business vision.",
          }),
          icon: "/images/pricing/icon-gps.svg",
        },
        {
          title: t("pkg1.item5Title", {
            fallback: "Actionable Next Steps",
          }),
          description: t("pkg1.item5Desc", {
            fallback:
              "A roadmap of prioritized actions that will enable you to execute on your vision and reach your goals efficiently.",
          }),
          icon: "/images/pricing/icon-routing.svg",
        },
        {
          title: t("pkg1.item6Title", {
            fallback: "1 Strategy Session with Our Experts",
          }),
          description: t("pkg1.item6Desc", {
            fallback:
              "A one-on-one session with our senior strategists to refine your plan and approach.",
          }),
          icon: "/images/pricing/icon-ranking.svg",
        },
      ],
    },
    {
      id: "growth-momentum",
      name: t("pkg2.name", { fallback: "Growth Momentum" }),
      boldIntro: t("pkg2.boldIntro", {
        fallback:
          "For businesses that need to refine their positioning and systems for continued growth.",
      }),
      description: t("pkg2.desc", {
        fallback:
          "This package is for businesses beyond the startup phase looking to optimize operations, solidify their market position, and build systems for sustainable expansion.",
      }),
      price: 25000,
      cta: t("pkg2.cta", { fallback: "Order Growth Momentum" }),
      inheritsFrom: t("pkg2.inheritsFrom", {
        fallback: "All Clarity Foundation services",
      }),
      items: [
        {
          title: t("pkg2.item1Title", {
            fallback: "Unique Selling Proposition (USP) Development",
          }),
          description: t("pkg2.item1Desc", {
            fallback:
              "Refine what sets you apart in the market and clarify your value proposition to your target audience.",
          }),
          icon: "/images/pricing/icon-receipt-discount.svg",
        },
        {
          title: t("pkg2.item2Title", {
            fallback: "Target Market Segmentation",
          }),
          description: t("pkg2.item2Desc", {
            fallback:
              "Identify and define key customer segments to tailor your messaging and offerings to.",
          }),
          icon: "/images/pricing/icon-radar.svg",
        },
        {
          title: t("pkg2.item3Title", {
            fallback: "Brand Messaging Strategy",
          }),
          description: t("pkg2.item3Desc", {
            fallback:
              "Create a persuasive messaging framework that communicates your brand's value and resonates with your audience.",
          }),
          icon: "/images/pricing/icon-message-time.svg",
        },
        {
          title: t("pkg2.item4Title", { fallback: "Pricing Strategy" }),
          description: t("pkg2.item4Desc", {
            fallback:
              "Develop competitive and aligned pricing structures that reflect your brand value and target market.",
          }),
          icon: "/images/pricing/icon-tag.svg",
        },
        {
          title: t("pkg2.item5Title", {
            fallback: "Scalable Process Development",
          }),
          description: t("pkg2.item5Desc", {
            fallback:
              "Design efficient processes that enable you to scale without sacrificing quality or customer experience.",
          }),
          icon: "/images/pricing/icon-profile-tick.svg",
        },
        {
          title: t("pkg2.item6Title", {
            fallback: "Basic Systems & Workflow Optimization",
          }),
          description: t("pkg2.item6Desc", {
            fallback:
              "Streamline core operational systems to ensure smooth and efficient daily operations as you scale.",
          }),
          icon: "/images/pricing/icon-diamonds.svg",
        },
        {
          title: t("pkg2.item7Title", {
            fallback: "3 Strategy Sessions",
          }),
          description: t("pkg2.item7Desc", {
            fallback:
              "Monthly check-ins to review progress, adjust strategy, and keep the momentum going.",
          }),
          icon: "/images/pricing/icon-box-tick.svg",
        },
      ],
    },
    {
      id: "strategic-expansion",
      name: t("pkg3.name", { fallback: "Strategic Expansion" }),
      boldIntro: t("pkg3.boldIntro", {
        fallback:
          "For businesses that are ready to expand and refine their approach to new markets and broader operations.",
      }),
      description: t("pkg3.desc", {
        fallback:
          "This package supports businesses that have reached the growth phase and are now looking to refine their strategies for expansion into new markets or verticals, and strengthen their operational foundations for scaling.",
      }),
      price: 35000,
      cta: t("pkg3.cta", { fallback: "Order Strategic Expansion" }),
      inheritsFrom: t("pkg3.inheritsFrom", {
        fallback: "All Growth Momentum services",
      }),
      items: [
        {
          title: t("pkg3.item1Title", {
            fallback: "Strategic Roadmap Development",
          }),
          description: t("pkg3.item1Desc", {
            fallback:
              "Detailed planning to help you align your expansion efforts with business goals and market demands.",
          }),
          icon: "/images/pricing/icon-map.svg",
        },
        {
          title: t("pkg3.item2Title", {
            fallback: "Market Expansion & Diversification",
          }),
          description: t("pkg3.item2Desc", {
            fallback:
              "Identifying and implementing strategies for entering new markets or adding new product lines.",
          }),
          icon: "/images/pricing/icon-maximize.svg",
        },
        {
          title: t("pkg3.item3Title", {
            fallback: "Customer Experience Mapping",
          }),
          description: t("pkg3.item3Desc", {
            fallback:
              "Develop a seamless, optimized customer journey to increase satisfaction and loyalty.",
          }),
          icon: "/images/pricing/icon-profile-tick.svg",
        },
        {
          title: t("pkg3.item4Title", {
            fallback: "Performance Marketing Strategy",
          }),
          description: t("pkg3.item4Desc", {
            fallback:
              "Build and execute a high-impact performance marketing plan to drive awareness and sales.",
          }),
          icon: "/images/pricing/icon-favorite-chart.svg",
        },
        {
          title: t("pkg3.item5Title", {
            fallback: "Brand Amplification Strategy",
          }),
          description: t("pkg3.item5Desc", {
            fallback:
              "Boost brand visibility and engagement through targeted strategies and media exposure.",
          }),
          icon: "/images/pricing/icon-data.svg",
        },
        {
          title: t("pkg3.item6Title", {
            fallback: "Financial Systems & Management Setup",
          }),
          description: t("pkg3.item6Desc", {
            fallback:
              "Ensure your financial systems are structured for growth, with budgeting, forecasting, and reporting.",
          }),
          icon: "/images/pricing/icon-coin.svg",
        },
        {
          title: t("pkg3.item7Title", {
            fallback: "Project Management Frameworks",
          }),
          description: t("pkg3.item7Desc", {
            fallback:
              "Implement a project management system to keep your expansion efforts organized and on track.",
          }),
          icon: "/images/pricing/icon-people.svg",
        },
        {
          title: t("pkg3.item8Title", {
            fallback: "5 Strategy Sessions",
          }),
          description: t("pkg3.item8Desc", {
            fallback:
              "Ongoing collaboration with our experts to monitor progress and pivot strategies as needed.",
          }),
          icon: "/images/pricing/icon-monitor-recorder.svg",
        },
      ],
    },
    {
      id: "elite-transformation",
      name: t("pkg4.name", { fallback: "Elite Transformation" }),
      boldIntro: t("pkg4.boldIntro", {
        fallback:
          "For businesses that need a complete transformation — from strategic direction to operational excellence, and everything in between.",
      }),
      description: t("pkg4.desc", {
        fallback:
          "This comprehensive package is ideal for businesses ready for a full-scale transformation, covering all aspects of the business — from strategy to execution, and from operational efficiency to leadership development.",
      }),
      price: 45000,
      cta: t("pkg4.cta", { fallback: "Order Elite Transformation" }),
      inheritsFrom: t("pkg4.inheritsFrom", {
        fallback: "All Strategic Expansion services",
      }),
      items: [
        {
          title: t("pkg4.item1Title", {
            fallback:
              "Comprehensive Business Process Mapping & Optimization",
          }),
          description: t("pkg4.item1Desc", {
            fallback:
              "Deep analysis of all operational processes, with a focus on removing bottlenecks and improving efficiency.",
          }),
          icon: "/images/pricing/icon-diagram.svg",
        },
        {
          title: t("pkg4.item2Title", {
            fallback: "Risk Management Systems Setup",
          }),
          description: t("pkg4.item2Desc", {
            fallback:
              "Identify, assess, and mitigate risks to ensure your business can sustain growth even during uncertain times.",
          }),
          icon: "/images/pricing/icon-warning.svg",
        },
        {
          title: t("pkg4.item3Title", {
            fallback: "Scalability Assessment & Execution",
          }),
          description: t("pkg4.item3Desc", {
            fallback:
              "Ensure your business scales seamlessly by identifying key opportunities and challenges.",
          }),
          icon: "/images/pricing/icon-maximize-alt.svg",
        },
        {
          title: t("pkg4.item4Title", {
            fallback: "Leadership Development & Team Scaling",
          }),
          description: t("pkg4.item4Desc", {
            fallback:
              "Provide leadership coaching and develop your team to handle growth and scale.",
          }),
          icon: "/images/pricing/icon-crown.svg",
        },
        {
          title: t("pkg4.item5Title", {
            fallback: "Full Financial Planning for Growth",
          }),
          description: t("pkg4.item5Desc", {
            fallback:
              "Boost brand visibility and engagement through targeted strategies and media exposure.",
          }),
          icon: "/images/pricing/icon-calendar-edit.svg",
        },
        {
          title: t("pkg4.item6Title", {
            fallback:
              "Ongoing Strategic Review & Adjustments (up to 6 months)",
          }),
          description: t("pkg4.item6Desc", {
            fallback:
              "Continuous monitoring and adjustments to the strategy to keep your business on track.",
          }),
          icon: "/images/pricing/icon-chart-success.svg",
        },
        {
          title: t("pkg4.item7Title", {
            fallback: "Dedicated 1-on-1 Consulting",
          }),
          description: t("pkg4.item7Desc", {
            fallback:
              "Personal consultations with our senior experts to guide you through critical growth decisions.",
          }),
          icon: "/images/pricing/icon-messages.svg",
        },
        {
          title: t("pkg4.item8Title", {
            fallback: "Complete Performance Monitoring",
          }),
          description: t("pkg4.item8Desc", {
            fallback:
              "With continuous feedback loops to track key metrics, optimize processes, and drive results.",
          }),
          icon: "/images/pricing/icon-status-up.svg",
        },
        {
          title: t("pkg4.item9Title", {
            fallback: "10 Strategy Sessions",
          }),
          description: t("pkg4.item9Desc", {
            fallback:
              "In-depth collaboration with our leadership team, including quarterly reviews, to ensure long-term success.",
          }),
          icon: "/images/pricing/icon-monitor-recorder.svg",
        },
      ],
    },
  ];
};
