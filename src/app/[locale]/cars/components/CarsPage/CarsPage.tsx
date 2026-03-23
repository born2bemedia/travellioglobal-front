import { CarsCta } from "../CarsCta";
import { CarsEngine } from "../CarsEngine";
import { CarsGlobe } from "../CarsGlobe";
import { CarsHero } from "../CarsHero";
import { CarsRoad } from "../CarsRoad";
import { CarsTerms } from "../CarsTerms";
import { CarsWhy } from "../CarsWhy";

export const CarsPage = () => {
  return (
    <main>
      <CarsHero />
      <CarsCta />
      <CarsEngine />
      <CarsTerms />
      <CarsGlobe />
      <CarsWhy />
      <CarsRoad />
    </main>
  );
};
