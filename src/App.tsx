
import React, { useState } from 'react';
import Questionnaire from './components/Questionnaire.tsx';
import ResultView from './components/ResultView.tsx';
import type {UserAnswers, DuckResult} from './components/types.ts';
import { categorizeUser } from './components/geminiService.ts';

const App: React.FC = () => {
  const [view, setView] = useState<'intro' | 'quiz' | 'loading' | 'result'>('intro');
  const [result, setResult] = useState<DuckResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startQuiz = () => {
    setError(null);
    setView('quiz');
  };

  const handleQuizSubmit = async (userAnswers: UserAnswers) => {
    setView('loading');
    setError(null);
    
    try {
      const duckResult = await categorizeUser(userAnswers);
      setResult(duckResult);
      setView('result');
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "The pond is a bit murky right now. Please try again!");
      setView('quiz');
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
    setView('intro');
  };

  return (
    <div className="min-h-screen pb-20 bg-[#f0f9ff]">
      <header className="p-6 flex items-center justify-between">
        <div className="flex items-center space-x-2 cursor-pointer group" onClick={reset}>
          <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center text-2xl shadow-sm group-hover:rotate-12 transition-transform">🦆</div>
          <h1 className="text-xl font-bold text-sky-900 tracking-tight">DuckProfiler</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 mt-8">
        {view === 'intro' && (
          <div className="max-w-2xl mx-auto text-center space-y-8 animate-fade-in">
            <div className="inline-block p-4 bg-sky-100 rounded-3xl mb-4">
              <span className="text-6xl">🌊</span>
            </div>
            <h2 className="text-5xl font-extrabold text-sky-900 leading-tight">
              What kind of duck <br/> 
              <span className="text-sky-500">really are you?</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              Dive into our AI-powered personality pond and find your exclusive society.
            </p>
            <div className="pt-4">
              <button 
                onClick={startQuiz}
                className="px-10 py-5 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl font-black text-xl shadow-xl shadow-amber-200 transition-all hover:scale-105 active:scale-95"
              >
                Start the Assessment
              </button>
            </div>
          </div>
        )}

        {view === 'quiz' && (
          <Questionnaire onSubmit={handleQuizSubmit} isSubmitting={false} />
        )}

        {view === 'loading' && (
          <div className="flex flex-col items-center justify-center space-y-8 py-20 text-center animate-pulse">
            <div className="relative">
              <div className="w-24 h-24 border-8 border-sky-100 border-t-sky-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center text-4xl">🦆</div>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-sky-900">Consulting the Oracle...</h3>
              <p className="text-sky-600">Checking the water temperature and feather quality.</p>
            </div>
          </div>
        )}

        {view === 'result' && result && (
          <ResultView result={result} onRestart={reset} />
        )}

        {error && (
          <div className="max-w-md mx-auto mt-8 p-6 bg-red-50 border-2 border-red-100 text-red-600 rounded-2xl text-center shadow-lg animate-fade-in">
            <div className="text-3xl mb-2">⚠️</div>
            <p className="font-bold mb-1">Pond Error</p>
            <p className="text-sm">{error}</p>
            <button 
              onClick={() => setView('intro')}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-bold"
            >
              Back to Safety
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
