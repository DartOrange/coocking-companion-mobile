export interface RecipePreferences {
  cost: 'cheap' | 'expensive';
  time: 'quick' | 'long';
  difficulty: 'easy' | 'medium' | 'hard';
  duration: 'shortest' | 'hour' | 'day';
  dishTypes: ('main' | 'soup' | 'salad' | 'dessert' | 'drink')[];
}

export interface Recipe {
  id: number;
  name: string;
  image: string;
  time: string;
  cost: string;
  costPerServing: number;
  difficulty: string;
  servings: number;
  tags: string[];
  ingredients: {
    name: string;
    amount: string;
    price: number;
    store: string;
  }[];
  instructions: string[];
  nutrition: {
    calories: number;
    carbs: number;
    protein: number;
    fat: number;
  };
}
