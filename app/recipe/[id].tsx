import { useFavorites } from "@/contexts/FavoritesContext";
import { useRecipes } from "@/contexts/RecipesContext";
import { COLORS } from "@/theme/colors";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function RecipeDetailScreen() {
  const { id, isFavorite } = useLocalSearchParams();
  const navigation = useNavigation();

  const { recipes } = useRecipes();
  const { favorites, saveFavorite, removeFavorite } = useFavorites();

  const recipe =
    isFavorite === "true"
      ? favorites.find((favorite) => favorite.id === Number(id))
      : recipes.find((_) => _.id === Number(id));

  const isInFavorite = favorites.some(
    (favorite) => favorite.name === recipe?.name
  );

  const totalCost =
    recipe?.ingredients?.reduce((sum, i) => sum + i.price, 0) || 0;

  useEffect(() => {
    navigation.setOptions({ title: recipe?.name || "" });
  }, []);

  if (!recipe) {
    return (
      <View style={styles.centered}>
        <Text>Рецепт не найден</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Floating Top Button */}
      {!isInFavorite && (
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => saveFavorite(recipe)}
        >
          <Ionicons name="heart-outline" size={24} color="white" />
        </TouchableOpacity>
      )}

      <ScrollView contentContainerStyle={styles.centered}>
        <Image source={{ uri: recipe.image }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title}>{recipe.name}</Text>

          <View style={styles.metaRow}>
            <Text style={styles.meta}>⏱ {recipe.time}</Text>
            <Text style={styles.meta}>👥 {recipe.servings} порции</Text>
            <Text style={styles.meta}>
              💰 {recipe.cost} {recipe.locationCurrencySymbol} за порцию
            </Text>
          </View>

          <View style={styles.tagsRow}>
            <Text style={[styles.tag, styles.easy]}>{recipe.difficulty}</Text>
            {recipe.tags.map((tag, idx) => (
              <Text key={idx} style={styles.tag}>
                {tag}
              </Text>
            ))}
          </View>

          <View style={[styles.block, styles.ingredients]}>
            <View style={{ flexDirection: "row", gap: 8, marginBottom: 8 }}>
              <AntDesign name="shoppingcart" size={24} color={COLORS.primary} />
              <Text style={styles.blockTitle}>Ингредиенты</Text>
            </View>
            {recipe.ingredients.map((ing, idx) => (
              <View key={idx} style={styles.ingredientRow}>
                <Text>
                  {ing.name} — {ing.amount}
                </Text>
                <View>
                  <Text style={{ textAlign: "right" }}>
                    {ing.price}
                    {recipe.locationCurrencySymbol}
                  </Text>
                  <Text style={styles.store}>{ing.store}</Text>
                </View>
              </View>
            ))}
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Общая стоимость:</Text>
              <Text style={styles.totalPrice}>
                {totalCost}
                {recipe.locationCurrencySymbol}
              </Text>
            </View>
          </View>

          <View style={[styles.block, styles.recipe]}>
            <View style={{ flexDirection: "row", gap: 8, marginBottom: 8 }}>
              <Feather name="list" size={24} color={COLORS.primary} />
              <Text style={styles.blockTitle}>Пошаговый рецепт</Text>
            </View>
            {recipe.detailedInstructions.map((step, idx) => (
              <View key={idx} style={styles.stepRow}>
                <View style={styles.stepNumber}>
                  <Text>{step.stepNumber}</Text>
                </View>
                <Text>{step.description}</Text>
              </View>
            ))}
          </View>

          <View style={[styles.block, styles.nutritionBlock]}>
            <View style={{ flexDirection: "row", gap: 8, marginBottom: 8 }}>
              <MaterialCommunityIcons
                name="treasure-chest"
                size={24}
                color="#007a7a"
              />
              <Text style={styles.blockTitle}>
                Пищевая ценность (на порцию)
              </Text>
            </View>
            <View style={styles.nutritionRow}>
              <Text style={styles.nutrient}>
                {recipe.nutrition.calories} ккал
              </Text>
              <Text style={styles.nutrient}>
                {recipe.nutrition.carbs}г углеводы
              </Text>
              <Text style={styles.nutrient}>
                {recipe.nutrition.protein}г белки
              </Text>
              <Text style={styles.nutrient}>{recipe.nutrition.fat}г жиры</Text>
            </View>
          </View>
        </View>

        {isInFavorite && (
          <Pressable
            style={({ pressed }) => [
              {
                transform: [{ scale: pressed ? 1.05 : 1 }],
                backgroundColor: pressed ? `${COLORS.red}80` : COLORS.red,
              },
              styles.button,
            ]}
            onPress={() => removeFavorite(recipe.id)}
          >
            <Text style={styles.buttonText}>Удалить из избранного</Text>
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    marginTop: 100,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  floatingButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "#ff6600",
    borderRadius: 25,
    width: 50,
    height: 50,
    zIndex: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 200,
  },
  content: {
    padding: 16,
    width: "100%",
    maxWidth: 600,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 64,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  meta: {
    fontSize: 12,
    color: "#555",
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 16,
  },
  tag: {
    backgroundColor: "#e0f0ff",
    color: "#007acc",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    fontSize: 12,
  },
  easy: {
    backgroundColor: "#e0ffe0",
    color: "#008000",
  },
  block: {
    marginBottom: 20,
  },
  blockTitle: {
    fontWeight: "bold",
    marginBottom: 8,
    fontSize: 16,
  },
  ingredients: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: COLORS.primaryLight,
  },
  ingredientRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  store: {
    fontSize: 10,
    color: "#888",
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 8,
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalLabel: {
    fontWeight: "bold",
  },
  totalPrice: {
    color: "#ff6600",
    fontWeight: "bold",
  },
  recipe: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: COLORS.primaryLight,
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  stepNumber: {
    width: 24,
    height: 24,
    backgroundColor: "#ff6600",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  nutritionBlock: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#f0fdfa",
  },
  nutritionRow: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nutrient: {
    width: "48%",
    marginBottom: 8,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "#007a7a",
  },
  button: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    minWidth: "45%",
    marginBottom: 64,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primaryLight,
  },
});
