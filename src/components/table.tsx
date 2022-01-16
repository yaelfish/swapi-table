import React from "react";
import { HighestPopulationVehicle, HomePlanet } from "../models/star-wars-interface";

interface TableProps {
  highestPopulationVehicleData: HighestPopulationVehicle;
}

const Table: React.FC<TableProps> = ({ highestPopulationVehicleData }) => {
  return (
    highestPopulationVehicleData && 
      <table>
        <tbody>
          <tr>
            <td>Vehicle name with the largest sum</td>
            <td>{highestPopulationVehicleData.relatedName}</td>
          </tr>
          <tr>
            <td>Related home planets and their respective population</td>
            <td>
              {highestPopulationVehicleData.relatedPlanets?.map(
                (planet: HomePlanet) => `{${planet.name}: ${planet.population}} `
              )}
            </td>
          </tr>
          <tr>
            <td>Related pilot names</td>
            <td>
              {highestPopulationVehicleData.relatedPilots?.map(
                (pilot) => `${pilot} `
              )}
            </td>
          </tr>
        </tbody>
      </table>
  );
};

export default Table;
