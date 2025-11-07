// hooks/useStarWarsSet.ts
import { useMutation } from "@tanstack/react-query";
import { fetchCharacters, fetchStarships, fetchFilms } from "@/lib/fetchers";

function getRandomType(): "A" | "B" {
    return Math.random() < 0.5 ? "A" : "B";
}

export function useStarWarsSet() {
    const mutation = useMutation({
        mutationKey: ["starwars-set"],
        mutationFn: async () => {
            const type = getRandomType();

            if (type === "A") {
                const [characters, starships] = await Promise.all([
                    fetchCharacters(3),
                    fetchStarships(2),
                ]);
                return { type, characters, starships };
            } else {
                const [film, starship, characters] = await Promise.all([
                    fetchFilms(1),
                    fetchStarships(1),
                    fetchCharacters(3),
                ]);
                return { type, film: film[0], starship: starship[0], characters };
            }
        },
    });

    return mutation;
}
