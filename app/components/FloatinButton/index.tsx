import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const FloatingButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Предыдущий результат</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    top: 40,
    right: 20,
    padding: 16,
    borderRadius: 25,
    backgroundColor: "#ffffff98",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    fontSize: 16,
    color: "black",
  },
});

export default FloatingButton;
