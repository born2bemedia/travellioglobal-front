import { VisasBenefits } from "../VisasBenefits";
import { VisasCta } from "../VisasCta";
import { VisasDestinations } from "../VisasDestinations";
import { VisasHero } from "../VisasHero";
import { VisasIntro } from "../VisasIntro";
import { VisasWhy } from "../VisasWhy";

export const VisasPage = () => {
  return (
    <main>
      <VisasHero />
      <VisasIntro />
      <VisasBenefits />
      <VisasDestinations />
      <VisasWhy />
      <VisasCta />
    </main>
  );
};
