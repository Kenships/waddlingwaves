import React, { useState } from 'react';
import { ItemSlot } from '../types';
import type { TraitItem } from '../types';

interface AvatarProps {
    items: TraitItem[];
}

const Avatar: React.FC<AvatarProps> = ({ items }) => {
    const [hoveredItem, setHoveredItem] = useState<TraitItem | null>(null);

    // Helper to find item by slot
    const getItem = (slot: ItemSlot) => items.find(i => i.slot === slot);

    /**
     * Renders a specific layer.
     */
    const renderLayer = (slot: ItemSlot, zIndex: number, style: React.CSSProperties) => {
        const item = getItem(slot);
        if (!item) return null;

        const isHovered = hoveredItem?.id === item.id;

        return (
            <div
                className="avatar-layer"
                style={{
                    // CRITICAL: Inline styles ensure stacking works even if external CSS fails
                    position: 'absolute',
                    ...style,
                    zIndex
                }}
                onMouseEnter={() => setHoveredItem(item)}
                onMouseLeave={() => setHoveredItem(null)}
            >
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <img
                        src={item.imageUrl}
                        alt={item.name}
                        className={`shadow-sm ${isHovered ? 'shadow-lg' : ''}`}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover', // Ensures placeholder fills the space
                            borderRadius: '8px'
                        }}
                    />
                    {isHovered && (
                        <div
                            className="layer-highlight"
                            style={{
                                position: 'absolute',
                                inset: 0,
                                border: '2px solid #FCD34D',
                                borderRadius: '8px',
                                pointerEvents: 'none'
                            }}
                        />
                    )}
                </div>
            </div>
        );
    };

    return (
        <div
            className="avatar-stage"
            style={{
                // CRITICAL: Define the stage size and context inline
                position: 'relative',
                width: '100%',
                maxWidth: '400px',
                aspectRatio: '1 / 1',
                margin: '0 auto'
            }}
        >

            {/* Decorative Shadow/Stage */}
            <div
                className="stage-shadow"
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '75%',
                    height: '48px',
                    background: 'rgba(0, 0, 0, 0.4)',
                    filter: 'blur(24px)',
                    borderRadius: '50%',
                    zIndex: 0
                }}
            />

            {/*
        Layers Configuration
        Using inline styles for percentages acts as coordinates for the "Paper Doll" rig.
        Since we added position: 'absolute' to the renderLayer function, these will now stack correctly.
      */}

            {/* Layer 0: WINGS (Behind Body) */}
            {renderLayer(ItemSlot.WING, 5, {
                top: '10%',
                left: '-10%',
                width: '120%',
                height: '60%'
            })}

            {/* Layer 1: BODY (Duck Color) - The Base */}
            {renderLayer(ItemSlot.BODY, 10, {
                top: '10%',
                left: '10%',
                width: '80%',
                height: '80%'
            })}

            {/* Layer 2: OUTFIT (Shirt) - Lower Half */}
            {renderLayer(ItemSlot.OUTFIT, 20, {
                top: '50%',
                left: '20%',
                width: '60%',
                height: '40%'
            })}

            {/* Layer 3: ACCESSORY (Face) - Center */}
            {renderLayer(ItemSlot.ACCESSORY, 30, {
                top: '30%',
                left: '30%',
                width: '40%',
                height: '20%'
            })}

            {/* Layer 4: HAT - Top */}
            {renderLayer(ItemSlot.HAT, 40, {
                top: '0',
                left: '20%',
                width: '60%',
                height: '30%'
            })}

            {/* Floating Tooltip */}
            {hoveredItem && (
                <div
                    className="custom-tooltip animate-bounce-slow"
                    style={{
                        position: 'absolute',
                        top: '-20px',
                        left: '50%',
                        transform: 'translate(-50%, -100%)',
                        zIndex: 1000,
                        pointerEvents: 'none',
                        width: '200px'
                    }}
                >
                    <div className="tooltip-card">
                        <h5 className="text-warning fw-bold mb-1">{hoveredItem.name}</h5>
                        <small className="text-light opacity-75">{hoveredItem.description}</small>
                        <div className="tooltip-arrow" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Avatar;