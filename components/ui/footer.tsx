"use client";

import { Container } from "./container";
import { GlassCard } from "./glass-card";
import { usePackLock } from "@/app/providers/pack-lock-provider";

export default function Footer() {
    const { isLocked, remainingLabel } = usePackLock();
    return (
        <footer className="fixed bottom-0 left-0 w-full z-50">
            <GlassCard className="py-1 relative">
                <Container className="text-center">
                    {isLocked && (
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-mono px-3 py-1 rounded bg-yellow-400/20 text-yellow-300 border border-yellow-400/50">
                            Sobres bloqueados: {remainingLabel}
                        </span>
                    )}
                    <img
                        src="/images/logo.png"
                        alt="Star Wars Logo"
                        className="h-16 mx-auto mb-1 brightness-0 invert"
                    />
                    <p className="text-sm text-white">
                        Hecho con mucho cariño por{" "}
                        <a
                            href="https://github.com/AXG25"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#ffd93b] no-underline transition-colors duration-200 hover:text-[#ffe584] font-['SF_Distant_Galaxy_Outline'] drop-shadow-[0_0_10px_rgba(255,232,31,0.5)]"
                        >
                            AXG25
                        </a>
                    </p>
                </Container>
            </GlassCard>
        </footer>
    );
}