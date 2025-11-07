import BoosterPack from "@/components/ui/booster-pack";

export default function GetCardsPage() {
    return (
        <div className="pt-12 flex flex-wrap justify-center gap-6">
            <BoosterPack packId={1} />
            <BoosterPack packId={2} />
            <BoosterPack packId={3} />
            <BoosterPack packId={4} />
        </div>
    );
}
