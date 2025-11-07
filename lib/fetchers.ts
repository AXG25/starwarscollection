import { swapi, starwarsApi } from "./axiosClient";
import { getUniqueRandomIds, getRandomId } from "@/utils/random";

export async function fetchCharacters(count: number) {
    const ids = getUniqueRandomIds(count, 1, 82);
    const promises = ids.map((id) => starwarsApi.get(`/id/${id}.json`));
    const responses = await Promise.all(promises);
    return responses.map((res) => res.data);
}

export async function fetchStarships(count: number) {
    const maxId = 36;
    const results: any[] = [];
    const triedIds = new Set<number>();
    let attempts = 0;
    const attemptsLimit = 1000; // evita bucles infinitos si la API falla

    while (results.length < count && attempts < attemptsLimit) {
        // genera un id que no se haya intentado aún
        let id = getRandomId(1, maxId);
        let guard = 0;
        while (triedIds.has(id) && guard < 100) {
            id = getRandomId(1, maxId);
            guard++;
        }
        triedIds.add(id);

        try {
            const res = await swapi.get(`/starships/${id}/`);
            results.push({ ...res.data, id });
        } catch (err) {
            // si falla, solo continuamos para intentar con otro id
        }

        attempts++;
    }

    // si por algún motivo no logramos el número solicitado, devolvemos los que haya
    return results.slice(0, count);
}

export async function fetchFilms(count: number = 1) {
    const ids = getUniqueRandomIds(count, 1, 6);
    const promises = ids.map((id) => swapi.get(`/films/${id}/`));
    const responses = await Promise.all(promises);

    return responses.map((res, index) => ({
        ...res.data,
        id: ids[index],
    }));
}
