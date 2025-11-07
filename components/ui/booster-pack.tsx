"use client";

import { useStarWarsSet } from "@/hooks/useStarWarsSet";
import { useState } from "react";
import Modal from "./modal";
import CollectibleCard from "./collectible-card";
import { usePackLock } from "@/app/providers/pack-lock-provider";

export default function BoosterPack({ packId }: { packId: number }) {
    const { mutateAsync } = useStarWarsSet();
    const [isOpen, setIsOpen] = useState(false);
    const [packData, setPackData] = useState<any | null>(null);
    const { isLockedForPack, lock, clearLock, remainingLabel } = usePackLock();

    const locked = isLockedForPack(packId);

    const handleClick = async () => {
        if (locked) return;
        // Iniciamos el bloqueo de los sobres restantes durante 1 minuto
        lock(60_000, packId);
        try {
            const result = await mutateAsync();
            setPackData(result);
            setIsOpen(true);
        } catch (err) {
            // Si falla la carga del sobre, liberamos el bloqueo
            clearLock();
        }
    };

    return (
        <>
            <div
                className={`group relative h-full w-90 select-none ${locked ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
                onClick={handleClick}
            >
                <img
                    src="/images/pack-img.png"
                    alt="Booster Pack"
                    className="object-contain drop-shadow-[0_10px_20px_rgba(255,217,59,0.25)] transition-transform duration-700 ease-out group-hover:scale-[1.08] group-hover:-translate-y-1"
                />
                {locked && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-yellow-300 font-bold rounded-md">
                        <div className="text-sm uppercase">Bloqueado</div>
                        <div className="text-lg font-mono">{remainingLabel}</div>
                    </div>
                )}
            </div>

            <Modal open={isOpen} onClose={() => setIsOpen(false)} title="Tu Booster Pack">
                {/* Contenido del modal: render de todas las cards juntas */}
                {packData ? (
                    <div className="flex flex-wrap justify-around gap-6">
                        {packData.type === "A" ? (
                            <>
                                {packData.characters?.map((ch: any) => (
                                    <CollectibleCard
                                        key={`char-${ch.id}`}
                                        id={ch.id}
                                        name={ch.name}
                                        image={ch.image}
                                        bar={ch.species}
                                        height={ch.height}
                                        mass={ch.mass}
                                        gender={ch.gender}
                                        homeworld={ch.homeworld}
                                        cardType={"regular"}
                                    />
                                ))}
                                {packData.starships?.map((st: any) => {
                                    return (
                                        <CollectibleCard
                                            key={`ship-${st.id}`}
                                            id={st.id}
                                            name={st.name}
                                            image={`/images/starships/${st.id}.jpg` || `/images/starships/${st.id}.png`}
                                            bar={st.model}
                                            manufacturer={st.manufacturer}
                                            passengers={st.passengers}
                                            crew={st.crew}
                                            cargo_capacity={st.cargo_capacity}
                                            cardType={"regular"}
                                        />
                                    );
                                })}
                            </>
                        ) : (
                            <>
                                {packData.film && (
                                    <CollectibleCard
                                        key={`film-${packData.film.id}`}
                                        id={packData.film.id}
                                        title={packData.film.title}
                                        image={`/images/movies/${packData.film.id}.jpg` || `/images/movies/${packData.film.id}.png`}
                                        bar={packData.film.release_date}
                                        director={packData.film.director}
                                        producer={packData.film.producer}
                                        episode_id={packData.film.episode_id}
                                        opening_crawl={packData.film.opening_crawl}
                                        cardType={"special"}
                                    />
                                )}
                                {packData.starship && (() => {
                                    return (
                                        <CollectibleCard
                                            key={`ship-${packData.starship.id}`}
                                            id={packData.starship.id}
                                            name={packData.starship.name}
                                            image={`/images/starships/${packData.starship.id}.jpg` || `/images/starships/${packData.starship.id}.png`}
                                            bar={packData.starship.model}
                                            manufacturer={packData.starship.manufacturer}
                                            passengers={packData.starship.passengers}
                                            crew={packData.starship.crew}
                                            cargo_capacity={packData.starship.cargo_capacity}
                                            cardType={"regular"}
                                        />
                                    );
                                })()}
                                {packData.characters?.map((ch: any) => (
                                    <CollectibleCard
                                        key={`char-${ch.id}`}
                                        id={ch.id}
                                        name={ch.name}
                                        image={ch.image}
                                        bar={ch.species}
                                        height={ch.height}
                                        mass={ch.mass}
                                        gender={ch.gender}
                                        homeworld={ch.homeworld}
                                        cardType={"regular"}
                                    />
                                ))}
                            </>
                        )}
                    </div>
                ) : (
                    <div className="text-center text-sm text-slate-400">Cargando pack...</div>
                )}
            </Modal>
        </>
    );
}