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
  title: string;
  price: number;
  region: TourRegion;
  rating: number;
  image: string;
  popularity: number;
  createdAt: number;
};
