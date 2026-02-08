import React, { useState } from 'react';
import type {DuckAvatarConfig, AvatarAsset} from './types';
import { AVATAR_ASSETS } from './constants';

interface Props {
  config: DuckAvatarConfig;
}

const DuckAvatar: React.FC<Props> = ({ config }) => {
  const [hoveredDescription, setHoveredDescription] = useState<string | null>(null);

  type AssetCategory = keyof typeof AVATAR_ASSETS;

  const getAsset = (category: AssetCategory, id: string): AvatarAsset | undefined => {
    const assets = AVATAR_ASSETS[category] as AvatarAsset[];
    return assets.find(a => a.id === id);
  };

  const layers: { cat: AssetCategory; id: string; z: number }[] = [
    { cat: 'wings', id: config.wings, z: 5 }, // Wings behind body
    { cat: 'skins', id: config.skin, z: 10 },
    { cat: 'hats', id: config.hat, z: 20 },
    { cat: 'handheld-items', id: config['handheld-item'], z: 30 }
  ];

  return (
    <div className="flex flex-col items-center">
      {/* Avatar Container */}
      <div className="relative w-64 h-64 bg-sky-50 rounded-full border-4 border-white shadow-inner overflow-hidden flex items-center justify-center">
        {layers.map((layer) => {
          const asset = getAsset(layer.cat, layer.id);
          if (!asset || !asset.imagePath) return null;
          return (
            <img
              key={layer.cat}
              src={asset.imagePath}
              alt={asset.name}
              className="absolute inset-0 w-full h-full object-contain transition-transform"
              style={{ zIndex: layer.z }}
            />
          );
        })}
      </div>

      {/* Hover Information / Inventory List */}
      <div className="mt-6 w-full max-w-xs space-y-2">
        <h4 className="text-xs font-bold text-sky-900 uppercase tracking-tighter text-center opacity-50 mb-3">Equipped Items (Hover to inspect)</h4>
        <div className="flex flex-wrap justify-center gap-2">
          {layers.map((layer) => {
            const asset = getAsset(layer.cat, layer.id);
            if (!asset || asset.id === 'none') return null;
            return (
              <div 
                key={layer.cat}
                className="group relative cursor-help"
                onMouseEnter={() => setHoveredDescription(asset.description)}
                onMouseLeave={() => setHoveredDescription(null)}
              >
                <div className="px-3 py-1 bg-white border border-sky-100 rounded-full text-xs font-bold text-sky-700 shadow-sm hover:border-sky-400 transition-colors">
                  {asset.name}
                </div>
              </div>
            );
          })}
        </div>

        <div className="min-h-[48px] pt-4 text-center">
          {hoveredDescription ? (
            <p className="text-sm text-sky-800 animate-fade-in italic">“{hoveredDescription}”</p>
          ) : (
            <p className="text-xs text-gray-400">Hover over the duck or items to read their secret lore.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DuckAvatar;
