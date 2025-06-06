import {
  Entypo,
  FontAwesome5,
  FontAwesome6,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { useRouter } from "expo-router";
import { useState } from "react";
import ControlGroup from "./components/ControlGroup";
import FloatingButton from "./components/FloatinButton";
import { useRecipes } from "./contexts/RecipesContext";
import { useIPLocation } from "./hooks/useIPLocation";
import { Preference, RecipePreferences } from "./lib/types";
import { COLORS } from "./theme/colors";

export default function App() {
  const router = useRouter();
  const recipes = useRecipes();
  const location = useIPLocation();

  const [preferences, setPreferences] = useState<RecipePreferences>({
    cost: "cheap",
    time: "quick",
    difficulty: "easy",
    duration: "shortest",
    dishType: "main",
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

  const onGenerateClick = () => {
    recipes.sendMessage({
      userLocation: `${location?.country}/${location?.city}`,
      language: "Russian",
      preferences,
    });
  };

  const onPreviousClick = () => {
    router.push("/recipes");
  };

  const preferencesList: Preference[] = [
    {
      label: "Бюджет",
      labelIcon: <FontAwesome5 name="coins" size={24} color={COLORS.primary} />,
      options: [
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
      ],
      selectedKey: "cost",
    },
    {
      label: "Время готовки",
      labelIcon: <Entypo name="time-slot" size={24} color={COLORS.primary} />,
      options: [
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
      ],
      selectedKey: "time",
    },
    {
      label: "Сложность",
      labelIcon: (
        <FontAwesome6 name="hands-bubbles" size={24} color={COLORS.primary} />
      ),
      options: [
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
      ],
      selectedKey: "difficulty",
    },
    {
      label: "Длительность",
      labelIcon: (
        <MaterialCommunityIcons
          name="timer-sand-empty"
          size={24}
          color={COLORS.primary}
        />
      ),
      options: [
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
      ],
      selectedKey: "duration",
    },
    {
      label: "Тип блюда",
      labelIcon: (
        <MaterialIcons name="food-bank" size={24} color={COLORS.primary} />
      ),
      options: [
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
            <FontAwesome6 name="bowl-food" size={24} color={COLORS.primary} />
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
      ],
      selectedKey: "dishType",
    },
  ];

  return (
    <View>
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
            CookingAI
          </Text>
          <Text style={{ color: "white", fontSize: 24 }}>Умный помощник</Text>
        </View>

        <View
          style={{
            padding: 16,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          {preferencesList.map((preference) => (
            <ControlGroup
              key={preference.label}
              {...preference}
              selected={preferences[preference.selectedKey]}
              onSelect={(value) =>
                handlePreferenceChange(preference.selectedKey, value)
              }
            />
          ))}

          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              gap: 8,
              marginTop: 32,
              marginBottom: 64,
            }}
          >
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
              onPress={() => router.push("/favorites")}
            >
              <Text style={styles.buttonText}>Избранные</Text>
            </Pressable>

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
              onPress={onGenerateClick}
            >
              <Text style={styles.buttonText}>Найти</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
      {Boolean(recipes.recipes.length) && (
        <FloatingButton onPress={onPreviousClick} />
      )}
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
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primaryLight,
  },
  flyingButton: {
    position: "static",
    top: 16,
    right: 16,
  },
});
