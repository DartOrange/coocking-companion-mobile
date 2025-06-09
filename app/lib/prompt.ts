import { Locale } from "expo-localization";
import { Recipe, RecipePreferences } from "./types";

interface Props {
  language: string;
  userLocationParams: Locale | null;
  preferences: RecipePreferences;
  recipes: Recipe[];
  favorites: Recipe[];
}

export const cookingRecipesGeminiPrompt = ({
  language,
  userLocationParams,
  preferences,
  recipes,
  favorites,
}: Props) => `
  In the ${language} language
  Generate 10 diverse recipes based on these preferences:
    - Cost: ${
      preferences.cost === "cheap" ? "Budget-friendly" : "Premium ingredients"
    }
    - Time: ${
      preferences.time === "quick" ? "Quick to prepare" : "Can take more time"
    }
    - Difficulty: ${preferences.difficulty}
    - Duration: ${
      preferences.duration === "shortest"
        ? "Under 30 minutes"
        : preferences.duration === "hour"
        ? "1-2 hours"
        : "More than a day"
    }
    - Dish type: ${preferences.dishType}.

  Response should not contain this recipes: ${recipes
    .map((recipe) => recipe.name)
    .join(", ")}, ${favorites.map((favorite) => favorite.name).join(", ")}.

  Return ONLY a JSON array of recipes with this exact structure:
  [
    {
      "name": "Название рецепта",
      "image": "https://images.unsplash.com/photo-[appropriate-food-photo]",
      "time": "25 мин",
      "cost": 120,
      "costPerServing": 120,
      "locationCurrency": "UAH",
      "locationCurrencySymbol": "₴",
      "difficulty": "Легко",
      "servings": 2,
      "tags": ["Итальянское", "Вегетарианское"],
      "ingredients": [
        {"name": "Ингридиент", "amount": "200g", "price": 45, "store": "Новус"}
      ],
      "detailedInstructions": [
        { stepNumber: 1, description: "Готовить 15 мин" }
      ],
      "nutrition": {"calories": 285, "carbs": 45, "protein": 8, "fat": 12}
    }
  ]

  Use realistic Ukraine ingredient names, prices in Ukraine currency, and detailed cooking instructions in Russian language.

  Response in the JSON array should be only in the Russian language.
  Return only the JSON array, no additional text.
`;
