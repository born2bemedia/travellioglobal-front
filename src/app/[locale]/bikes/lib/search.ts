export type BikeCityOption = {
  value: string;
  label: string;
};

type CreateBikesSearchUrlParams = {
  begin: string;
  end: string;
  pickUpCity: string;
  dropOfCity?: string;
  returnAtSameCity: boolean;
  bikeTypes?: readonly number[];
};

export const BIKESBOOKING_URL = "https://bikesbooking.com/en/search/";
export const BIKESBOOKING_SUB_ID = "4720871186344288bc545fc05-552524";
export const BIKE_TYPE_IDS = [1, 2, 3, 4] as const;

export const BIKE_CITY_OPTIONS: readonly BikeCityOption[] = [
  { value: "11350", label: "Lisbon" },
  { value: "12655", label: "Porto" },
  { value: "18421", label: "Faro" },
  { value: "23071", label: "Madeira" },
  { value: "9443", label: "Barcelona" },
  { value: "13335", label: "Ibiza" },
  { value: "8625", label: "Rome" },
  { value: "984", label: "Milan" },
  { value: "10030", label: "Santorini" },
  { value: "10502", label: "Paris" },
  { value: "4989", label: "Nice" },
  { value: "16004", label: "London" },
  { value: "9445", label: "Dubai" },
  { value: "12919", label: "Phuket" },
  { value: "7940", label: "New York" },
] as const;

export const createBikesSearchUrl = ({
  begin,
  end,
  pickUpCity,
  dropOfCity,
  returnAtSameCity,
  bikeTypes = BIKE_TYPE_IDS,
}: CreateBikesSearchUrlParams) => {
  const url = new URL(BIKESBOOKING_URL);

  url.searchParams.set("begin", begin);
  url.searchParams.set("bikeTypes", bikeTypes.join(","));
  url.searchParams.set("end", end);
  url.searchParams.set("pickUpCity", pickUpCity);

  if (!returnAtSameCity && dropOfCity) {
    url.searchParams.set("dropOfCity", dropOfCity);
  }

  url.searchParams.set("returnAtSameCity", String(returnAtSameCity));
  url.searchParams.set("sub_id", BIKESBOOKING_SUB_ID);
  url.searchParams.set("utm_source", "travelpayouts");

  return url.toString();
};
