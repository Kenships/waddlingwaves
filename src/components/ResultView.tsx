// comment
import React from 'react';
import type {DuckResult} from './types';
import { CATEGORY_METADATA } from './constants';

interface Props {
  result: DuckResult;
  onRestart: () => void;
}

const ResultView: React.FC<Props> = ({ result, onRestart }) => {
  const meta = CATEGORY_METADATA[result.category];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        <div className={`p-10 text-center ${meta?.color || 'bg-sky-500'} text-white`}>
          <div className="text-7xl mb-4">{meta?.icon || '🦆'}</div>
          <h2 className="text-sm uppercase tracking-widest font-bold opacity-80 mb-1">Your Duck Destiny is</h2>
          <h1 className="text-4xl font-extrabold mb-4">{result.category}</h1>
          <p className="text-xl font-medium italic opacity-90">"{result.summary}"</p>
        </div>
        
        <div className="p-8 md:p-12 space-y-8">
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
              <span className="mr-2">🧩</span> Why you belong here:
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {result.detailedReasoning}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">✨</span> Core Spirit Traits:
            </h3>
            <div className="flex flex-wrap gap-3">
              {result.spiritAnimalTraits.map((trait, idx) => (
                <span 
                  key={idx}
                  className="px-4 py-2 bg-sky-50 text-sky-700 rounded-full text-sm font-bold border border-sky-100"
                >
                  #{trait}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100">
            <button 
              onClick={onRestart}
              className="w-full py-4 rounded-2xl bg-gray-900 text-white font-bold hover:bg-gray-800 transition-all shadow-lg shadow-gray-200"
            >
              Take the Quiz Again
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-400 text-sm">
        Analyzed by Gemini AI Duck Engine • 2024
      </div>
    </div>
  );
};

export default ResultView;
