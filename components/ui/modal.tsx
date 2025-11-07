"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function Modal({ open, onClose, title, children }: ModalProps) {
  // Evita scroll del body cuando el modal está abierto
  useEffect(() => {
    if (!open || typeof document === "undefined") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Cerrar con tecla ESC
  useEffect(() => {
    if (!open || typeof window === "undefined") return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-100 flex items-center justify-center"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Content */}
      <div className="relative z-101 mx-4 w-full max-w-5xl rounded-2xl border border-yellow-500/40 bg-neutral-900 shadow-[0_0_30px_rgba(0,0,0,0.6)]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-yellow-500/30 px-5 py-3">
          <h2 className="text-yellow-300 text-lg font-bold uppercase tracking-wider">
            {title || "Booster Pack"}
          </h2>
          <button
            aria-label="Cerrar"
            onClick={onClose}
            className="text-yellow-300/80 hover:text-yellow-300 focus:outline-none"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[70vh] overflow-y-auto p-5">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}