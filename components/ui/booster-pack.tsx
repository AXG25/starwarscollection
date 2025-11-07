"use client";

export default function BoosterPack() {
    return (
        <div className="group relative h-full w-90 select-none">
            <img
                src="/images/pack-img.png"
                alt="Booster Pack"
                className="object-contain drop-shadow-[0_10px_20px_rgba(255,217,59,0.25)] transition-transform duration-700 ease-out group-hover:scale-[1.08] group-hover:-translate-y-1"
            />
        </div>
    );
}