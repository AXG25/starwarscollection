"use client";

import { useEffect, useState } from "react";
import { GlassCard } from "./glass-card";
import { useAudio } from "@/app/providers";
import { Button } from "./button";

export default function AudioPlayer() {
    const { audioRef, playing, setPlaying, muted, setMuted } = useAudio();
    const [autoplayBlocked, setAutoplayBlocked] = useState(false);

    useEffect(() => {
        const tryAutoplay = async () => {
            const audio = audioRef.current;
            if (!audio) return;

            audio.volume = 0.03;

            try {
                await audio.play();
                setPlaying(true);
                setAutoplayBlocked(false);
                setMuted(audio.muted);
                return;
            } catch { }

            try {
                audio.muted = true;
                await audio.play();
                setPlaying(true);
                setAutoplayBlocked(false);
                setMuted(true);
            } catch {
                setAutoplayBlocked(true);
                setPlaying(false);
            }
        };

        tryAutoplay();
    }, []);

    const toggle = async () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (playing) {
            audio.pause();
            setPlaying(false);
        } else {
            if (audio.muted) {
                audio.muted = false;
                audio.volume = 0.03;
                setMuted(false);
            }

            try {
                await audio.play();
                setPlaying(true);
                setAutoplayBlocked(false);
            } catch {
                setAutoplayBlocked(true);
                setPlaying(false);
            }
        }
    };

    const toggleMute = () => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.muted = !audio.muted;
        if (!audio.muted) audio.volume = 0.03;
        setMuted(audio.muted);
    };

    return (
        <div className="fixed right-3 bottom-3 z-60" aria-hidden={false}>
            <GlassCard className="flex gap-2 items-center p-2">
                <audio ref={audioRef} src="/music/track.mp3" loop preload="auto" />
                <Button
                    onClick={toggle}
                    className="bg-transparent border border-white/20 text-[#ffd93b] px-3 py-1.5 rounded-md cursor-pointer text-sm"
                    aria-pressed={playing}
                    title="Reproducir / Pausar música de fondo"
                >
                    {playing ? "Pausa" : "Reproducir"}
                </Button>

                <Button
                    onClick={toggleMute}
                    className="bg-transparent border border-white/15 text-white px-3 py-1.5 rounded-md cursor-pointer text-sm"
                    title={muted ? "Activar audio" : "Silenciar audio"}
                >
                    {muted ? "🔇" : "🔊"}
                </Button>

                {autoplayBlocked && (
                    <div className="text-white/90 text-sm">
                        Click en "Reproducir" para activar el audio (autoplay bloqueado por el navegador)
                    </div>
                )}
            </GlassCard>
        </div>
    );
}