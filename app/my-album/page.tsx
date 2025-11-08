"use client";
import { useState } from "react";
import AlbumSection from "@/components/ui/album-section";
import { Container } from "@/components/ui/container";
import { useAlbum } from "@/app/providers/album-provider";
import Modal from "@/components/ui/modal";
import CollectibleCard from "@/components/ui/collectible-card";

export default function MyAlbumPage() {
  const { getSection } = useAlbum();
  const [selectedCard, setSelectedCard] = useState<any>(null);

  const handleCardClick = (card: any, cardType: "special" | "regular") => {
    setSelectedCard({ ...card, cardType });
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  const peliculasUnlock = getSection("Peliculas");
  const peliculas = Array.from({ length: 6 }, (_, idx) => {
    const id = idx + 1;
    const data = peliculasUnlock[id];
    return data
      ? {
        id,
        title: data.title,
        episode_id: data.episode_id,
        opening_crawl: data.opening_crawl,
        director: data.director,
        producer: data.producer,
        release_date: data.release_date,
        image: `/images/movies/${id}.jpg`,
      }
      : { id };
  });

  const navesUnlock = getSection("Naves");
  const naves = Array.from({ length: 36 }, (_, idx) => {
    const id = idx + 1;
    const data = navesUnlock[id];
    return data
      ? {
        id,
        name: data.name,
        model: data.model,
        manufacturer: data.manufacturer,
        passengers: data.passengers,
        crew: data.crew,
        cargo_capacity: data.cargo_capacity,
        image: `/images/starships/${id}.jpg`,
      }
      : { id };
  });

  const personajesUnlock = getSection("Personajes");
  const personajes = Array.from({ length: 82 }, (_, idx) => {
    const id = idx + 1;
    const data = personajesUnlock[id];
    return data
      ? {
        id,
        name: data.name,
        height: data.height,
        mass: data.mass,
        gender: data.gender,
        homeworld: data.homeworld,
        image: data.image,
        species: data.species,
      }
      : { id };
  });

  return (
    <Container className="py-8">
      <div>
        <AlbumSection title="Peliculas" items={peliculas} onCardClick={(item) => handleCardClick(item, "special")} />
        <AlbumSection title="Naves" items={naves} onCardClick={(item) => handleCardClick(item, +item.id <= 10 ? "special" : "regular")} />
        <AlbumSection title="Personajes" items={personajes} onCardClick={(item) => handleCardClick(item, +item.id <= 20 ? "special" : "regular")} />
      </div>
      {selectedCard && (
        <Modal title={selectedCard.title || selectedCard.name} open={!!selectedCard} onClose={handleCloseModal}>
          <CollectibleCard {...selectedCard} disableCrop />
        </Modal>
      )}
    </Container>
  );
}
