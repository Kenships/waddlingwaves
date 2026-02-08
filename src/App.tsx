import React, { useState, useEffect } from 'react';
import Questionnaire from './components/Questionnaire.tsx';
import ResultView from './components/ResultView.tsx';
import WaddleView from './components/WaddleView.tsx';
import type {UserAnswers, DuckResult, WaddleMember} from './components/types.ts';
import { categorizeUser } from './components/geminiService.ts';

const STORAGE_KEY = 'duck_profiler_waddle';

const App: React.FC = () => {
  const [view, setView] = useState<'intro' | 'quiz' | 'loading' | 'result' | 'waddle' | 'viewMember'>('intro');
  const [result, setResult] = useState<DuckResult | null>(null);
  const [currentUserAnswers, setCurrentUserAnswers] = useState<UserAnswers | null>(null);
  const [selectedMember, setSelectedMember] = useState<WaddleMember | null>(null);
  const [waddleMembers, setWaddleMembers] = useState<WaddleMember[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setWaddleMembers(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load Waddle DB", e);
      }
    }
  }, []);

  const saveToWaddle = (member: WaddleMember) => {
    const updated = [...waddleMembers, member];
    setWaddleMembers(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const startQuiz = () => {
    setError(null);
    setView('quiz');
  };

  const handleQuizSubmit = async (userAnswers: UserAnswers) => {
    setView('loading');
    setError(null);
    setCurrentUserAnswers(userAnswers);

    try {
      const duckResult = await categorizeUser(userAnswers);
      setResult(duckResult);
      setView('result');
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Pond error! Please check your ink.");
      setView('quiz');
    }
  };

  const handleJoinWaddle = () => {
    if (result && currentUserAnswers) {
      const newMember: WaddleMember = {
        id: crypto.randomUUID(),
        name: currentUserAnswers.name,
        category: result.category,
        avatar: result.avatar,
        joinedAt: new Date().toISOString(),
        summary: result.summary,
        detailedReasoning: result.detailedReasoning,
        spiritAnimalTraits: result.spiritAnimalTraits
      };

      const exists = waddleMembers.some(m => m.name === newMember.name && m.category === newMember.category);
      if (!exists) {
        saveToWaddle(newMember);
      }
      setView('waddle');
    }
  };

  const reset = () => {
    setResult(null);
    setCurrentUserAnswers(null);
    setSelectedMember(null);
    setError(null);
    setView('intro');
  };

  return (
      <div className="min-h-screen">
        <header className="p-8 flex items-center justify-between">
          <div className="flex items-center space-x-4 cursor-pointer group" onClick={reset}>
            <div className="w-14 h-14 bg-amber-400 sketch-box-thick flex items-center justify-center text-4xl shadow-md group-hover:rotate-12 transition-transform">🦆</div>
            <h1 className="text-4xl font-black text-gray-900 italic tracking-tighter uppercase">Waddling<span className="text-sky-500 underline decoration-wavy">Waves</span></h1>
          </div>
          {waddleMembers.length > 0 && view === 'intro' && (
              <button
                  onClick={() => setView('waddle')}
                  className="text-xl font-black text-sky-600 hover:text-sky-800 transition-colors italic underline"
              >
                Visit The Pond ({waddleMembers.length})
              </button>
          )}
        </header>

        <main className="container mx-auto px-6 py-12">
          {view === 'intro' && (
              <div className="max-w-3xl mx-auto text-center space-y-12 animate-fade-in">
                <div className="inline-block p-8 bg-sky-100 sketch-box-thick rotate-2 shadow-xl">
                  <span className="text-8xl">🦢</span>
                </div>
                <h2 className="text-7xl font-black text-gray-900 leading-none uppercase tracking-tighter italic">
                  What kind of duck <br/>
                  <span className="text-sky-500 underline decoration-dashed decoration-4 underline-offset-8">actually are you?</span>
                </h2>
                <p className="text-2xl text-gray-600 font-bold max-w-lg mx-auto leading-relaxed">
                  Doodle your way through our AI personality pond and discover your secret Society.
                </p>
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-8">
                  <button
                      onClick={startQuiz}
                      className="px-16 py-6 bg-amber-500 sketch-button text-white font-black text-3xl shadow-2xl hover:scale-105"
                  >
                    Begin Assessment
                  </button>
                  {waddleMembers.length > 0 && (
                      <button
                          onClick={() => setView('waddle')}
                          className="px-16 py-6 bg-white sketch-button !text-sky-600 font-black text-3xl border-sky-200"
                      >
                        The Flock
                      </button>
                  )}
                </div>
              </div>
          )}

          {view === 'quiz' && (
              <Questionnaire onSubmit={handleQuizSubmit} isSubmitting={false} />
          )}

          {view === 'loading' && (
              <div className="flex flex-col items-center justify-center space-y-12 py-32 text-center">
                <div className="relative">
                  <div className="w-40 h-40 border-8 border-gray-200 border-t-sky-500 sketch-box-thick rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-6xl">🦆</div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-4xl font-black text-gray-900 italic underline decoration-sky-300 underline-offset-8">Quack-culating...</h3>
                  <p className="text-xl text-gray-500 font-bold italic">The Council of Wise Mallards is reviewing your essence.</p>
                </div>
              </div>
          )}

          {view === 'result' && result && currentUserAnswers && (
              <ResultView
                  name={currentUserAnswers.name}
                  result={result}
                  onRestart={reset}
                  onJoinWaddle={handleJoinWaddle}
              />
          )}

          {view === 'waddle' && (
              <WaddleView
                  members={waddleMembers}
                  onBack={reset}
                  onViewMember={(m) => { setSelectedMember(m); setView('viewMember'); }}
              />
          )}

          {view === 'viewMember' && selectedMember && (
              <ResultView
                  name={selectedMember.name}
                  result={{
                    category: selectedMember.category,
                    summary: selectedMember.summary,
                    detailedReasoning: selectedMember.detailedReasoning,
                    spiritAnimalTraits: selectedMember.spiritAnimalTraits,
                    avatar: selectedMember.avatar,
                    vibeColor: ''
                  }}
                  isCommunityView={true}
                  onBackToWaddle={() => setView('waddle')}
                  onRestart={reset}
              />
          )}

          {error && (
              <div className="max-w-md mx-auto mt-12 p-10 bg-red-50 sketch-box-thick border-red-500 text-red-600 text-center shadow-2xl">
                <div className="text-6xl mb-4">🚫</div>
                <p className="font-black text-2xl mb-2 underline">System Failure!</p>
                <p className="font-bold italic">{error}</p>
                <button
                    onClick={reset}
                    className="mt-8 sketch-button bg-red-600 text-white font-black"
                >
                  Return to Shore
                </button>
              </div>
          )}
        </main>
      </div>
  );
};

export default App;