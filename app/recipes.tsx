import { useRouter } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { RecipeTile } from "./components/RecipeTile";
import { useFavorites } from "./contexts/FavoritesContext";
import { useRecipes } from "./contexts/RecipesContext";
import { COLORS } from "./theme/colors";

export default function Recipes() {
  const router = useRouter();

  const { recipes, updateRecipes } = useRecipes();
  const { favorites, saveFavorite } = useFavorites();

  return (
    <View>
      <FlatList
        data={recipes}
        renderItem={({ item }) => (
          <RecipeTile
            item={item}
            onPress={() => router.push(`/recipe/${item.id}`)}
            onFavoriteToggle={() => saveFavorite(item)}
            isFavorite={favorites.some(
              (favorite) => favorite.name === item.name
            )}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          paddingHorizontal: 10,
        }}
        contentContainerStyle={{ paddingVertical: 16 }}
        ListFooterComponent={
          <View style={{ justifyContent: "center", alignItems: "center", marginTop: 32, marginBottom: 64 }}>
            <Pressable
              style={({ pressed }) => [
                {
                  transform: [{ scale: pressed ? 1.05 : 1 }],
                  backgroundColor: pressed
                    ? `${COLORS.primary}80`
                    : COLORS.primary,
                },
                styles.button,
              ]}
              onPress={updateRecipes}
            >
              <Text style={styles.buttonText}>Найти ещё варианты</Text>
            </Pressable>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    minWidth: "45%",
    maxWidth: "80%",
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primaryLight,
  },
});
