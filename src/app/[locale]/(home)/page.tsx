import { CustomExtraordinarySearchFormLoader } from "@/features/extraordinary-search";

import {
  HomeAboutTravellio,
  HomeEmbarkExtraordinary,
  HomeExperiences,
  HomeGatewayAdventures,
  HomeHero,
  HomeNextStory,
  HomeReadyChapter,
  HomeTravellersChoose,
  HomeWhatWeDo,
  HomeWhyExplore,
} from "./components";

export default async function Home() {
  return (
    <>
      <HomeHero />
      <HomeReadyChapter />
      <HomeWhatWeDo />
      <HomeAboutTravellio />
      <HomeGatewayAdventures />
      <HomeTravellersChoose />
      <HomeWhyExplore />
      <HomeEmbarkExtraordinary
        formSlot={
          <CustomExtraordinarySearchFormLoader suggestedDestinationIata="BKK" />
        }
      />
      <HomeExperiences />
      <HomeNextStory />
    </>
  );
}
