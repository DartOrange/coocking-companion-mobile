import { useFavorites } from "@/contexts/FavoritesContext";
import { useToast } from "@/contexts/ToastContext";
import { cookingRecipesGeminiPrompt } from "@/lib/prompt";
import { Recipe, RecipePreferences } from "@/lib/types";
import Constants from "expo-constants";
import { usePathname, useRouter } from "expo-router";
import { useState } from "react";

const GEMINI_API_KEY = Constants.expoConfig?.extra?.GEMINI_API_KEY;
const GEMINI_API_URL = Constants.expoConfig?.extra?.GEMINI_API_URL;

export interface AIMessageProps {
  language: string;
  userLocation: string;
  preferences: RecipePreferences;
}

export const useAIRecipesGenerator = () => {
  const toast = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const { favorites } = useFavorites();

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const [messageProps, setMessageProps] = useState<any>(undefined);

  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const sendMessage = async ({
    language,
    userLocation,
    preferences,
  }: AIMessageProps) => {
    setLoading(true);
    setError(null);
    setRecipes([]);
    setMessageProps({
      language,
      userLocation,
      preferences,
    });

    try {
      const res = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: cookingRecipesGeminiPrompt({
                    language,
                    userLocation,
                    preferences,
                    recipes,
                    favorites,
                  }),
                },
              ],
            },
          ],
        }),
      });

      const data = await res.json();

      if (res.ok) {
        const generatedText =
          data.candidates?.[0]?.content?.parts?.[0]?.text || "";
        setResponse(generatedText);

        try {
          const match = generatedText.match(/\[\s*\{[\s\S]*\}\s*\]/);

          const recipes = JSON.parse(match[0]);
          setRecipes(
            recipes.map((item: Recipe, index: number) => ({
              ...item,
              id: index + 1,
            }))
          );
          if (pathname !== "/recipes")
            router.push("/recipes");
        } catch (error) {
          console.error(error);
          toast.showToast({
            type: "error",
            message: "No valid recipes from AI",
          });
        }
      } else {
        toast.showToast({
          type: "error",
          message: String(data.error?.message || "Request failed"),
        });
      }
    } catch (err: any) {
      toast.showToast({
        type: "error",
        message: String(err.message),
      });
      setError(err.message);
      setResponse(null);
    } finally {
      setLoading(false);
    }
  };

  const updateRecipes = () => sendMessage(messageProps);

  return { sendMessage, updateRecipes, response, loading, error, recipes };
};
