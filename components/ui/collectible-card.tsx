"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface CollectibleCardProps {
    name: string;
    image: string;
    species?: string;
    height?: string;
    mass?: string;
    gender?: string;
    homeworld?: string;
    cardType: "light" | "dark"; // Para determinar el estilo del borde
    rarity?: number; // 1-5 estrellas
    power?: number; // Poder de ataque/defensa
    className?: string;
}

export default function CollectibleCard({
    name,
    image,
    species,
    height,
    mass,
    gender,
    homeworld,
    cardType = "light",
    rarity = 1,
    power,
    className,
}: CollectibleCardProps) {
    return (
        <div
            className={cn(
                "relative w-[300px] h-[420px] rounded-lg p-1",
                "transform transition-transform duration-300 hover:scale-105",
                "cursor-pointer perspective-1000",
                cardType === "light" ? "card-light" : "card-dark",
                className
            )}
        >
            {/* Marco exterior con brillo */}
            <div className="absolute inset-0 rounded-lg border-2 border-opacity-30 bg-gradient-to-br from-transparent to-white/10" />

            {/* Contenido principal */}
            <div className="relative h-full w-full rounded-lg bg-black/80 p-3 flex flex-col">
                {/* Nombre */}
                <h3 className={cn(
                    "text-lg font-bold mb-2 text-center font-['SF_Distant_Galaxy']",
                    cardType === "light" ? "text-blue-400" : "text-red-500"
                )}>
                    {name}
                </h3>

                {/* Imagen */}
                <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden">
                    <img
                        src={image}
                        alt={name}
                        className="object-cover"
                        sizes="(max-width: 300px) 100vw, 300px"
                    />
                </div>

                {/* Stats */}
                <div className="flex flex-col gap-2 text-sm">
                    {species && (
                        <div className="flex justify-between">
                            <span className="text-gray-400">Species:</span>
                            <span className="text-white">{species}</span>
                        </div>
                    )}
                    {height && (
                        <div className="flex justify-between">
                            <span className="text-gray-400">Height:</span>
                            <span className="text-white">{height}</span>
                        </div>
                    )}
                    {mass && (
                        <div className="flex justify-between">
                            <span className="text-gray-400">Mass:</span>
                            <span className="text-white">{mass}</span>
                        </div>
                    )}
                    {gender && (
                        <div className="flex justify-between">
                            <span className="text-gray-400">Gender:</span>
                            <span className="text-white">{gender}</span>
                        </div>
                    )}
                    {homeworld && (
                        <div className="flex justify-between">
                            <span className="text-gray-400">Homeworld:</span>
                            <span className="text-white">{homeworld}</span>
                        </div>
                    )}
                </div>

                {/* Power y Rareza */}
                <div className="mt-auto pt-3 flex justify-between items-center">
                    {power && (
                        <div className={cn(
                            "px-3 py-1 rounded-full text-sm font-bold",
                            cardType === "light" ? "bg-blue-500/20 text-blue-300" : "bg-red-500/20 text-red-300"
                        )}>
                            Power: {power}
                        </div>
                    )}
                    <div className="flex gap-1">
                        {[...Array(rarity)].map((_, i) => (
                            <span key={i} className="text-yellow-400">★</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}