import { ToastProvider } from "@/contexts/ToastContext";
import { Stack } from "expo-router";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { RecipesProvider } from "./contexts/RecipesContext";

export default function RootLayout() {
  return (
    <ToastProvider>
      <FavoritesProvider>
        <RecipesProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
              name="recipes"
              options={{ title: "Рецепты", headerShown: true }}
            />
            <Stack.Screen
              name="favorites"
              options={{ title: "Избранные Рецепты", headerShown: true }}
            />
          </Stack>
        </RecipesProvider>
      </FavoritesProvider>
    </ToastProvider>
  );
}
