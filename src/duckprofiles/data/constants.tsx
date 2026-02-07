import { ItemSlot } from '../types';
import type { TraitItem, UserProfile } from '../types';

export const ITEM_LIBRARY: Record<string, TraitItem> = {
    // --- BASE BODIES (Duck Colors) ---
    'duck_yellow': {
        id: 'duck_yellow',
        name: 'Classic Yellow',
        description: 'The standard by which all ducks are measured.',
        slot: ItemSlot.BODY,
        imageUrl: 'https://picsum.photos/id/1074/400/400',
        rarity: 'Common',
    },
    'duck_blue': {
        id: 'duck_blue',
        name: 'Cosmic Blue',
        description: 'You are made of stardust and pond water.',
        slot: ItemSlot.BODY,
        imageUrl: 'https://picsum.photos/id/1041/400/400',
        rarity: 'Rare',
    },

    // --- WINGS (New!) ---
    'angel_wings': {
        id: 'angel_wings',
        name: 'Seraphim Wings',
        description: 'You are purely good, or at least you pretend to be.',
        slot: ItemSlot.WING,
        imageUrl: 'https://picsum.photos/id/1024/400/300', // Eagle/Bird related placeholder
        rarity: 'Epic',
    },
    'dragon_wings': {
        id: 'dragon_wings',
        name: 'Ember Scales',
        description: 'Don\'t sneeze, you might start a fire.',
        slot: ItemSlot.WING,
        imageUrl: 'https://picsum.photos/id/1004/400/300',
        rarity: 'Legendary',
    },

    // --- HATS ---
    'wizard_hat': {
        id: 'wizard_hat',
        name: 'Astral Pointy Hat',
        description: 'Bestowed upon those who overthink everything.',
        slot: ItemSlot.HAT,
        imageUrl: 'https://picsum.photos/id/1015/200/200',
        rarity: 'Epic',
    },
    'propeller_cap': {
        id: 'propeller_cap',
        name: 'Whirly Beanie',
        description: 'For the eternal optimist who likes to spin.',
        slot: ItemSlot.HAT,
        imageUrl: 'https://picsum.photos/id/1025/200/200',
        rarity: 'Common',
    },
    'crown_gold': {
        id: 'crown_gold',
        name: 'Heavy Crown',
        description: 'You like to be in charge, or at least look like it.',
        slot: ItemSlot.HAT,
        imageUrl: 'https://picsum.photos/id/1040/200/200',
        rarity: 'Legendary',
    },

    // --- ACCESSORIES ---
    'nerd_glasses': {
        id: 'nerd_glasses',
        name: 'Specs of Scrutiny',
        description: 'You actually read the terms and conditions.',
        slot: ItemSlot.ACCESSORY,
        imageUrl: 'https://picsum.photos/id/1062/150/100',
        rarity: 'Common',
    },
    'cool_shades': {
        id: 'cool_shades',
        name: 'Chill Blockers',
        description: 'Too cool for school, but not for this quiz.',
        slot: ItemSlot.ACCESSORY,
        imageUrl: 'https://picsum.photos/id/64/150/100',
        rarity: 'Rare',
    },

    // --- OUTFITS (Shirts) ---
    'cape_red': {
        id: 'cape_red',
        name: 'Heroic Cape',
        description: 'You save the day, mostly by accident.',
        slot: ItemSlot.OUTFIT,
        imageUrl: 'https://picsum.photos/id/1003/300/300',
        rarity: 'Rare',
    },
    'tuxedo': {
        id: 'tuxedo',
        name: 'Dapper Suit',
        description: 'Ready for the gala or a very formal nap.',
        slot: ItemSlot.OUTFIT,
        imageUrl: 'https://picsum.photos/id/1059/300/300',
        rarity: 'Epic',
    },
    'hawaiian_shirt': {
        id: 'hawaiian_shirt',
        name: 'Vacation Mode',
        description: 'Permanent state of relaxation.',
        slot: ItemSlot.OUTFIT,
        imageUrl: 'https://picsum.photos/id/409/300/300',
        rarity: 'Common',
    },
};

export const MOCK_USER: UserProfile = {
    username: "QuackMaster9000",
    tagline: "Wandering through the pond of life.",
    level: 42,
    traits: ['duck_yellow', 'wizard_hat', 'nerd_glasses', 'cape_red', 'dragon_wings']
};