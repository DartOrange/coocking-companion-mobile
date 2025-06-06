export interface RecipePreferences {
  cost: "cheap" | "expensive";
  time: "quick" | "long";
  difficulty: "easy" | "medium" | "hard";
  duration: "shortest" | "hour" | "day";
  dishType: "main" | "soup" | "salad" | "dessert" | "drink";
}

export interface Recipe {
  id: number;
  name: string;
  image: string;
  time: string;
  cost: string;
  costPerServing: number;
  locationCurrency: string;
  locationCurrencySymbol: string;
  difficulty: string;
  servings: number;
  tags: string[];
  ingredients: {
    name: string;
    amount: string;
    price: number;
    store: string;
  }[];
  detailedInstructions: {
    stepNumber: number,
    description: string,
  }[];
  nutrition: {
    calories: number;
    carbs: number;
    protein: number;
    fat: number;
  };
}

interface PreferenceOption {
  label: string;
  value: string;
  icon: React.ReactNode;
}

export interface Preference {
  label: string;
  labelIcon: React.ReactNode;
  options: PreferenceOption[];
  selectedKey: "cost" | "time" | "difficulty" | "duration" | "dishType";
}
