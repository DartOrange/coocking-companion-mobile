import { useRouter } from "expo-router";
import { FlatList } from "react-native";
import { RecipeTile } from "./components/RecipeTile";
import { useFavorites } from "./contexts/FavoritesContext";

export default function Favorites() {
  const router = useRouter();

  const { favorites } = useFavorites();

  return (
    <FlatList
      data={favorites}
      renderItem={({ item }) => (
        <RecipeTile
          isFavorite
          item={item}
          onPress={() =>
            router.push({
              pathname: `/recipe/${item.id}`,
              params: { isFavorite: "true" },
            })
          }
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      columnWrapperStyle={{
        justifyContent: "space-between",
        paddingHorizontal: 10,
      }}
      contentContainerStyle={{ paddingVertical: 16 }}
    />
  );
}