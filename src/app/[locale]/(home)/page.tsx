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
      <HomeEmbarkExtraordinary />
      <HomeWhatWeDo />
      <HomeAboutTravellio />
      <HomeGatewayAdventures />
      <HomeTravellersChoose />
      <HomeWhyExplore />
      <HomeExperiences />
      <HomeNextStory />
    </>
  );
}
