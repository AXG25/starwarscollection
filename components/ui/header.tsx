"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "./container";
import { GlassCard } from "./glass-card";

export default function Header() {
    const pathname = usePathname();

    return (
        <header className="fixed top-0 left-0 right-0 z-51">
            <GlassCard className="py-2">
                <Container>
                    <div className="text-center">
                        <h1 className="text-[#FFE81F] text-2xl font-bold uppercase tracking-wider font-['SF_Distant_Galaxy_Outline'] mb-6 drop-shadow-[0_0_10px_rgba(255,232,31,0.5)]">
                            Star Wars Collection TCG
                        </h1>

                        <nav>
                            <div className="flex gap-8 justify-center items-center">
                                <NavLink href="/" isActive={pathname === "/"}>
                                    Mi Álbum
                                </NavLink>
                                <NavLink href="/get-cards" isActive={pathname === "/get-cards"}>
                                    Obtener Láminas
                                </NavLink>
                            </div>
                        </nav>
                    </div>
                </Container>
            </GlassCard>
        </header>
    );
}

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
    isActive: boolean;
}

function NavLink({ href, children, isActive }: NavLinkProps) {
    return (
        <Link
            href={href}
            className={`
        text-sm px-4 py-2 rounded transition-all duration-100 font-['SF_Distant_Galaxy'] tracking-wider
        ${isActive ? "text-[#FFE81F] border border-[#FFE81F]" : "text-white border border-transparent"}
        hover:text-[#FFE81F] hover:border-[#FFE81F]
      `}
        >
            {children}
        </Link>
    );
}