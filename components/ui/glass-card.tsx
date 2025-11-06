"use client";

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
}

export function GlassCard({ children, className = "" }: GlassCardProps) {
    return (
        <div className={`bg-black/50 backdrop-blur-md rounded-lg ${className}`}>
            {children}
        </div>
    );
}