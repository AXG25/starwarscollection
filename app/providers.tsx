"use client";

import { createContext, useContext, useRef, useState } from "react";

interface AudioContextType {
    playing: boolean;
    setPlaying: (playing: boolean) => void;
    audioRef: React.RefObject<HTMLAudioElement | null>;
    muted: boolean;
    setMuted: (muted: boolean) => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null); return (
        <AudioContext.Provider value={{ playing, setPlaying, audioRef, muted, setMuted }}>
            {children}
        </AudioContext.Provider>
    );
}

export function useAudio() {
    const context = useContext(AudioContext);
    if (!context) {
        throw new Error("useAudio must be used within an AudioProvider");
    }
    return context;
}