"use client";

import { useEffect } from "react";

export default function GlobalClickSound() {
    useEffect(() => {
        const audio = new Audio("/sounds/blaster.mp3");

        const handleClick = () => {
            audio.volume = 0.03
            audio.currentTime = 0;
            audio.play().catch(() => { });
        };

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    return null; // No renderiza nada visual
}
