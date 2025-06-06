import LoadingString from '@/components/LoadingScreen';
import { AIMessageProps, useAIRecipesGenerator } from "@/hooks/useAIRecipesGenerator";
import { Recipe } from "@/lib/types";
import { COLORS } from "@/theme/colors";
import React, { createContext, useContext } from "react";
import { Text, View } from "react-native";

interface RecipesContextValue {
  recipes: Recipe[];
  sendMessage: (props: AIMessageProps) => Promise<void>;
  updateRecipes: () => void;
  loading: boolean;
  error: string | null;
}

const RecipesContext = createContext<RecipesContextValue | undefined>(
  undefined
);

export const RecipesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { recipes, sendMessage, updateRecipes, loading, error } =
    useAIRecipesGenerator();

  return (
    <RecipesContext.Provider
      value={{ recipes, sendMessage, updateRecipes, loading, error }}
    >
      {loading && (
        <LoadingString
          label={
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  color: COLORS.primary,
                }}
              >
                Готовим рецепты...
              </Text>
              <Text
                style={{ fontSize: 16, marginTop: 16, color: COLORS.primary }}
              >
                ИИ подбирает идеальные блюда для вас
              </Text>
            </View>
          }
        />
      )}
      {children}
    </RecipesContext.Provider>
  );
};

export const useRecipes = () => {
  const context = useContext(RecipesContext);
  if (!context) {
    throw new Error("useRecipes must be used within a RecipesProvider");
  }
  return context;
};
