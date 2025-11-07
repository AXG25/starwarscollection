import axios from "axios";

export const swapi = axios.create({
    baseURL: "https://swapi.dev/api/",
});

export const starwarsApi = axios.create({
    baseURL: "https://akabab.github.io/starwars-api/api/",
});