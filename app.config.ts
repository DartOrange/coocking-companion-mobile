import * as dotenv from "dotenv";
dotenv.config();

export default {
  expo: {
    name: "CookingCompanionMobile",
    slug: "cookingCompanionMobile",
    version: "1.0.0",
    extra: {
      eas: {
        projectId: "2ace71ce-a292-42ce-a49f-6a3b0a107319",
      },
    },
    splash: {
      image: "./assets/images/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#f97316",
    },
    ios: {
      bundleIdentifier: "com.dartorange.cookingcompanion",
      supportsTablet: true,
    },
    android: {
      package: "com.dartorange.cookingcompanion",
      versionCode: 1,
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#f97316",
      },
      config: {
        usesCleartextTraffic: true,
      },
      permissions: ["INTERNET"],
    },
    runtimeVersion: {
      policy: "appVersion",
    },
    plugins: ["expo-localization"],
  },
};
