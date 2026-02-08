import React, { useState, useMemo } from 'react';
import type {UserAnswers} from './types.ts';
import { MBTI_OPTIONS, MEME_OPTIONS, DUCK_ACTIVITIES, FOOD_STRATEGIES } from './constants.tsx';

interface Props {
  onSubmit: (answers: UserAnswers) => void;
  isSubmitting: boolean;
}

const getZodiacSign = (dateStr: string) => {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return null;

  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return { name: 'Aries', icon: '♈' };
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return { name: 'Taurus', icon: '♉' };
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return { name: 'Gemini', icon: '♊' };
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return { name: 'Cancer', icon: '♋' };
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return { name: 'Leo', icon: '♌' };
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return { name: 'Virgo', icon: '♍' };
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return { name: 'Libra', icon: '♎' };
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return { name: 'Scorpio', icon: '♏' };
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return { name: 'Sagittarius', icon: '♐' };
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return { name: 'Capricorn', icon: '♑' };
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return { name: 'Aquarius', icon: '♒' };
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return { name: 'Pisces', icon: '♓' };
  return null;
};

const Questionnaire: React.FC<Props> = ({ onSubmit, isSubmitting }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<UserAnswers>({
    name: '',
    mbti: '',
    firstSong: '',
    memeResonance: '',
    favoriteMovie: '',
    birthday: '',
    duckActivity: '',
    foodStrategy: '',
    personalityTraits: ''
  });

  const MEME_OPTIONS = [
    {
      id: 'justin bieber',
      label: 'Bieber Fever',
      image: '/memes/justin bieber.jpg'
    },
    {
      id: 'skeleton',
      label: 'RAHHHH',
      image: '/memes/skeleton.png'
    },
    {
      id: 'baby',
      label: 'Yooooo',
      image: '/memes/meme4.jpg'
    },
    {
      id: 'me?',
      label: 'me?',
      image: '/memes/meme 3.jpg'
    }
  ];

  const zodiac = useMemo(() => getZodiacSign(answers.birthday), [answers.birthday]);

  const isBirthdayValid = useMemo(() => {
    if (!answers.birthday) return false;
    const date = new Date(answers.birthday);
    const now = new Date();
    const minDate = new Date('1900-01-01');
    return date <= now && date >= minDate;
  }, [answers.birthday]);

  const updateAnswer = (field: keyof UserAnswers, value: string) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const steps = [
    <div key="step-0" className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-4xl font-black text-sky-900 italic underline decoration-sky-200">Identity Yourself</h2>
        <p className="text-xl text-gray-600 font-bold">Every duck in the pond needs a valid identity to join the waddle.</p>
      </div>

      <div className="space-y-4">
        <label className="block text-2xl font-black text-gray-800 italic underline decoration-sky-300 underline-offset-4">
          1. What is your Duck Name? (Required)
        </label>
        <input
            type="text"
            placeholder="e.g. Quackimedes"
            className="w-full shadow-sm focus:rotate-1 transition-transform"
            value={answers.name}
            onChange={(e) => updateAnswer('name', e.target.value)}
        />
      </div>

      <div className="space-y-4">
        <label className="block text-2xl font-black text-gray-800 italic underline decoration-sky-300 underline-offset-4">
          2. Your MBTI Type (Optional)
        </label>
        <select
            className="w-full bg-white shadow-sm"
            value={answers.mbti}
            onChange={(e) => updateAnswer('mbti', e.target.value)}
        >
          <option value="">Choose your vibe...</option>
          {MBTI_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </div>

      <div className="space-y-4">
        <label className="block text-2xl font-black text-gray-800 italic underline decoration-sky-300 underline-offset-4">
          3. When were you hatched? (Required)
        </label>
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <input
                type="date"
                className={`w-full bg-white shadow-sm ${answers.birthday && !isBirthdayValid ? 'border-red-500 bg-red-50' : ''}`}
                value={answers.birthday}
                onChange={(e) => updateAnswer('birthday', e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                min="1900-01-01"
            />
            {answers.birthday && !isBirthdayValid && (
                <p className="absolute -bottom-6 left-0 text-red-500 text-sm font-bold italic">That date seems a bit quackers!</p>
            )}
          </div>
          {zodiac && (
              <div className="flex flex-col items-center justify-center p-3 sketch-box bg-white animate-fade-in border-sky-400 min-w-[80px]">
                <span className="text-3xl">{zodiac.icon}</span>
                <span className="text-[10px] font-black uppercase text-sky-600">{zodiac.name}</span>
              </div>
          )}
        </div>
      </div>
    </div>,

    <div key="step-1" className="space-y-10">
      <div className="space-y-2">
        <h2 className="text-4xl font-black text-sky-900 italic underline decoration-sky-200">Creative Resonance</h2>
        <p className="text-xl text-gray-600 font-bold">The music and stories that float your boat.</p>
      </div>

      <div className="space-y-4">
        <label className="block text-2xl font-black text-gray-800 italic underline decoration-sky-300 underline-offset-4">
          4. First song that comes to your head?
        </label>
        <input
            type="text"
            placeholder="e.g. Bohemian Rhapsody"
            className="w-full shadow-sm"
            value={answers.firstSong}
            onChange={(e) => updateAnswer('firstSong', e.target.value)}
        />
      </div>

      <div className="space-y-4">
        <label className="block text-2xl font-black text-gray-800 italic underline decoration-sky-300 underline-offset-4">
          5. Your Favourite Movie/TV Show?
        </label>
        <input
            type="text"
            placeholder="e.g. The Grand Budapest Hotel"
            className="w-full shadow-sm"
            value={answers.favoriteMovie}
            onChange={(e) => updateAnswer('favoriteMovie', e.target.value)}
        />
      </div>
    </div>,

    <div key="step-2" className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-4xl font-black text-sky-900 italic underline decoration-sky-200">Visual Vibrations</h2>
        <p className="text-xl text-gray-600 font-bold">Which of these frames represents your soul?</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {MEME_OPTIONS.map(meme => (
          <button
            key={meme.id}
            onClick={() => updateAnswer('memeResonance', meme.id)}
            className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                answers.memeResonance === meme.id
                    ? 'border-yellow-400 bg-yellow-100 shadow-md scale-[1.02]'
                    : 'border-transparent bg-white shadow-sm hover:border-sky-200 hover:shadow-md'
            }`}
          >
            <img src={meme.image} alt={meme.label} className="w-full h-27 object-cover rounded-lg mb-2" />
            <span
                className={`text-s font-semibold transition-colors duration-300 ${
                    answers.memeResonance === meme.id
                        ? "text-yellow-800"
                        : "text-gray-700"
                }`}
            >
  {meme.label}
</span>
          </button>
        ))}
      </div>
    </div>,

    <div key="step-3" className="space-y-10">
      <div className="space-y-2">
        <h2 className="text-4xl font-black text-sky-900 italic underline decoration-sky-200">The Pond Instincts</h2>
      </div>

      <div className="space-y-6">
        <label className="block text-2xl font-black text-gray-800 italic underline decoration-sky-300 underline-offset-4">
          6. What activity would you enjoy most?
        </label>
        <div className="grid grid-cols-1 gap-4">
          {DUCK_ACTIVITIES.map(act => (
              <button
                  key={act}
                  onClick={() => updateAnswer('duckActivity', act)}
                  className={`text-left p-6 sketch-box text-xl font-black transition-all transform hover:translate-x-2 ${
                      answers.duckActivity === act ? 'bg-sky-600 text-white border-sky-900 shadow-lg' : 'bg-white text-gray-700 border-gray-300 hover:bg-sky-50'
                  }`}
              >
                • {act}
              </button>
          ))}
        </div>
      </div>

      <div className="space-y-6 pt-6">
        <label className="block text-2xl font-black text-gray-800 italic underline decoration-sky-300 underline-offset-4">
          7. How would you secure your meals?
        </label>
        <div className="grid grid-cols-1 gap-4">
          {FOOD_STRATEGIES.map(strat => (
              <button
                  key={strat}
                  onClick={() => updateAnswer('foodStrategy', strat)}
                  className={`text-left p-6 sketch-box text-xl font-black transition-all transform hover:translate-x-2 ${
                      answers.foodStrategy === strat ? 'bg-amber-500 text-white border-amber-800 shadow-lg' : 'bg-white text-gray-700 border-gray-300 hover:bg-amber-50'
                  }`}
              >
                🍽️ {strat}
              </button>
          ))}
        </div>
      </div>
    </div>,

    <div key="step-4" className="space-y-10">
      <div className="space-y-2">
        <h2 className="text-4xl font-black text-sky-900 italic underline decoration-sky-200">The Final Strokes</h2>
        <p className="text-xl text-gray-600 font-bold">Sum up your being in a few bold strokes.</p>
      </div>

      <div className="space-y-6">
        <label className="block text-2xl font-black text-gray-800 italic underline decoration-sky-300 underline-offset-4">
          8. Describe yourself in 2 personality traits
        </label>
        <textarea
            rows={4}
            placeholder="e.g. Fiercely loyal, somewhat chaotic..."
            className="w-full shadow-inner"
            value={answers.personalityTraits}
            onChange={(e) => updateAnswer('personalityTraits', e.target.value)}
        />
      </div>
      <div className="p-6 bg-blue-50 sketch-box border-dashed border-sky-300 text-center">
        <p className="text-lg text-sky-800 font-black italic">The Great Duck Oracle is preening its feathers...</p>
      </div>
    </div>
  ];

  const canProceed = () => {
    if (step === 0) return answers.name.trim().length > 1 && isBirthdayValid;
    if (step === 1) return answers.firstSong.trim() !== '' && answers.favoriteMovie.trim() !== '';
    if (step === 2) return answers.memeResonance !== '';
    if (step === 3) return answers.duckActivity !== '' && answers.foodStrategy !== '';
    if (step === 4) return answers.personalityTraits.trim().length > 3;
    return true;
  };

  return (
      <div className="max-w-2xl mx-auto bg-white sketch-box-thick p-12 shadow-2xl relative">
        {/* Decorative tape effect */}
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-48 h-12 bg-sky-200/40 -rotate-1 border border-sky-300/50"></div>

        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <span className="text-2xl font-black text-sky-700 uppercase tracking-widest italic underline decoration-wavy">Pond Entry Form</span>
            <span className="text-lg font-bold text-gray-400 italic">Page {step + 1} of {steps.length}</span>
          </div>
          <div className="h-6 bg-gray-100 sketch-box overflow-hidden">
            <div
                className="h-full duck-gradient transition-all duration-1000"
                style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="min-h-[480px]">
          {steps[step]}
        </div>

        <div className="mt-16 flex justify-between items-center">
          {step > 0 && (
              <button
                  onClick={prevStep}
                  className="px-10 py-4 text-2xl font-black text-sky-700 hover:underline active:scale-95 transition-transform"
              >
                ← Back
              </button>
          )}
          <div className="ml-auto">
            {step < steps.length - 1 ? (
                <button
                    onClick={nextStep}
                    disabled={!canProceed()}
                    className={`px-14 py-6 sketch-button font-black text-3xl transition-all ${
                        canProceed()
                            ? 'bg-sky-500 hover:bg-sky-600 shadow-xl'
                            : 'bg-gray-200 border-gray-300 cursor-not-allowed text-gray-400 !shadow-none'
                    }`}
                >
                  Continue →
                </button>
            ) : (
                <button
                    onClick={() => onSubmit(answers)}
                    disabled={isSubmitting || !canProceed()}
                    className={`px-14 py-6 sketch-button font-black text-3xl transition-all ${
                        !isSubmitting && canProceed()
                            ? 'bg-amber-500 hover:bg-amber-600 shadow-xl'
                            : 'bg-gray-200 border-gray-300 cursor-not-allowed text-gray-400 !shadow-none'
                    }`}
                >
                  {isSubmitting ? 'Consulting...' : 'See My Duck!'}
                </button>
            )}
          </div>
        </div>
      </div>
  );
};

export default Questionnaire;