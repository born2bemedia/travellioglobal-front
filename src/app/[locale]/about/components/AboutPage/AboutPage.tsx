import { AboutCta } from "../AboutCta";
import { AboutHero } from "../AboutHero";
import { AboutJourney } from "../AboutJourney";
import { AboutPromise } from "../AboutPromise";
import { AboutVision } from "../AboutVision";
import { AboutWhyChoose } from "../AboutWhyChoose";

export const AboutPage = () => {
  return (
    <main>
      <AboutHero />
      <AboutJourney />
      <AboutWhyChoose />
      <AboutVision />
      <AboutPromise />
      <AboutCta />
    </main>
  );
};
