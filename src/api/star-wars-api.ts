import axios from "axios";
import { HomePlanet, Pilot, Vehicle } from "../models/star-wars-interface";
const BASE_API = "https://swapi.py4e.com/api/";

export const getAllVehicles = (url = `${BASE_API}vehicles`, vehicles = []): Promise<Vehicle[]> => {
    return new Promise((resolve, reject) =>
      fetch(url)
        .then((response) => {
          if (response.status !== 200) {
            throw `${response.status}: ${response.statusText}`;
          }
          response
            .json()
            .then((data) => {
              vehicles = vehicles.concat(data.results);
  
              if (data.next) {
                getAllVehicles(data.next, vehicles).then(resolve).catch(reject);
              } else {
                resolve(vehicles);
              }
            })
            .catch(reject);
        })
        .catch(reject)
    );
};

export const getAllPlanets = (url = `${BASE_API}planets`, planets = []): Promise<HomePlanet[]> => {
    return new Promise((resolve, reject) =>
      fetch(url)
        .then((response) => {
          if (response.status !== 200) {
            throw `${response.status}: ${response.statusText}`;
          }
          response
            .json()
            .then((data) => {
              planets = planets.concat(data.results);
  
              if (data.next) {
                getAllPlanets(data.next, planets).then(resolve).catch(reject);
              } else {
                resolve(planets);
              }
            })
            .catch(reject);
        })
        .catch(reject)
    );
};

export const getPilot = async (pilotUrl: string): Promise<any> => {
  try {
    let result = await axios.get(pilotUrl);
    let pilot: Pilot = {
        url: pilotUrl,
        name: result.data.name,
        homePlanetUrl: result.data.homeworld
    }
    return pilot;
  }
  catch(error){
    console.error(error);
  }  
};

export const getHomePlanet = async (homePlanetUrl: string): Promise<any> => {
  try {
    const result = await axios.get(homePlanetUrl);
    let homePlanet: HomePlanet = {
        url: homePlanetUrl,
        name: result.data.name,
        population: result.data.population
    }
    return homePlanet;
  }
  catch(error){
    console.error(error);
  }  
}



