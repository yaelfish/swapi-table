export const PLANETS = ["Tatooine", "Alderaan", "Naboo", "Bespin", "Endor"];

export interface Vehicle {
  url: string;
  name: string;
  pilots: string[];
}

export interface HighestPopulationVehicle {
  relatedName: string;
  relatedPilots: any[];
  relatedPlanets: HomePlanet[];
}

export interface VehiclesMap {
  name: string;
  pilots: {pilot: string, planet: string, population: number, url: string};
  sum: number;
}

export interface Pilot {
  url: string;
  name: string;
  homePlanetUrl: string;
}

export interface HomePlanet {
  url?: string;
  name: string;
  population: number | string;
}


