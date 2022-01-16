import React from "react";
import { HomePlanet } from "../models/star-wars-interface";

interface ChartsProps {
  homePlanets: HomePlanet[]
}

const SVG_WIDTH = 700;
const SVG_HEIGHT = 500;

const Charts: React.FC<ChartsProps> = ({homePlanets}) => {
  
  const x0 = 50;
  const xAxisLength = SVG_WIDTH - x0 * 2;

  const y0 = 50;
  const yAxisLength = SVG_HEIGHT - y0 * 2;

  const xAxisY = y0 + yAxisLength;

  const dataYMax = homePlanets.reduce((currMax, {population}) => Math.max(currMax, +population),-Infinity);
  const dataYMin = homePlanets.reduce((currMin, {population}) => Math.min(currMin, +population),Infinity);
  const dataYRange = dataYMax - dataYMin;
  const barPlotWidth = xAxisLength / homePlanets.length;

  return (
    !homePlanets ? <div>Loading...</div> : 
    <svg width={SVG_WIDTH} height={SVG_HEIGHT}>
      {homePlanets && homePlanets.map((planet, index) => {
        const x = x0 + index * barPlotWidth;
        const yRatio = ((+(planet.population) - dataYMin)) / dataYRange;
        const y = y0 + (1 - yRatio) * yAxisLength;
        const height = yRatio * yAxisLength;
        const sidePadding = 15;
        
        return (
          <g key={index}>
            <text x={x + barPlotWidth / 2} y={y - 10} textAnchor="middle">
              {planet.population}
            </text>
            <rect
              x={x + sidePadding / 2}
              y={y}
              width={barPlotWidth - sidePadding}
              height={height}
              fill="grey"
            />
            <text x={x + barPlotWidth / 2} y={xAxisY + 16} textAnchor="middle">
              {planet.name}
            </text>
          </g>
        );
      })}
    </svg>
  )
};

export default Charts;

