import { Recipe } from "@/lib/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

interface RecipesContextValue {
  favorites: Recipe[];
  saveFavorite: (recipe: Recipe) => Promise<void>;
  removeFavorite: (recipeId: number) => Promise<void>;
}

const FavoritesContext = createContext<RecipesContextValue | undefined>(
  undefined
);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Recipe[]>([]);

  const saveFavorites = async (newFavorites: Recipe[]) => {
    try {
      const jsonValue = JSON.stringify(favorites);
      await AsyncStorage.setItem("@favorites", jsonValue);
    } catch (error) {
      console.error("Failed to save favorites:", error);
    }
  };

  const loadFavorites = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@favorites");
      setFavorites(jsonValue != null ? JSON.parse(jsonValue) : []);
    } catch (error) {
      console.error("Failed to load favorites:", error);
    }
  };

  const saveFavorite = async (recipe: Recipe) => {
    const newFavorites = [...favorites, recipe].map((recipe, idx) => ({
      ...recipe,
      id: idx + 1,
    }));

    setFavorites(newFavorites);
    await saveFavorites(newFavorites);
  };

  const removeFavorite = async (recipeId: number) => {
    const newFavorites = favorites
      .filter((recipe) => recipe.id !== recipeId)
      .map((recipe, idx) => ({
        ...recipe,
        id: idx + 1,
      }));

    setFavorites(newFavorites);
    await saveFavorites(newFavorites);
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  return (
    <FavoritesContext.Provider
      value={{ favorites, saveFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useRecipes must be used within a RecipesProvider");
  }
  return context;
};
