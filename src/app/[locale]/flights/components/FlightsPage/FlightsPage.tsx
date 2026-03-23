import { FlightsCta } from "../FlightsCta";
import { FlightsFeaturedSearch } from "../FlightsFeaturedSearch";
import { FlightsGlobalDeals } from "../FlightsGlobalDeals";
import { FlightsHero } from "../FlightsHero";
import { FlightsJourney } from "../FlightsJourney";
import { FlightsMobilePromo } from "../FlightsMobilePromo";

export const FlightsPage = () => {
  return (
    <main>
      <FlightsHero />
      <FlightsFeaturedSearch />
      <FlightsGlobalDeals />
      <FlightsJourney />
      <FlightsCta />
    </main>
  );
};
