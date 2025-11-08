"use client";

import { useStarWarsSet } from "@/hooks/useStarWarsSet";
import { useEffect, useState } from "react";
import Modal from "./modal";
import CollectibleCard from "./collectible-card";
import { usePackLock } from "@/app/providers/pack-lock-provider";
import { Button } from "./button";
import { useAlbum } from "@/app/providers/album-provider";

export default function BoosterPack({ packId }: { packId: number }) {
    const { mutateAsync } = useStarWarsSet();
    const [isOpen, setIsOpen] = useState(false);
    const [packData, setPackData] = useState<any | null>(null);
    const { isLockedForPack, lock, clearLock, remainingLabel } = usePackLock();
    const { addCard, hasCard } = useAlbum();
    const [processedIds, setProcessedIds] = useState<string[]>([]);

    // LocalStorage keys por pack
    const packKey = `boosterPack.${packId}`;
    const processedKey = `boosterProcessed.${packId}`;

    // Hidratar desde localStorage al montar
    useEffect(() => {
        try {
            const savedPack = localStorage.getItem(packKey);
            if (savedPack) {
                const parsed = JSON.parse(savedPack);
                if (parsed && typeof parsed === "object") {
                    setPackData(parsed);
                }
            }
            const savedProcessed = localStorage.getItem(processedKey);
            if (savedProcessed) {
                const arr = JSON.parse(savedProcessed);
                if (Array.isArray(arr)) setProcessedIds(arr);
            }
        } catch {
            // ignoramos errores de storage
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [packId]);

    // Persistir cambios de packData
    useEffect(() => {
        try {
            if (packData) {
                localStorage.setItem(packKey, JSON.stringify(packData));
            }
        } catch { }
    }, [packData, packKey]);

    // Persistir cambios de processedIds
    useEffect(() => {
        try {
            localStorage.setItem(processedKey, JSON.stringify(processedIds));
        } catch { }
    }, [processedIds, processedKey]);

    // Cerrar automáticamente el modal cuando no queden cartas sin procesar
    useEffect(() => {
        if (!packData) return;
        const keys: string[] = [];
        if (packData.type === "A") {
            packData.characters?.forEach((ch: any) => keys.push(`char-${ch.id}`));
            packData.starships?.forEach((st: any) => keys.push(`ship-${st.id}`));
        } else {
            if (packData.film) keys.push(`film-${packData.film.id}`);
            if (packData.starship) keys.push(`ship-${packData.starship.id}`);
            packData.characters?.forEach((ch: any) => keys.push(`char-${ch.id}`));
        }
        const remaining = keys.filter((k) => !processedIds.includes(k)).length;
        if (remaining === 0) {
            setIsOpen(false);
            try {
                localStorage.removeItem(packKey);
                localStorage.removeItem(processedKey);
            } catch { }
            setPackData(null);
            setProcessedIds([]);
        }
    }, [packData, processedIds]);

    const locked = isLockedForPack(packId);

    const handleClick = async () => {
        // Si está bloqueado pero hay un pack guardado, permitimos reabrir para continuar procesando
        if (locked) {
            if (packData) {
                setIsOpen(true);
            }
            return;
        }
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

    const markProcessed = (key: string) => {
        setProcessedIds((prev) => (prev.includes(key) ? prev : [...prev, key]));
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
                                {packData.characters?.map((ch: any) => {
                                    const isSpecial = Number(ch.id) <= 20;
                                    const key = `char-${ch.id}`;
                                    const already = hasCard("Personajes", ch.id);
                                    if (processedIds.includes(key)) return null;
                                    return (
                                        <div key={key} className="relative">
                                            <CollectibleCard
                                                id={ch.id}
                                                name={ch.name}
                                                image={ch.image}
                                                bar={ch.species}
                                                height={ch.height}
                                                mass={ch.mass}
                                                gender={ch.gender}
                                                homeworld={ch.homeworld}
                                                section={"Personajes"}
                                                cardType={isSpecial ? "special" : "regular"}
                                                actions={
                                                    !already ? (
                                                        <Button
                                                            size="sm"
                                                            onClick={() => {
                                                                addCard("Personajes", ch.id, ch);
                                                                markProcessed(key);
                                                            }}
                                                        >
                                                            Agregar al álbum
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            size="sm"
                                                            onClick={() => {
                                                                markProcessed(key);
                                                            }}
                                                        >
                                                            Descartar
                                                        </Button>
                                                    )
                                                }
                                            />
                                        </div>
                                    );
                                })}
                                {packData.starships?.map((st: any) => {
                                    const isSpecial = Number(st.id) <= 10;
                                    const key = `ship-${st.id}`;
                                    const already = hasCard("Naves", st.id);
                                    if (processedIds.includes(key)) return null;
                                    return (
                                        <div key={key} className="relative">
                                            <CollectibleCard
                                                id={st.id}
                                                name={st.name}
                                                image={`/images/starships/${st.id}.jpg` || `/images/starships/${st.id}.png`}
                                                bar={st.model}
                                                manufacturer={st.manufacturer}
                                                passengers={st.passengers}
                                                crew={st.crew}
                                                cargo_capacity={st.cargo_capacity}
                                                section={"Naves"}
                                                cardType={isSpecial ? "special" : "regular"}
                                                actions={
                                                    !already ? (
                                                        <Button
                                                            size="sm"
                                                            onClick={() => {
                                                                addCard("Naves", st.id, st);
                                                                markProcessed(key);
                                                            }}
                                                        >
                                                            Agregar al álbum
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            size="sm"
                                                            onClick={() => {
                                                                markProcessed(key);
                                                            }}
                                                        >
                                                            Descartar
                                                        </Button>
                                                    )
                                                }
                                            />
                                        </div>
                                    );
                                })}
                            </>
                        ) : (
                            <>
                                {packData.film && (() => {
                                    const key = `film-${packData.film.id}`;
                                    const already = hasCard("Peliculas", packData.film.id);
                                    if (processedIds.includes(key)) return null;
                                    return (
                                        <div key={key} className="relative">
                                            <CollectibleCard
                                                id={packData.film.id}
                                                title={packData.film.title}
                                                image={`/images/movies/${packData.film.id}.jpg` || `/images/movies/${packData.film.id}.png`}
                                                bar={packData.film.release_date}
                                                director={packData.film.director}
                                                producer={packData.film.producer}
                                                episode_id={packData.film.episode_id}
                                                opening_crawl={packData.film.opening_crawl}
                                                section={"Peliculas"}
                                                cardType={"special"}
                                                actions={
                                                    !already ? (
                                                        <Button
                                                            size="sm"
                                                            onClick={() => {
                                                                addCard("Peliculas", packData.film.id, packData.film);
                                                                markProcessed(key);
                                                            }}
                                                        >
                                                            Agregar al álbum
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            size="sm"
                                                            onClick={() => {
                                                                markProcessed(key);
                                                            }}
                                                        >
                                                            Descartar
                                                        </Button>
                                                    )
                                                }
                                            />
                                        </div>
                                    );
                                })()}
                                {packData.starship && (() => {
                                    const st = packData.starship;
                                    const isSpecial = Number(st.id) <= 10;
                                    const key = `ship-${st.id}`;
                                    const already = hasCard("Naves", st.id);
                                    if (processedIds.includes(key)) return null;
                                    return (
                                        <div key={key} className="relative">
                                            <CollectibleCard
                                                id={st.id}
                                                name={st.name}
                                                image={`/images/starships/${st.id}.jpg` || `/images/starships/${st.id}.png`}
                                                bar={st.model}
                                                manufacturer={st.manufacturer}
                                                passengers={st.passengers}
                                                crew={st.crew}
                                                cargo_capacity={st.cargo_capacity}
                                                section={"Naves"}
                                                cardType={isSpecial ? "special" : "regular"}
                                                actions={
                                                    !already ? (
                                                        <Button
                                                            size="sm"
                                                            onClick={() => {
                                                                addCard("Naves", st.id, st);
                                                                markProcessed(key);
                                                            }}
                                                        >
                                                            Agregar al álbum
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            size="sm"
                                                            onClick={() => {
                                                                markProcessed(key);
                                                            }}
                                                        >
                                                            Descartar
                                                        </Button>
                                                    )
                                                }
                                            />
                                        </div>
                                    );
                                })()}
                                {packData.characters?.map((ch: any) => {
                                    const isSpecial = Number(ch.id) <= 20;
                                    const key = `char-${ch.id}`;
                                    const already = hasCard("Personajes", ch.id);
                                    if (processedIds.includes(key)) return null;
                                    return (
                                        <div key={key} className="relative">
                                            <CollectibleCard
                                                id={ch.id}
                                                name={ch.name}
                                                image={ch.image}
                                                bar={ch.species}
                                                height={ch.height}
                                                mass={ch.mass}
                                                gender={ch.gender}
                                                homeworld={ch.homeworld}
                                                section={"Personajes"}
                                                cardType={isSpecial ? "special" : "regular"}
                                                actions={
                                                    !already ? (
                                                        <Button
                                                            size="sm"
                                                            onClick={() => {
                                                                addCard("Personajes", ch.id, ch);
                                                                markProcessed(key);
                                                            }}
                                                        >
                                                            Agregar al álbum
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            size="sm"
                                                            onClick={() => {
                                                                markProcessed(key);
                                                            }}
                                                        >
                                                            Descartar
                                                        </Button>
                                                    )
                                                }
                                            />
                                        </div>
                                    );
                                })}
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