import "dotenv/config";

export default {
  expo: {
    name: "CookingCompanionMobile",
    slug: "cookingCompanionMobile",
    version: "1.0.0",
    extra: {
      GEMINI_API_URL: process.env.GEMINI_API_URL,
      GEMINI_API_KEY: process.env.GEMINI_API_KEY,
      eas: {
        projectId: "2ace71ce-a292-42ce-a49f-6a3b0a107319",
      },
    },
    android: {
      package: "com.dartorange.cooking_companion",
    },
  },
};
