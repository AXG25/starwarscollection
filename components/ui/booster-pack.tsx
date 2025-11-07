"use client";

import { useStarWarsSet } from "@/hooks/useStarWarsSet";

export default function BoosterPack() {
    const { mutateAsync, data, isPending, isError } = useStarWarsSet();

    const handleClick = async () => {
        await mutateAsync();
        if (isError) {
            console.error("Error fetching booster pack:", data);
        }
        if (isPending) {
            console.log("Fetching booster pack...");
        }
        if (!isPending && !isError) {
            console.log("Booster pack fetched successfully:", data);
        }
        console.log("Booster pack data:", data);
    };

    return (
        <div className="group relative h-full w-90 select-none" onClick={handleClick}>
            <img
                src="/images/pack-img.png"
                alt="Booster Pack"
                className="object-contain drop-shadow-[0_10px_20px_rgba(255,217,59,0.25)] transition-transform duration-700 ease-out group-hover:scale-[1.08] group-hover:-translate-y-1"
            />
        </div>
    );
}