"use client";

import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

type PackLockContextType = {
  lockUntil: number | null;
  activePackId: number | null;
  isLocked: boolean;
  remainingMs: number;
  remainingLabel: string;
  lock: (ms: number, packId: number) => void;
  clearLock: () => void;
  isLockedForPack: (packId: number) => boolean;
};

const PackLockContext = createContext<PackLockContextType | null>(null);

const STORAGE_KEYS = {
  until: "packLockUntil",
  packId: "packLockActivePackId",
};

function formatMs(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  const mm = String(m).padStart(2, "0");
  const ss = String(s).padStart(2, "0");
  return `${mm}:${ss}`;
}

export function PackLockProvider({ children }: { children: React.ReactNode }) {
  const [lockUntil, setLockUntil] = useState<number | null>(null);
  const [activePackId, setActivePackId] = useState<number | null>(null);
  const [now, setNow] = useState<number>(Date.now());
  const intervalRef = useRef<number | null>(null);

  // hydrate from localStorage on mount
  useEffect(() => {
    try {
      const storedUntil = localStorage.getItem(STORAGE_KEYS.until);
      const storedPackId = localStorage.getItem(STORAGE_KEYS.packId);
      if (storedUntil) {
        const untilNum = parseInt(storedUntil, 10);
        if (!Number.isNaN(untilNum)) {
          setLockUntil(untilNum);
        }
      }
      if (storedPackId) {
        const packIdNum = parseInt(storedPackId, 10);
        if (!Number.isNaN(packIdNum)) {
          setActivePackId(packIdNum);
        }
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  // tick every second to update countdown and clear when elapsed
  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, []);

  const isLocked = useMemo(() => !!lockUntil && now < (lockUntil as number), [lockUntil, now]);
  const remainingMs = useMemo(() => (lockUntil ? Math.max(0, lockUntil - now) : 0), [lockUntil, now]);
  const remainingLabel = useMemo(() => formatMs(remainingMs), [remainingMs]);

  useEffect(() => {
    if (lockUntil && now >= lockUntil) {
      // auto clear when countdown finishes
      clearLock();
    }
  }, [now, lockUntil]);

  const lock = (ms: number, packId: number) => {
    const until = Date.now() + ms;
    setLockUntil(until);
    setActivePackId(packId);
    try {
      localStorage.setItem(STORAGE_KEYS.until, String(until));
      localStorage.setItem(STORAGE_KEYS.packId, String(packId));
    } catch {
      // ignore storage errors
    }
  };

  const clearLock = () => {
    setLockUntil(null);
    setActivePackId(null);
    try {
      localStorage.removeItem(STORAGE_KEYS.until);
      localStorage.removeItem(STORAGE_KEYS.packId);
    } catch {
      // ignore storage errors
    }
  };

  const isLockedForPack = (_packId: number) => {
    // Bloquea todos los sobres mientras haya bloqueo activo, incluyendo el abierto
    return isLocked;
  };

  const value: PackLockContextType = {
    lockUntil,
    activePackId,
    isLocked,
    remainingMs,
    remainingLabel,
    lock,
    clearLock,
    isLockedForPack,
  };

  return <PackLockContext.Provider value={value}>{children}</PackLockContext.Provider>;
}

export function usePackLock() {
  const ctx = useContext(PackLockContext);
  if (!ctx) throw new Error("usePackLock debe usarse dentro de PackLockProvider");
  return ctx;
}