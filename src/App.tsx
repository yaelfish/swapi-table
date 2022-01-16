import { useState, useEffect } from "react";
import { getAllPlanets, getAllVehicles } from "./api/star-wars-api";
import {
  getHighestSumOfPopulationVehicleData,
  getVehiclesWithPilots,
  mappingVehicles,
} from "./helpers/table-helper";
import {
  HighestPopulationVehicle,
  HomePlanet,
  PLANETS,
  Vehicle,
  VehiclesMap,
} from "./models/star-wars-interface";
import Table from "./components/table";
import Charts from "./components/charts";
import { filterPlanets } from "./helpers/charts-helper";
import "./App.scss";

export default function App() {
  const [highestPopulationVehicleData, setHighestPopulationVehicleData] = useState<any>({});
  const [homePlanets, setHomePlanets] = useState<HomePlanet[]>([]);
  const [tableIsLoading, setTableIsLoading] = useState<boolean>(true);
  const [chartIsLoading, setChartIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const getTableDataToDisplay = async () => {
      try {
        const allVehicles: any = await getAllVehicles();
        const vehiclesWithPilots: Vehicle[] = getVehiclesWithPilots(allVehicles);
        const mappedVehicles: VehiclesMap[] = await mappingVehicles(vehiclesWithPilots);
        const highestSumVehicleData: HighestPopulationVehicle = getHighestSumOfPopulationVehicleData(mappedVehicles);
        setHighestPopulationVehicleData(highestSumVehicleData);
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setTableIsLoading(false);
      }
    };

    getTableDataToDisplay();
  }, []);

  useEffect(() => {
    const getChartsDataToDisplay = async () => {
      try {
        const allPlanets: any = await getAllPlanets();
        const filteredPlanets: HomePlanet[] = filterPlanets(allPlanets, PLANETS);
        setHomePlanets(filteredPlanets);
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setChartIsLoading(false);
      }
    };

    getChartsDataToDisplay();
  }, []);

  return (
    tableIsLoading || chartIsLoading ? 
    <div>Loading...</div>
   : 
    <div className="App">
      <h1>Star Wars Api</h1>
      {error && (
        <h2>{`There is a problem fetching the star wars data - ${error}`}</h2>
      )}
      <Table highestPopulationVehicleData={highestPopulationVehicleData} />
      <Charts homePlanets={homePlanets} />
    </div>
  );
}
