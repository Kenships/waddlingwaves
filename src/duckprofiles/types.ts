// Using 'as const' makes this act like an enum but is valid standard JS
export const ItemSlot = {
    BACKGROUND: 'Background',
    BODY: 'Body',
    HAT: 'Hat',
    ACCESSORY: 'Accessory',
    OUTFIT: 'Outfit',
    HAND: 'Hand',
    WING: 'Wing',
} as const;

// This extracts the values ('Body' | 'Hat' | etc.) into a Type
export type ItemSlot = typeof ItemSlot[keyof typeof ItemSlot];

export interface TraitItem {
    id: string;
    name: string;
    description: string;
    slot: ItemSlot;
    imageUrl: string; // Placeholder URL
    rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
    stats?: {
        intellect?: number;
        creativity?: number;
        social?: number;
        chaos?: number;
    };
}

export interface UserProfile {
    username: string;
    tagline: string;
    level: number;
    traits: string[]; // List of TraitItem IDs equipped
}