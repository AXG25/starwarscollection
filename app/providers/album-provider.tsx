"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type SectionKey = "Peliculas" | "Naves" | "Personajes";

type AlbumSectionStore = Record<string | number, any>;

interface AlbumState {
  Peliculas: AlbumSectionStore;
  Naves: AlbumSectionStore;
  Personajes: AlbumSectionStore;
}

interface AlbumContextValue {
  state: AlbumState;
  addCard: (section: SectionKey, id: string | number, data: any) => void;
  hasCard: (section: SectionKey, id: string | number) => boolean;
  getSection: (section: SectionKey) => AlbumSectionStore;
}

const AlbumContext = createContext<AlbumContextValue | null>(null);

const initialState: AlbumState = {
  Peliculas: {},
  Naves: {},
  Personajes: {},
};

export function AlbumProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AlbumState>(initialState);
  const [hydrated, setHydrated] = useState(false);

  // Hidratar desde localStorage DESPUÉS del primer render para evitar errores de hidratación
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("albumState");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") {
          setState(parsed);
        }
      }
    } catch {}
    setHydrated(true);
  }, []);

  // Persistir sólo cuando está hidratado
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem("albumState", JSON.stringify(state));
    } catch {}
  }, [state, hydrated]);

  const addCard = (section: SectionKey, id: string | number, data: any) => {
    setState((prev) => {
      const next: AlbumState = { ...prev, [section]: { ...prev[section] } } as AlbumState;
      next[section][id] = data;
      return next;
    });
  };

  const hasCard = (section: SectionKey, id: string | number) => {
    return !!state[section][id];
  };

  const getSection = (section: SectionKey) => {
    return state[section];
  };

  const value = useMemo(
    () => ({ state, addCard, hasCard, getSection }),
    [state]
  );

  return <AlbumContext.Provider value={value}>{children}</AlbumContext.Provider>;
}

export function useAlbum() {
  const ctx = useContext(AlbumContext);
  if (!ctx) throw new Error("useAlbum must be used within AlbumProvider");
  return ctx;
}