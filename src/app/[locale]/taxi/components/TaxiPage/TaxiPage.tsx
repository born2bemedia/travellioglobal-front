import { TaxiBook } from "../TaxiBook";
import { TaxiCta } from "../TaxiCta";
import { TaxiGlobal } from "../TaxiGlobal";
import { TaxiHero } from "../TaxiHero";
import { TaxiSchedule } from "../TaxiSchedule";
import { TaxiStyle } from "../TaxiStyle";
import { TaxiWhy } from "../TaxiWhy";

export const TaxiPage = () => {
  return (
    <main>
      <TaxiHero />
      <TaxiCta />
      <TaxiSchedule />
      <TaxiStyle />
      <TaxiGlobal />
      <TaxiWhy />
      <TaxiBook />
    </main>
  );
};
