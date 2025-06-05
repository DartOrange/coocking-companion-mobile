import React from "react";
import { StyleSheet, Text, View } from "react-native";

import TileButtonGroup, { ButtonOption } from "../TileButtonsGroup";

interface Props {
  labelIcon?: React.ReactNode;
  label: string | null;
  options: ButtonOption[];
  selected: string | string[] | null;
  onSelect: (value: string) => void;
}

export default function ControlGroup({
  labelIcon,
  label,
  options,
  selected,
  onSelect,
}: Props) {
  return (
    <View>
      <View style={styles.container}>
        {labelIcon}
        <Text>{label}</Text>
      </View>
      <TileButtonGroup
        options={options}
        selected={selected}
        onSelect={onSelect}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
});
