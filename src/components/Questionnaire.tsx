
import React, { useState } from 'react';
import type {UserAnswers} from './types';
import { MBTI_OPTIONS, MEME_OPTIONS, DUCK_ACTIVITIES, FOOD_STRATEGIES } from './constants';

interface Props {
  onSubmit: (answers: UserAnswers) => void;
  isSubmitting: boolean;
}

const Questionnaire: React.FC<Props> = ({ onSubmit, isSubmitting }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<UserAnswers>({
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

  const updateAnswer = (field: keyof UserAnswers, value: string) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const steps = [
    // Step 0: Intro & Basic Identity
    <div key="step-0" className="space-y-6">
      <h2 className="text-2xl font-bold text-sky-800">Welcome to the Pond!</h2>
      <p className="text-gray-600">Let's find out what kind of duck spirit resides within you.</p>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">MBTI Type (Optional)</label>
        <select 
          className="w-full p-3 border border-sky-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none bg-white"
          value={answers.mbti}
          onChange={(e) => updateAnswer('mbti', e.target.value)}
        >
          <option value="">Select your type...</option>
          {MBTI_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Your Birthday (Zodiac Insight)</label>
        <input 
          type="date"
          className="w-full p-3 border border-sky-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none bg-white"
          value={answers.birthday}
          onChange={(e) => updateAnswer('birthday', e.target.value)}
        />
      </div>
    </div>,

    // Step 1: Creative & Vibes
    <div key="step-1" className="space-y-6">
      <h2 className="text-2xl font-bold text-sky-800">Musical & Cinematic Vibes</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">First song that comes to your head?</label>
        <input 
          type="text"
          placeholder="e.g. Bohemian Rhapsody"
          className="w-full p-3 border border-sky-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
          value={answers.firstSong}
          onChange={(e) => updateAnswer('firstSong', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Favourite Movie?</label>
        <input 
          type="text"
          placeholder="e.g. The Grand Budapest Hotel"
          className="w-full p-3 border border-sky-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
          value={answers.favoriteMovie}
          onChange={(e) => updateAnswer('favoriteMovie', e.target.value)}
        />
      </div>
    </div>,

    // Step 2: Meme Resonance
    <div key="step-2" className="space-y-6">
      <h2 className="text-2xl font-bold text-sky-800">Which meme resonates with you?</h2>
      <div className="grid grid-cols-2 gap-4">
        {MEME_OPTIONS.map(meme => (
          <button
            key={meme.id}
            onClick={() => updateAnswer('memeResonance', meme.id)}
            className={`p-4 rounded-xl border-2 transition-all ${
              answers.memeResonance === meme.id 
                ? 'border-sky-500 bg-sky-50' 
                : 'border-transparent bg-white shadow-sm hover:border-sky-200'
            }`}
          >
            <img src={meme.image} alt={meme.label} className="w-full h-27 object-cover rounded-lg mb-2" />
            <span className="text-s font-semibold text-gray-700">{meme.label}</span>
          </button>
        ))}
      </div>
    </div>,

    // Step 3: Duck Instincts
    <div key="step-3" className="space-y-6">
      <h2 className="text-2xl font-bold text-sky-800">Quack Instincts</h2>
      <div>
        <label className="block text-m font-medium text-gray-700 mb-2">If you were a duck, what activity would you enjoy most?</label>
        <div className="space-y-2">
          {DUCK_ACTIVITIES.map(act => (
            <button
              key={act}
              onClick={() => updateAnswer('duckActivity', act)}
              className={`w-full text-left p-3 rounded-lg border transition-all ${
                answers.duckActivity === act ? 'bg-sky-500 text-white' : 'bg-white hover:bg-sky-50'
              }`}
            >
              {act}
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <label className="block text-m font-medium text-gray-700 mb-2">How would you get food?</label>
        <div className="space-y-2">
          {FOOD_STRATEGIES.map(strat => (
            <button
              key={strat}
              onClick={() => updateAnswer('foodStrategy', strat)}
              className={`w-full text-left p-3 rounded-lg border transition-all ${
                answers.foodStrategy === strat ? 'bg-sky-500 text-white' : 'bg-white hover:bg-sky-50'
              }`}
            >
              {strat}
            </button>
          ))}
        </div>
      </div>
    </div>,

    // Step 4: Final Traits
    <div key="step-4" className="space-y-6">
      <h2 className="text-2xl font-bold text-sky-800">The Final Flourish</h2>
      <div>
        <label className="block text-m font-medium text-gray-700 mb-2">Describe yourself in 2 personality traits</label>
        <textarea
          rows={3}
          placeholder="e.g. Fiercely loyal, somewhat chaotic..."
          className="w-full p-3 border border-sky-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
          value={answers.personalityTraits}
          onChange={(e) => updateAnswer('personalityTraits', e.target.value)}
        />
      </div>
      <p className="text-sm text-gray-500 italic">Our AI ducks are analyzing your essence...</p>
    </div>
  ];

  const canProceed = () => {
    if (step === 0) return answers.birthday !== '';
    if (step === 1) return answers.firstSong !== '' && answers.favoriteMovie !== '';
    if (step === 2) return answers.memeResonance !== '';
    if (step === 3) return answers.duckActivity !== '' && answers.foodStrategy !== '';
    if (step === 4) return answers.personalityTraits.length > 3;
    return true;
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-xl p-8 border border-sky-100">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-bold text-sky-600 uppercase tracking-widest">Questionnaire</span>
          <span className="text-sm text-gray-400">Step {step + 1} of {steps.length}</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full">
          <div 
            className="h-full duck-gradient rounded-full transition-all duration-500"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="min-h-[350px]">
        {steps[step]}
      </div>

      <div className="mt-10 flex justify-between items-center">
        {step > 0 && (
          <button 
            onClick={prevStep}
            className="px-6 py-2 text-sky-600 font-semibold hover:text-sky-800 transition-colors"
          >
            Back
          </button>
        )}
        <div className="ml-auto">
          {step < steps.length - 1 ? (
            <button 
              onClick={nextStep}
              disabled={!canProceed()}
              className={`px-8 py-3 rounded-xl font-bold shadow-lg transition-all ${
                canProceed() 
                  ? 'bg-sky-500 text-white hover:bg-sky-600 shadow-sky-200' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Next
            </button>
          ) : (
            <button 
              onClick={() => onSubmit(answers)}
              disabled={isSubmitting || !canProceed()}
              className={`px-8 py-3 rounded-xl font-bold shadow-lg transition-all ${
                !isSubmitting && canProceed()
                  ? 'bg-amber-500 text-white hover:bg-amber-600 shadow-amber-200' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? 'Consulting the Pond...' : 'Find My Duck Type'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
