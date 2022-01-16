import { HomePlanet } from "../models/star-wars-interface";

export const filterPlanets = (allPlanets: HomePlanet[], filterArray: string[]) : HomePlanet[] => {
  const filtered: HomePlanet[] = allPlanets
    .filter((planet: any) => filterArray.some((item) => item === planet.name))
    .map((filteredItem: any) => {
      let name = filteredItem.name;
      let population =
        filteredItem.population === "unknown"
          ? 0
          : Number(filteredItem.population);
      let filteredObj = { name, population };
      return filteredObj;
    });
  return filtered;
};


