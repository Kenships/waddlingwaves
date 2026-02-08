
import { GoogleGenAI, Type } from "@google/genai";
import { UserAnswers, DuckResult, DuckCategory } from "./types";
import { CATEGORY_SUMMARIES, AVATAR_ASSETS } from "./constants";

const getApiKey = () => {
  try {
    // @ts-expect-error - Vite's import.meta.env is not globally typed in all TS configs
    return import.meta.env?.VITE_API_KEY || (typeof process !== 'undefined' ? process.env.API_KEY : "");
  } catch {
    return typeof process !== 'undefined' ? process.env.API_KEY : "";
  }
};

const apiKey = getApiKey();
const ai = new GoogleGenAI({ apiKey: apiKey || "" });

interface GeminiRawResponse {
  category: string;
  reasoning: string;
  traits: string[];
  avatar: {
    skin: string;
    hat: string;
    'handheld-item': string;
    wings: string;
  };
}

export const categorizeUser = async (answers: UserAnswers): Promise<DuckResult> => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please add VITE_API_KEY to your .env.local file.");
  }

  const availableSkins = AVATAR_ASSETS.skins.map(s => s.id).join(', ');
  const availableHats = AVATAR_ASSETS.hats.map(h => h.id).join(', ');
  const availableWings = AVATAR_ASSETS.wings.map(s => s.id).join(', ');
  const availableHandheldItems = AVATAR_ASSETS['handheld-items'].map(i => i.id).join(', ');

  const prompt = `
    Analyze the following questionnaire answers and categorize the user into ONE of these 5 duck-themed categories:
    1. Tide Setters: Leaders, entrepreneurial, self-centered, ambitious.
    2. Canadian Geese: Abrasive, upfront, bold, judging.
    3. Golden Beak Society: Very social, outgoing, friendly, charismatic.
    4. Wading Waddlers: Quiet, introverted, keeps to themselves, peaceful.
    5. Mischievous Mallards: Playful, clever, unpredictable troublemakers.

    User Answers:
    - MBTI: ${answers.mbti || 'Not provided'}
    - Birthday: ${answers.birthday} (Use this to determine their Zodiac/Star Sign)
    - First Song: ${answers.firstSong}
    - Meme: ${answers.memeResonance}
    - Movie: ${answers.favoriteMovie}
    - Activity: ${answers.duckActivity}
    - Food Strategy: ${answers.foodStrategy}
    - Traits: ${answers.personalityTraits}

    ZODIAC COLOR LOGIC FOR SKINS:
    - If they are a Fire sign (Aries, Leo, Sagittarius), you MUST pick "volcano_red".
    - If they are an Earth sign (Taurus, Virgo, Capricorn), you MUST pick "mallard_green".
    - If they are an Air sign (Gemini, Libra, Aquarius), you MUST pick "ghost_white".
    - If they are a Water sign (Cancer, Scorpio, Pisces), you MUST pick "deep_blue".
    - Fallback: "classic_yellow".

    AVATAR ITEM REGISTRY:
    - Skins: [${availableSkins}]
    - Hats: [${availableHats}]
    - Wings: [${availableWings}]
    - Handheld Items: [${availableHandheldItems}]

    RESPONSE REQUIREMENTS:
    1. Return a JSON response with the category, reasoning, 3 traits, and the chosen avatar item IDs. 
    2. Write the "reasoning" as if addressing the user directly (use "you", not "the user").
    3. Include 2-3 clever duck puns (e.g., "quackers", "bill-iant", "feather-brained") in the reasoning.
    4. Ensure the skin ID perfectly matches the Zodiac logic above.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            category: { type: Type.STRING },
            reasoning: { type: Type.STRING },
            traits: { type: Type.ARRAY, items: { type: Type.STRING } },
            avatar: {
              type: Type.OBJECT,
              properties: {
                skin: { type: Type.STRING },
                hat: { type: Type.STRING },
                wings: { type: Type.STRING },
                'handheld-item': { type: Type.STRING }
              },
              required: ["skin", "hat", "wings", "handheld-item"]
            }
          },
          required: ["category", "reasoning", "traits", "avatar"]
        }
      }
    });

    const responseText = response.text;
    console.log("Gemini Response:", responseText);
    if (!responseText) {
      throw new Error("The duck oracle returned an empty response.");
    }

    const data: GeminiRawResponse = JSON.parse(responseText);

    let category: DuckCategory = DuckCategory.WADING_WADDLERS;
    const catName = data.category.toLowerCase();
    if (catName.includes("tide")) category = DuckCategory.TIDE_SETTERS;
    else if (catName.includes("geese") || catName.includes("goose")) category = DuckCategory.CANADA_GOOSE;
    else if (catName.includes("golden")) category = DuckCategory.GOLDEN_BEAK;
    else if (catName.includes("mischievous") || catName.includes("mallard")) category = DuckCategory.MISCHIEVOUS_MALLARDS;

    return {
      category,
      summary: CATEGORY_SUMMARIES[category],
      detailedReasoning: data.reasoning,
      spiritAnimalTraits: data.traits,
      vibeColor: "",
      avatar: data.avatar
    };
  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error("The pond is blocked. Check your connection!");
  }
};
