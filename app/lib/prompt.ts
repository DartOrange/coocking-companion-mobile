import { Recipe, RecipePreferences } from './types';

interface Props {
  language: string,
  userLocation: string,
  preferences: RecipePreferences;
  recipes: Recipe[],
  favorites: Recipe[],
}

export const cookingRecipesGeminiPrompt = ({
  language,
  userLocation,
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

  Response should not contain this recipes: ${recipes.map((recipe) => recipe.name).join(", ")}, ${favorites.map((favorite) => favorite.name).join(", ")}.

  Return ONLY a JSON array of recipes with this exact structure:
  [
    {
      "name": "Recipe Name",
      "image": "https://images.unsplash.com/photo-[appropriate-food-photo]",
      "time": "25 min",
      "cost": 120,
      "costPerServing": 120,
      "locationCurrency": "USD",
      "locationCurrencySymbol": "$",
      "difficulty": "Easy",
      "servings": 2,
      "tags": ["Italian", "Vegetarian"],
      "ingredients": [
        {"name": "Ingredient", "amount": "200g", "price": 45, "store": "Amazon"}
      ],
      "detailedInstructions": [
        { stepNumber: 1, description: "Cook 15 min" }
      ],
      "nutrition": {"calories": 285, "carbs": 45, "protein": 8, "fat": 12}
    }
  ]

  Use realistic ${userLocation} ingredient names, prices in ${userLocation} currency, and detailed cooking instructions in ${language} language.

  Response in the JSON array should be only in the ${language} language.
  Return only the JSON array, no additional text.
`;