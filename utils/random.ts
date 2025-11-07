export const getRandomId = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getUniqueRandomIds = (count: number, min: number, max: number): number[] => {
    const ids = new Set<number>();
    while (ids.size < count) {
        ids.add(getRandomId(min, max));
    }
    return Array.from(ids);
};