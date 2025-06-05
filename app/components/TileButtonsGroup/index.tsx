import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export interface ButtonOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

interface Props {
  options: ButtonOption[];
  selected: string | string[] | null;
  onSelect: (value: string) => void;
}

export default function TileButtonGroup({
  options,
  selected,
  onSelect,
}: Props) {
  return (
    <View style={styles.container}>
      {options.map((option) => {
        const isSelected = Array.isArray(selected)
          ? selected.includes(option.value)
          : selected === option.value;

        return (
          <Pressable
            key={option.value}
            onPress={() => onSelect(option.value)}
            style={[styles.tile, isSelected && styles.tileSelected]}
          >
            {option.icon && <View style={styles.icon}>{option.icon}</View>}

            <Text style={[styles.text, isSelected && styles.textSelected]}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "space-between",
    marginBottom: 16,
  },
  tile: {
    flexGrow: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    alignItems: "center",
    minWidth: "45%",
  },
  tileSelected: {
    backgroundColor: "#fff7ed",
    borderColor: "#f97316",
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
  textSelected: {
    color: "#f97316",
    fontWeight: "bold",
  },
  icon: {
    marginBottom: 4,
  },
});
