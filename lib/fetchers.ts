import { swapi, starwarsApi } from "./axiosClient";
import { getUniqueRandomIds } from "@/utils/random";

export async function fetchCharacters(count: number) {
    const ids = getUniqueRandomIds(count, 1, 82);
    const promises = ids.map((id) => starwarsApi.get(`/id/${id}.json`));
    const responses = await Promise.all(promises);
    return responses.map((res) => res.data);
}

export async function fetchStarships(count: number) {
    const ids = getUniqueRandomIds(count, 1, 36);
    const promises = ids.map((id) => swapi.get(`/starships/${id}/`));
    const responses = await Promise.allSettled(promises);
    // filtra los fallos (algunos ids en SWAPI están vacíos)
    return responses
        .filter((r): r is PromiseFulfilledResult<any> => r.status === "fulfilled")
        .map((r) => r.value.data);
}

export async function fetchFilms(count: number = 1) {
    const ids = getUniqueRandomIds(count, 1, 6);
    const promises = ids.map((id) => swapi.get(`/films/${id}/`));
    const responses = await Promise.all(promises);
    return responses.map((res) => res.data);
}