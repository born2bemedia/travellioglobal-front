import { ExcursionCta } from "../ExcursionCta";
import { ExcursionExplore } from "../ExcursionExplore";
import { ExcursionHero } from "../ExcursionHero";
import { ExcursionWhyChoose } from "../ExcursionWhyChoose";

export const ExcursionPage = () => {
  return (
    <main>
      <ExcursionHero />
      <ExcursionExplore />
      <ExcursionWhyChoose />
      <ExcursionCta />
    </main>
  );
};
