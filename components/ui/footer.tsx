"use client";

import { Container } from "./container";
import { GlassCard } from "./glass-card";

export default function Footer() {
    return (
        <footer className="fixed bottom-0 left-0 w-full z-50">
            <GlassCard className="py-1">
                <Container className="text-center">
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