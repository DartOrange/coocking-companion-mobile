// components/RecipeTile.tsx
import { Recipe } from "@/lib/types";
import { COLORS } from "@/theme/colors";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  item: Recipe;
  onPress: () => void;
  isFavorite: boolean;
  onFavoriteToggle?: () => void;
}

export const RecipeTile: React.FC<Props> = ({
  item,
  onPress,
  isFavorite,
  onFavoriteToggle,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.row}>
          <Text style={styles.meta}>{item.time}</Text>
          <Text style={styles.meta}>
            {item.cost} {item.locationCurrencySymbol}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.difficulty, difficultyStyles[item.difficulty]]}>
            {item.difficulty}
          </Text>
          <TouchableOpacity onPress={onFavoriteToggle}>
            {isFavorite && <AntDesign name="heart" size={24} color={COLORS.primary} />}
            {!isFavorite && <AntDesign name="hearto" size={18} color="#aaa" />}
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "48%",
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 100,
  },
  infoContainer: {
    padding: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  meta: {
    fontSize: 12,
    color: "#555",
  },
  difficulty: {
    fontSize: 11,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    overflow: "hidden",
  },
});

const difficultyStyles: any = {
  Легко: { backgroundColor: "#dcfce7", color: "#15803d" },
  Средне: { backgroundColor: "#fef9c3", color: "#a16207" },
  Сложно: { backgroundColor: "#fee2e2", color: "#991b1b" },
};
