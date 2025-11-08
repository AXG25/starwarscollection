"use client";

import CollectibleCard from "./collectible-card";
import CollectibleCardSkeleton from "./collectible-card-sekeleton";

export interface AlbumItem {
    id: string | number;
    name?: string;
    title?: string;
    image?: string;
    species?: string;
    height?: string | number;
    mass?: string | number;
    gender?: string;
    homeworld?: string;
    release_date?: string;
    director?: string;
    producer?: string;
    episode_id?: string | number;
    opening_crawl?: string;
    model?: string;
    manufacturer?: string;
    passengers?: string | number;
    crew?: string | number;
    cargo_capacity?: string | number;
    cardType?: "special" | "regular";
    [key: string]: any;
}

export interface FullAlbumItem extends AlbumItem {
    name: string;
    image: string;
}

interface AlbumSectionProps {
    title: string;
    items?: AlbumItem[];
    loading?: boolean;
    skeletonCount?: number;

}

export default function AlbumSection({
    title,
    items,
    loading = false,
    skeletonCount = 6,

}: AlbumSectionProps) {
    // If loading, show a set of skeleton placeholders. Otherwise use provided items.
    const displayItems = loading ? Array.from({ length: skeletonCount }, (_, i) => ({ id: `skeleton-${i}` })) : items;

    // Type guard: narrow an item to FullAlbumItem when it has name+image
    const hasFullData = (it: AlbumItem | { id: string }): it is FullAlbumItem => {
        const item = it as FullAlbumItem;
        return (typeof item.name === "string" || typeof item.title === "string") && typeof item.image === "string";
    };

    return (
        <section className={`album-section`} aria-labelledby={`section-${title}`}>
            <header className="flex items-center justify-between mb-2 mt-4">
                <h3 id={`section-${title}`} className="text-lg md:text-xl font-bold uppercase text-yellow-300 font-['SF_Distant_Galaxy_Outline']">
                    {title}
                </h3>

            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {displayItems?.length === 0 && !loading ? (
                    <div className="col-span-full text-center text-sm text-slate-500">No hay tarjetas aún.</div>
                ) : (
                    displayItems?.map((item) =>
                        hasFullData(item) ? (
                            <CollectibleCard
                                key={item.id}
                                id={item.id}
                                name={item.name || item.title || ""}
                                image={item.image}
                                bar={item.species || item.release_date || item.model || ""}
                                height={item.height || ""}
                                director={item.director || ""}
                                manufacturer={item.manufacturer || ""}
                                mass={item.mass || ""}
                                producer={item.producer || ""}
                                passengers={item.passengers || ""}
                                gender={item.gender || ""}
                                episode_id={item.episode_id || ""}
                                crew={item.crew || ""}
                                homeworld={item.homeworld || ""}
                                opening_crawl={item.opening_crawl || ""}
                                cargo_capacity={item.cargo_capacity || ""}
                                cardType={
                                    title === "Peliculas"
                                        ? "special"
                                        : title === "Personajes" && +item.id <= 20
                                            ? "special"
                                            : title === "Naves" && +item.id <= 10
                                                ? "special"
                                                : "regular"
                                }
                            />
                        ) : (
                            <CollectibleCardSkeleton key={item.id} id={item.id || ""} />
                        )
                    )
                )}
            </div>
        </section>
    );
}