"use client";

import CollectibleCard from "@/components/ui/collectible-card";
import CollectibleCardSkeleton from "@/components/ui/collectible-card-sekeleton";
import { Container } from "@/components/ui/container";

const lukeImage = "https://vignette.wikia.nocookie.net/starwars/images/2/20/LukeTLJ.jpg";

export default function MyAlbumPage() {
    return (
        <Container className="py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <CollectibleCard
                    id="1"
                    name="Luke Skywalker"
                    image={lukeImage}
                    species="Human"
                    height="172cm"
                    mass="77kg"
                    gender="Male"
                    homeworld="Tatooine"
                    cardType="regular"
                />

                <CollectibleCard
                    id="1"
                    name="Luke Skywalker"
                    image={lukeImage}
                    species="Human"
                    height="172cm"
                    mass="77kg"
                    gender="Male"
                    homeworld="Tatooine"
                    cardType="special"
                />

                <CollectibleCardSkeleton />

                <CollectibleCardSkeleton />

                <CollectibleCardSkeleton />
            </div>
        </Container>
    );
}
