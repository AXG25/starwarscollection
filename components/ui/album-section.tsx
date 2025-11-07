"use client";

import React from "react";
import CollectibleCard from "./collectible-card";
import CollectibleCardSkeleton from "./collectible-card-sekeleton";

export interface AlbumItem {
    id: string | number;
    name?: string;
    image?: string;
    species?: string;
    height?: string | number;
    mass?: string | number;
    gender?: string;
    homeworld?: string;
    cardType?: "special" | "regular";
    [key: string]: any;
}

export interface FullAlbumItem extends AlbumItem {
    name: string;
    image: string;
}

interface AlbumSectionProps {
    title: string;
    items: AlbumItem[];
    loading?: boolean;
    skeletonCount?: number;
    className?: string;
}

export default function AlbumSection({
    title,
    items,
    loading = false,
    skeletonCount = 6,
    className = "",
}: AlbumSectionProps) {
    // If loading, show a set of skeleton placeholders. Otherwise use provided items.
    const displayItems = loading ? Array.from({ length: skeletonCount }, (_, i) => ({ id: `skeleton-${i}` })) : items;

    // Type guard: narrow an item to FullAlbumItem when it has name+image
    const hasFullData = (it: AlbumItem | { id: string }): it is FullAlbumItem => {
        return typeof (it as FullAlbumItem).name === "string" && typeof (it as FullAlbumItem).image === "string";
    };

    return (
        <section className={`album-section ${className}`} aria-labelledby={`section-${title}`}>
            <header className="flex items-center justify-between mb-2 mt-4">
                <h3 id={`section-${title}`} className="text-lg md:text-xl font-bold uppercase text-yellow-300">
                    {title}
                </h3>

            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {displayItems.length === 0 && !loading ? (
                    <div className="col-span-full text-center text-sm text-slate-500">No hay tarjetas aún.</div>
                ) : (
                    displayItems.map((item) =>
                        hasFullData(item) ? (
                            <CollectibleCard
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                image={item.image}
                                species={item.species}
                                height={item.height}
                                mass={item.mass}
                                gender={item.gender}
                                homeworld={item.homeworld}
                                cardType={item.cardType}
                            />
                        ) : (
                            <CollectibleCardSkeleton id={item.id} />
                        )
                    )
                )}
            </div>
        </section>
    );
}