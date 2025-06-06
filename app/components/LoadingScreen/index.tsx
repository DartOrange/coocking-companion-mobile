import { COLORS } from "@/theme/colors";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  View
} from "react-native";

interface Props {
  label?: React.ReactNode | null;
}

export default function LoadingScreen({ label }: Props) {
  const spinValue = useRef(new Animated.Value(0)).current;
  const fadeValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    Animated.timing(fadeValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.spinner, { transform: [{ rotate: spin }] }]}
      />
      {label && (
        <Animated.Text style={[styles.text, { opacity: fadeValue }]}>
          {label}
        </Animated.Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 999,
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    height: "100%",
    width: "100%",
  },
  spinner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 5,
    borderTopColor: COLORS.primary,
    borderRightColor: "transparent",
    borderBottomColor: COLORS.primary,
    borderLeftColor: "transparent",
    marginBottom: 30,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    color: COLORS.primary,
  },
});
