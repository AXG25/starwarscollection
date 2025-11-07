"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function CollectibleCardSkeleton({ id }: { id: string | number }) {
    return (
        <div className="relative w-64 bg-neutral-900 rounded-2xl overflow-hidden border-4 border-slate-900 shadow-[0_0_20px_rgba(0,0,0,0.7)] animate-pulse">
            {/* Header */}
            <div className="relative bg-linear-to-b from-slate-700 to-slate-900 text-white font-bold text-center uppercase px-3 py-2 shadow-inner">
                {/* Nombre placeholder */}
                <Skeleton className="mx-auto h-4 w-32 bg-slate-500/50 rounded-md" />
            </div>

            {/* Imagen */}
            <div className="relative w-full h-44 bg-slate-700 overflow-hidden border-y border-slate-600">
                <Skeleton className="w-full h-full bg-slate-600/60" />

                {/* Hexágono ID */}
                <div className="z-50 absolute left-1 top-1 w-10 h-10 clip-hex flex items-center justify-center text-xs font-bold text-neutral-900  bg-slate-400/70">
                    #{id}
                </div>
            </div>

            {/* Species Bar */}
            <div className="bg-linear-to-b from-slate-700 to-slate-900 text-center text-sm py-1 uppercase font-semibold tracking-wider shadow-inner">
                <Skeleton className="mx-auto h-3 w-20 bg-slate-500/50 rounded" />
            </div>

            {/* Stats */}
            <div className="flex flex-col h-full gap-2 px-3 py-3 text-xs font-mono bg-stone-200">
                {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-3 w-40 bg-slate-400/40 rounded" />
                ))}
            </div>
        </div>
    );
}
