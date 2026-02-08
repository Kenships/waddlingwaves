
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
  const skinDescriptions = AVATAR_ASSETS.skins.map(s => s.description).join(', ');
  const availableHats = AVATAR_ASSETS.hats.map(h => h.id).join(', ');
  const hatDescriptions = AVATAR_ASSETS.hats.map(h => h.description).join(', ');
  const availableWings = AVATAR_ASSETS.wings.map(s => s.id).join(', ');
  const wingDescriptions = AVATAR_ASSETS.wings.map(s => s.description).join(', ');
  const availableHandheldItems = AVATAR_ASSETS['handheld-items'].map(i => i.id).join(', ');
  const handheldItemsDescriptions = AVATAR_ASSETS['handheld-items'].map(i => i.description).join(', ');

  const prompt = `
    Analyze the following questionnaire answers and categorize the user into ONE of these 5 duck-themed categories:
    1. Tide Setters: Natural leaders who tend to take charge and would prefer to be in charge of the pond. Tide setters are driven and motivated to achieve their goals, even if it ends up ruffling a few feathers.
    2. Canadian Geese: Straight to the point ducks who don’t shy away from confrontation and will never be afraid to speak their mind. Canadian geese will point out even the harshest of truths to their fellow ducks when nobody else would.
    3. Golden Beak Society: The stars of the show, ducks of the Golden Beak Society tend to be the life of the pond. They thrive on interaction and energy, often becoming the glue that holds the flock together and will never miss a good duck get-together.
    4. Wading Waddlers: Self-reserved ducks who like to stay out of trouble and mind their own business. Wading Waddlers prefer the edges of the pond, and hold their closest duckpals very close to their hearts.
    5. Mischievous Mallards: The playful ducks that tend to act before they think (even if it ends a little chaotic). Mischievous mallards are never afraid to stir the pond just to have a good laugh, love them or hate them, they’re always good company. 

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

    AVATAR ITEM REGISTRY [id], [description]:
    - Skins: [${availableSkins}], [${skinDescriptions}]
    - Hats: [${availableHats}], [${hatDescriptions}]
    - Wings: [${availableWings}], [${wingDescriptions}]
    - Handheld Items: [${availableHandheldItems}], [${handheldItemsDescriptions}]

    RESPONSE REQUIREMENTS:
    1. Return a JSON response with the category, reasoning, 3 traits, and the chosen avatar item IDs. For the 3 traits also try not to repeat what the user stated in the question where they were asked about the personality traits as your generated answer.
    2. Write the "reasoning" as if addressing the user directly (use "you", not "the user").
    3. Include 2-3 clever duck puns (e.g., "quackers", "bill-iant", "feather-brained") in the reasoning.
    4. Ensure the skin ID perfectly matches the Zodiac logic above, however it should not have as much influence on the actual categorization into 1 of the 5 categories, the weighting for each question should be as follows from a scale of 1-5 (5 being the most weighted)
    5. Question 1: 0, Question 2: 1, Question 3: 1, Question 4: 3, Question 5: 3, Question 6: 2, Question 7: 2, Question 8: 2, Question 9: 3. 
    6. Possible mapping for answers to question 6 and 7 (make sure to stick to the weighting previously stated): 
      Tide Setters -> 6: Help out the weaker ducks. 7: Hunt for food yourself
      Canadian geese -> 6: Exploring new parts of the pond and beyond. 7: Walk straight up to another duck and take their bread without blinking
      Golden Beak Society -> 6: Play with humans that pass by. 7: Charm humans into handing over snacks
      Wading Waddlers -> 6: Chill on the banks. 7: Wait patiently for crumbs to drift my way like destiny intended
      Mischievous Mallards -> 6: Mess with other ducks. 7: Harass innocent bystanders for food.
  `;

  try {
    console.log(prompt)
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
