"use client";

interface CollectibleCardProps {
    id: string | number;
    name: string;
    image: string;
    species?: string;
    height?: string | number;
    mass?: string | number;
    gender?: string;
    homeworld?: string;
    cardType?: "special" | "regular";
}

export default function CollectibleCard({
    id,
    name,
    image,
    species,
    height,
    mass,
    gender,
    homeworld,
    cardType = "regular",
}: CollectibleCardProps) {
    const hexColor =
        cardType === "special" ? "bg-yellow-400 shadow-yellow-500/50" : "bg-slate-300 shadow-slate-400";
    const headerColor =
        cardType === "special" ? "from-yellow-700 to-yellow-900" : "from-slate-700 to-slate-900";

    const MAX_NAME_CHARS = 18;
    const displayName = name.length > MAX_NAME_CHARS ? `${name.slice(0, MAX_NAME_CHARS)}...` : name;

    return (
        <div className="relative w-64 bg-neutral-900 rounded-2xl overflow-hidden border-4 border-slate-900 shadow-[0_0_20px_rgba(0,0,0,0.7)] transition-transform duration-300 hover:scale-105">
            {/* Header */}
            <div
                className={`relative bg-linear-to-b ${headerColor} text-white font-bold text-center uppercase px-3 py-2 shadow-inner`}
            >
                <h2
                    className="text-sm tracking-wide drop-shadow-[1px_1px_1px_rgba(0,0,0,0.6)] truncate"
                    title={name}
                >
                    {displayName}
                </h2>
            </div>

            {/* Imagen */}
            <div className="relative w-full h-44 bg-neutral-800 overflow-hidden border-y border-slate-600">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-contain bg-black/50"
                />

                {/* Hexágono ID */}
                <div
                    className={`z-50 absolute left-1 top-1 w-10 h-10 clip-hex flex items-center justify-center text-xs font-bold text-neutral-900 ${hexColor}`}
                >
                    #{id}
                </div>
            </div>

            {/* Species Bar */}
            {species && (
                <div
                    className={`bg-linear-to-b ${headerColor} text-center text-sm text-yellow-300 py-1 uppercase font-semibold tracking-wider shadow-inner`}
                >
                    {species}
                </div>
            )}

            {/* Stats */}
            <div className="flex flex-col gap-1 px-3 py-3 text-sm text-yellow-950 font-mono bg-stone-200">
                {height && (
                    <p>
                        <span className="text-slate-500">Altura:</span> {height}
                    </p>
                )}
                {mass && (
                    <p>
                        <span className="text-slate-500">Peso:</span> {mass}
                    </p>
                )}
                {gender && (
                    <p>
                        <span className="text-slate-500">Género:</span> {gender}
                    </p>
                )}
                {homeworld && (
                    <p>
                        <span className="text-slate-500">Mundo natal:</span> {homeworld}
                    </p>
                )}
            </div>
        </div>
    );
}