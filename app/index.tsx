import {
  Entypo,
  FontAwesome5,
  FontAwesome6,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { useState } from "react";
import ControlGroup from "./components/ControlGroup";
import { RecipePreferences } from "./lib/types";
import { COLORS } from "./theme/colors";

export default function App() {
  const [preferences, setPreferences] = useState<RecipePreferences>({
    cost: "cheap",
    time: "quick",
    difficulty: "easy",
    duration: "shortest",
    dishTypes: [],
  });

  const handlePreferenceChange = (
    key: keyof RecipePreferences,
    value: string
  ) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleDishTypeToggle = (
    dishType: "main" | "soup" | "salad" | "dessert" | "drink"
  ) => {
    setPreferences((prev) => ({
      ...prev,
      dishTypes: prev.dishTypes.includes(dishType)
        ? prev.dishTypes.filter((type) => type !== dishType)
        : [...prev.dishTypes, dishType],
    }));
  };

  return (
    <ScrollView>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 32,
          paddingHorizontal: 24,
          width: "100%",
          backgroundColor: "#FF6B35",
        }}
      >
        <MaterialCommunityIcons
          name="silverware-fork-knife"
          size={64}
          color="white"
        />
        <Text style={{ color: "white", marginTop: 6, fontSize: 24 }}>
          КулинарИИ
        </Text>
        <Text style={{ color: "white", fontSize: 24 }}>
          Умный помощник
        </Text>
      </View>

      <View style={{ padding: 16 }}>
        <ControlGroup
          label="Бюджет"
          labelIcon={
            <FontAwesome5 name="coins" size={24} color={COLORS.primary} />
          }
          options={[
            {
              label: "Эконом",
              value: "cheap",
              icon: (
                <MaterialCommunityIcons
                  name="hand-coin"
                  size={24}
                  color={COLORS.primary}
                />
              ),
            },
            {
              label: "Премиум",
              value: "expensive",
              icon: (
                <MaterialIcons
                  name="workspace-premium"
                  size={24}
                  color={COLORS.primary}
                />
              ),
            },
          ]}
          selected={preferences.cost}
          onSelect={(value) => handlePreferenceChange("cost", value)}
        />

        <ControlGroup
          label="Время готовки"
          labelIcon={
            <Entypo name="time-slot" size={24} color={COLORS.primary} />
          }
          options={[
            {
              label: "Быстро",
              value: "quick",
              icon: (
                <MaterialCommunityIcons
                  name="clock-fast"
                  size={24}
                  color={COLORS.primary}
                />
              ),
            },
            {
              label: "Не спешу",
              value: "long",
              icon: (
                <MaterialIcons
                  name="slow-motion-video"
                  size={24}
                  color={COLORS.primary}
                />
              ),
            },
          ]}
          selected={preferences.time}
          onSelect={(value) => handlePreferenceChange("time", value)}
        />

        <ControlGroup
          label="Сложность"
          labelIcon={
            <FontAwesome6
              name="hands-bubbles"
              size={24}
              color={COLORS.primary}
            />
          }
          options={[
            {
              label: "Легко",
              value: "easy",
              icon: <Entypo name="flower" size={24} color={COLORS.primary} />,
            },
            {
              label: "Средне",
              value: "medium",
              icon: (
                <MaterialCommunityIcons
                  name="speedometer-medium"
                  size={24}
                  color={COLORS.primary}
                />
              ),
            },
            {
              label: "Сложно",
              value: "hard",
              icon: (
                <FontAwesome6
                  name="gauge-simple-high"
                  size={24}
                  color={COLORS.primary}
                />
              ),
            },
          ]}
          selected={preferences.difficulty}
          onSelect={(value) => handlePreferenceChange("difficulty", value)}
        />

        <ControlGroup
          label="Длительность"
          labelIcon={
            <MaterialCommunityIcons
              name="timer-sand-empty"
              size={24}
              color={COLORS.primary}
            />
          }
          options={[
            {
              label: "До 30 минут",
              value: "shortest",
              icon: (
                <MaterialCommunityIcons
                  name="clock-time-one-outline"
                  size={24}
                  color={COLORS.primary}
                />
              ),
            },
            {
              label: "1-2 часа",
              value: "hour",
              icon: (
                <MaterialCommunityIcons
                  name="clock-time-four-outline"
                  size={24}
                  color={COLORS.primary}
                />
              ),
            },
            {
              label: "Более дня",
              value: "day",
              icon: (
                <MaterialCommunityIcons
                  name="calendar-blank"
                  size={24}
                  color={COLORS.primary}
                />
              ),
            },
          ]}
          selected={preferences.duration}
          onSelect={(value) => handlePreferenceChange("duration", value)}
        />

        <ControlGroup
          label="Тип блюда (можно выбрать несколько)"
          labelIcon={
            <MaterialIcons name="food-bank" size={24} color={COLORS.primary} />
          }
          options={[
            {
              label: "Основное",
              value: "main",
              icon: (
                <MaterialCommunityIcons
                  name="food-turkey"
                  size={24}
                  color={COLORS.primary}
                />
              ),
            },
            {
              label: "Суп",
              value: "soup",
              icon: (
                <MaterialCommunityIcons
                  name="food-takeout-box"
                  size={24}
                  color={COLORS.primary}
                />
              ),
            },
            {
              label: "Салат",
              value: "salad",
              icon: (
                <FontAwesome6
                  name="bowl-food"
                  size={24}
                  color={COLORS.primary}
                />
              ),
            },
            {
              label: "Десерт",
              value: "dessert",
              icon: (
                <MaterialCommunityIcons
                  name="food-croissant"
                  size={24}
                  color={COLORS.primary}
                />
              ),
            },
            {
              label: "Напиток",
              value: "drink",
              icon: (
                <MaterialIcons
                  name="emoji-food-beverage"
                  size={24}
                  color={COLORS.primary}
                />
              ),
            },
          ]}
          selected={preferences.dishTypes}
          onSelect={(value: any) => handleDishTypeToggle(value)}
        />

        <Pressable
          style={({ pressed }) => [
            {
              transform: [{ scale: pressed ? 1.05 : 1 }],
              backgroundColor: pressed ? `${COLORS.primary}80` : COLORS.primary,
            },
            styles.button,
          ]}
        >
          <Text style={styles.buttonText}>Найти рецепты</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    minWidth: "45%",
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primaryLight,
  },
});
