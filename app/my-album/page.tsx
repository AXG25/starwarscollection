"use client";

import AlbumSection from "@/components/ui/album-section";
import { Container } from "@/components/ui/container";
let personajes = [{
    id: 21,
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
}]

let peliculas = [
    {
        id: 0
    }, {
        id: 1,
        title: "A New Hope",
        episode_id: 4,
        opening_crawl: "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
        director: "George Lucas",
        producer: "Gary Kurtz, Rick McCallum",
        release_date: "1977-05-25",
        image: `/images/movies/1.jpg`,
    }, {
        id: 2,
        title: "The Empire Strikes Back",
        episode_id: 5,
        opening_crawl: "It is a dark time for the\r\nRebellion. Although the Death\r\nStar has been destroyed,\r\nImperial troops have driven the\r\nRebel forces from their hidden\r\nbase and pursued them across\r\nthe galaxy.\r\n\r\nEvading the dreaded Imperial\r\nStarfleet, a group of freedom\r\nfighters led by Luke Skywalker\r\nhas established a new secret\r\nbase on the remote ice world\r\nof Hoth.\r\n\r\nThe evil lord Darth Vader,\r\nobsessed with finding young\r\nSkywalker, has dispatched\r\nthousands of remote probes into\r\nthe far reaches of space....",
        director: "Irvin Kershner",
        producer: "Gary Kurtz, Rick McCallum",
        release_date: "1980-05-17",
        image: `/images/movies/2.jpg`,
    }, {
        id: 3
    }
]

let naves = [{
    id: 1,
    name: "CR90 corvette",
    model: "CR90 corvette",
    manufacturer: "Corellian Engineering Corporation",
    crew: "30-165",
    passengers: "600",
    cargo_capacity: "3000000",
    image: "/images/starships/2.jpg",
}, {
    id: 2
}]

export default function MyAlbumPage() {
    return (
        <Container className="py-8">
            <div>
                <AlbumSection title="Peliculas" items={peliculas} />
                <AlbumSection title="Naves" items={naves} />
                <AlbumSection title="Personajes" items={personajes} />

            </div>
        </Container>
    );
}
