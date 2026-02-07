import { useState, useMemo } from 'react';
import { ITEM_LIBRARY, MOCK_USER } from './data/constants';
import type { TraitItem } from './types';

const getRandomItem = (slot: string, currentId: string) => {
    const items = Object.values(ITEM_LIBRARY).filter(i => i.slot === slot);
    const random = items[Math.floor(Math.random() * items.length)];
    return random ? random.id : currentId;
};

export const useDuckProfile = () => {
    const [currentTraitIds, setCurrentTraitIds] = useState<string[]>(MOCK_USER.traits);

    // Convert IDs to full objects
    const equippedItems = useMemo(() => {
        return currentTraitIds
            .map(id => ITEM_LIBRARY[id])
            .filter((item): item is TraitItem => !!item);
    }, [currentTraitIds]);

    // Logic to change traits (simulating quiz result)
    const randomizeDuck = () => {
        const slots = ['Body', 'Hat', 'Outfit', 'Accessory', 'Wing'];
        const newTraits: string[] = [];

        slots.forEach(slot => {
            const randomId = getRandomItem(slot, '');
            if (randomId) newTraits.push(randomId);
        });

        setCurrentTraitIds(newTraits);
    };

    return {
        user: MOCK_USER,
        equippedItems,
        randomizeDuck
    };
};