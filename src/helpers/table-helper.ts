import {
  getHomePlanet,
  getPilot,
} from "../api/star-wars-api";
import { HighestPopulationVehicle, HomePlanet, Pilot, Vehicle, VehiclesMap } from "../models/star-wars-interface";

export const mappingVehicles = async (vehiclesWithPilots: Vehicle[]): Promise<VehiclesMap[]> => {
    const vehiclesMaps: any = [];
    
    for (let i=0; i< vehiclesWithPilots.length; i++){        
      const vehicle: Vehicle = vehiclesWithPilots[i];
      vehiclesMaps.push({name: vehicle.name, sum: 0, pilots: []});
        
      await Promise.all(vehicle.pilots.map(async(pilotUrl: string) => {
          
          const pilot: Pilot = await getPilot(pilotUrl);
          const planet: HomePlanet = await getHomePlanet(pilot.homePlanetUrl);
          
          const pilotAndPlanetInfo = {
              url: pilot.url,
              pilot: pilot.name,
              planet: planet.name,
              population: +planet.population || 0,
          };
          
          vehiclesMaps[i].sum += +pilotAndPlanetInfo.population;
          vehiclesMaps[i].pilots.push(pilotAndPlanetInfo);
          return [planet, pilot]
      }))
    };
    return vehiclesMaps;
};

export const getHighestSumOfPopulationVehicleData = (vehiclesMaps: VehiclesMap[]): HighestPopulationVehicle => {
    let maxSumVehicle: any = vehiclesMaps.reduce((prev: any, current: any) => (
         (prev.sum > current.sum) ? prev : current)
    );
    let relatedPilots = [];
    let relatedPlanets = [];
    for (let key in maxSumVehicle.pilots){
        let currentPilot = maxSumVehicle.pilots[key];
        relatedPilots.push(currentPilot.pilot);
        relatedPlanets.push({name: currentPilot.planet, population: currentPilot.population})
    }
    return {relatedName: maxSumVehicle.name, relatedPilots, relatedPlanets}
}

export const getVehiclesWithPilots = (vehicles: Vehicle[]): Vehicle[] => {
  let vehiclesWithPilots = [...vehicles].filter(
    (vehicle: Vehicle) => vehicle.pilots.length > 0
  );
  return vehiclesWithPilots;
};



