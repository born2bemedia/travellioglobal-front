import { BikesCta } from "../BikesCta";
import { BikesExperience } from "../BikesExperience";
import { BikesHero } from "../BikesHero";
import { BikesRules } from "../BikesRules";
import { BikesStyles } from "../BikesStyles";
import { BikesWhy } from "../BikesWhy";

export const BikesPage = () => {
  return (
    <main>
      <BikesHero />
      <BikesRules />
      <BikesStyles />
      <BikesExperience />
      <BikesWhy />
      <BikesCta />
    </main>
  );
};
