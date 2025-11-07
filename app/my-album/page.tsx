"use client";

import AlbumSection from "@/components/ui/album-section";
import CollectibleCard from "@/components/ui/collectible-card";
import CollectibleCardSkeleton from "@/components/ui/collectible-card-sekeleton";
import { Container } from "@/components/ui/container";

const lukeImage = "https://vignette.wikia.nocookie.net/starwars/images/2/20/LukeTLJ.jpg";

const personajes = [
    {
        id: "1",
        name: "Luke Skywalker",
        image: "https://vignette.wikia.nocookie.net/starwars/images/2/20/LukeTLJ.jpg",
        species: "human",
        height: 1.72,
        mass: 73,
        gender: "male",
        homeworld: "tatooine"

    },
    {
        id: "2",
        name: "C-3PO",
        height: 1.71,
        mass: 75,
        gender: "male",
        homeworld: "tatooine",
        species: "droid",
        image: "https://vignette.wikia.nocookie.net/starwars/images/3/3f/C-3PO_TLJ_Card_Trader_Award_Card.png"
    }
];

export default function MyAlbumPage() {
    return (
        <Container className="py-8">
            <div>
                <AlbumSection title="Peliculas" items={[{ id: 1 }, { id: 2 }, { id: 3 }]} />
                <AlbumSection title="Naves" items={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]} />
                <AlbumSection title="Personajes" items={[{
                    id: 1,
                    name: "Luke Skywalker",
                    height: 1.72,
                    mass: 73,
                    gender: "male",
                    homeworld: "tatooine",
                    image: "https://vignette.wikia.nocookie.net/starwars/images/2/20/LukeTLJ.jpg",
                    species: "human",
                }, {
                    id: 2,
                    name: "C-3PO",
                    height: 1.71,
                    mass: 75,
                    gender: "male",
                    homeworld: "tatooine",
                    species: "droid",
                    image: "https://vignette.wikia.nocookie.net/starwars/images/3/3f/C-3PO_TLJ_Card_Trader_Award_Card.png"
                }, {
                    id: 3,
                    name: "R2-D2",
                    height: 1.6,
                    mass: 32,
                    gender: "male",
                    homeworld: " Naboo",
                    species: "droid",
                    image: "https://vignette.wikia.nocookie.net/starwars/images/e/eb/ArtooTFA2-Fathead.png"
                }, {
                    id: 4,
                    name: "Darth Vader",
                    height: 2.02,
                    mass: 136,
                    gender: "male",
                    homeworld: "tatooine",
                    image: "https://vignette.wikia.nocookie.net/fr.starwars/images/3/32/Dark_Vador.jpg",
                    species: "human",
                }, {
                    id: 5,
                    name: "Leia Organa",
                    height: 1.5,
                    mass: 51,
                    gender: "female",
                    homeworld: "alderaan",
                    image: "https://vignette.wikia.nocookie.net/starwars/images/f/fc/Leia_Organa_TLJ.png",
                    species: "human",
                }]} />

            </div>
        </Container>
    );
}
