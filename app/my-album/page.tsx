"use client";

import CollectibleCard from "@/components/ui/collectible-card";
import { Container } from "@/components/ui/container";

const lukeImage = "https://vignette.wikia.nocookie.net/starwars/images/e/eb/OwenCardTrader.png";

export default function MyAlbumPage() {
    return (
        <Container className="py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <CollectibleCard
                    name="Luke Skywalker"
                    image={lukeImage}
                    species="Human"
                    height="172cm"
                    mass="77kg"
                    gender="Male"
                    homeworld="Tatooine"
                    cardType="light"
                    rarity={5}
                    power={8}
                />

                {/* <CollectibleCard
                    name="Darth Vader"
                    image="https://vignette.wikia.nocookie.net/starwars/images/e/eb/OwenCardTrader.png"
                    species="Human/Cyborg"
                    height="202cm"
                    mass="136kg"
                    gender="Male"
                    homeworld="Tatooine"
                    cardType="dark"
                    rarity={5}
                    power={10}
                /> */}
            </div>
        </Container>
    );
}
