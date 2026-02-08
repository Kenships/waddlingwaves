import React from 'react';
import type {DuckResult} from './types.ts';
import { CATEGORY_METADATA } from './constants.tsx';
import DuckAvatar from './DuckAvatar.tsx';

interface Props {
  name: string;
  result: DuckResult;
  onRestart: () => void;
  onJoinWaddle?: () => void;
  onBackToWaddle?: () => void;
  isCommunityView?: boolean;
}

const ResultView: React.FC<Props> = ({
                                       name,
                                       result,
                                       onRestart,
                                       onJoinWaddle,
                                       onBackToWaddle,
                                       isCommunityView
                                     }) => {
  const meta = CATEGORY_METADATA[result.category];

  return (
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start animate-fade-in pb-20">
        {/* Left Column: Avatar Display */}
        <div className="lg:col-span-5 bg-white sketch-box-thick p-10 shadow-2xl flex flex-col items-center lg:sticky lg:top-8 rotate-1">
          <DuckAvatar config={result.avatar} />
          <div className="mt-10 pt-10 border-t-2 border-dashed border-gray-300 w-full text-center">
            <p className="text-xs text-gray-400 uppercase tracking-widest font-black italic">Generated Oracle Seed</p>
            <code className="text-sm text-sky-500 font-bold block mt-2">
              {result.avatar.skin}.{result.avatar.hat}.{result.avatar.wings}
            </code>
          </div>
        </div>

        {/* Right Column: Information */}
        <div className="lg:col-span-7 bg-white sketch-box-thick shadow-2xl overflow-hidden -rotate-1">
          <div className={`p-12 text-center border-b-4 border-black ${meta?.color || 'bg-sky-500'} text-white`}>
            <div className="text-8xl mb-6 drop-shadow-lg">{meta?.icon || '🦆'}</div>
            <h2 className="text-lg uppercase tracking-[0.3em] font-black opacity-90 mb-2">
              {name}'s Spirit Type
            </h2>
            <h1 className="text-5xl font-black mb-6 underline decoration-wavy decoration-white underline-offset-8 uppercase">
              {result.category}
            </h1>
            <p className="text-2xl font-bold italic leading-tight">"{result.summary}"</p>
          </div>

          <div className="p-10 md:p-14 space-y-10">
            <section>
              <h3 className="text-2xl font-black text-gray-800 mb-4 flex items-center">
                <span className="mr-3 text-3xl">🖋️</span> The Oracle's Report:
              </h3>
              <div className="p-6 bg-yellow-50/50 sketch-box border-gray-200">
                <p className="text-xl text-gray-700 leading-relaxed font-bold">
                  {result.detailedReasoning}
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-black text-gray-800 mb-6 flex items-center">
                <span className="mr-3 text-3xl">🖍️</span> Core Traits:
              </h3>
              <div className="flex flex-wrap gap-4">
                {result.spiritAnimalTraits.map((trait, idx) => (
                    <span
                        key={idx}
                        className="px-6 py-3 sketch-box bg-white text-gray-800 text-lg font-black shadow-sm transform hover:rotate-3 transition-transform"
                    >
                  #{trait.toUpperCase()}
                </span>
                ))}
              </div>
            </section>

            <div className="pt-10 border-t-2 border-dashed border-gray-200 flex flex-col sm:flex-row gap-6">
              {!isCommunityView ? (
                  <>
                    <button
                        onClick={onJoinWaddle}
                        className="flex-1 sketch-button bg-sky-600 hover:bg-sky-700 text-2xl font-black py-5 shadow-xl"
                    >
                      Join the Flock 🦢
                    </button>
                    <button
                        onClick={onRestart}
                        className="flex-1 sketch-button bg-gray-100 !text-gray-800 hover:bg-gray-200 text-xl font-black py-5"
                    >
                      Try Again ↺
                    </button>
                  </>
              ) : (
                  <button
                      onClick={onBackToWaddle}
                      className="w-full sketch-button bg-sky-600 hover:bg-sky-700 text-2xl font-black py-6"
                  >
                    Back to the Pond 🌊
                  </button>
              )}
            </div>
          </div>
        </div>
      </div>
  );
};

export default ResultView;