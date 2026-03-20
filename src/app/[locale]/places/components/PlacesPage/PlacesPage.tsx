import { PlacesCta } from "../PlacesCta";
import { PlacesFeatures } from "../PlacesFeatures";
import { PlacesHero } from "../PlacesHero";
import { PlacesRegions } from "../PlacesRegions";

export const PlacesPage = () => {
  return (
    <main>
      <PlacesHero />
      <PlacesRegions />
      <PlacesFeatures />
      <PlacesCta />
    </main>
  );
};
