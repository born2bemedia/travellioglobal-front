export type TourRegion =
  | "asia"
  | "australia-pacific"
  | "caribbean"
  | "central-south-america"
  | "europe"
  | "middle-east-africa"
  | "north-america";

export type SortOption =
  | "default"
  | "popularity"
  | "rating"
  | "latest"
  | "price-asc"
  | "price-desc";

export type Tour = {
  id: string;
  slug: string;
  title: string;
  price: number;
  priceLabel?: string;
  originalPriceLabel: string;
  operator: string;
  operatorWebsite?: string;
  minCapacity: number;
  maxCapacityLabel?: string | null;
  region: TourRegion;
  rating: number;
  reviewCount: number;
  image: string;
  popularity: number;
  createdAt: number;
  detailContentKey: TourDetailContentKey;
};

export type TourFeatureCard = {
  number: string;
  title: string;
  body: string;
  icon: "calendar" | "lifebuoy" | "ticket" | "shield";
};

export type TourReview = {
  author: string;
  market: string;
  rating: number;
  quote: string;
};

export type TourDetailSection = {
  title: string;
  body?: string[];
  bullets?: string[];
  readMoreLabel?: string;
  readMoreBody?: string[];
};

export type TourCancellationPolicySection = {
  subtitle?: string;
  bullets?: string[];
  body?: string[];
};

export type TourCancellationPolicy = {
  heading: string;
  sections: TourCancellationPolicySection[];
};

export type TourMeta = {
  title: string;
  description: string;
};

export type TourDetailContentKey = string;

export type TourDetailContent = {
  key: TourDetailContentKey;
  heroSummary: string;
  leadParagraph: string;
  featureCards: TourFeatureCard[];
  availabilityDates: string[];
  availabilityTimes: string[];
  duration: string;
  startTime: string;
  meetingPoint: string;
  reserveMessage: string;
  bookingNote?: string | null;
  overviewTitle: string;
  overviewSections: TourDetailSection[];
  cancellationPolicy?: TourCancellationPolicy | null;
  meta: TourMeta;
  reviews: TourReview[];
};
