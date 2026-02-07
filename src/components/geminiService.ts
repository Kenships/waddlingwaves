
import { GoogleGenAI, Type } from "@google/genai";
import { UserAnswers, DuckResult, DuckCategory } from "../types";
import { CATEGORY_SUMMARIES } from "../constants";

// Initialize with process.env.API_KEY directly as required by guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Internal interface for the AI's JSON output (we removed summary)
interface GeminiRawResponse {
  category: string;
  reasoning: string;
  traits: string[];
}

export const categorizeUser = async (answers: UserAnswers): Promise<DuckResult> => {
  const prompt = `
    Analyze the following questionnaire answers and categorize the user into ONE of these 5 duck-themed categories:
    1. Tide Setters: Leaders, entrepreneurial, self-centered, ambitious.
    2. Canadian Geese: Abrasive, upfront, bold, judging.
    3. Golden Beak Society: Very social, outgoing, friendly, charismatic.
    4. Wading Waddlers: Quiet, introverted, keeps to themselves, peaceful.
    5. Mischievous Mallards: Playful, clever, unpredictable troublemakers.

    User Answers:
    - MBTI: ${answers.mbti || 'Not provided'}
    - First Song in Mind: ${answers.firstSong}
    - Meme Choice: ${answers.memeResonance}
    - Favorite Movie: ${answers.favoriteMovie}
    - Birthday: ${answers.birthday}
    - Duck Activity preference: ${answers.duckActivity}
    - Food Strategy preference: ${answers.foodStrategy}
    - Self-described traits: ${answers.personalityTraits}

    Return a JSON response with the category name, detailed reasoning, and a list of 3 short spirit traits.
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
            category: { type: Type.STRING, description: "The specific duck category name selected." },
            reasoning: { type: Type.STRING, description: "Detailed explanation linking their answers to the category." },
            traits: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3 short adjective traits." }
          },
          required: ["category", "reasoning", "traits"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("The duck oracle remained silent.");
    }
    const data: GeminiRawResponse = JSON.parse(text);

    // Map AI string response to the DuckCategory enum
    let category = DuckCategory.WADING_WADDLERS;
    const catName = data.category.toLowerCase();

    if (catName.includes("tide")) category = DuckCategory.TIDE_SETTERS;
    else if (catName.includes("geese") || catName.includes("goose")) category = DuckCategory.CANADIAN_GEESE;
    else if (catName.includes("golden")) category = DuckCategory.GOLDEN_BEAK;
    else if (catName.includes("mischievous") || catName.includes("mallard")) category = DuckCategory.MISCHIEVOUS_MALLARDS;
    else if (catName.includes("wading") || catName.includes("waddler")) category = DuckCategory.WADING_WADDLERS;

    return {
      category,
      // USE THE STATIC SUMMARY FROM CONSTANTS BASED ON THE CATEGORY
      summary: CATEGORY_SUMMARIES[category],
      detailedReasoning: data.reasoning,
      spiritAnimalTraits: data.traits,
      vibeColor: "" // Handled by UI constants
    };
  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error("Failed to consult the Oracle of the Pond.");
  }
};
