import { CategoryModel } from "./category";

export type MealModel = {
  id: string;
  categoryIds: string[];
  title: string;

  affordability: string; // hoặc union bên dưới
  complexity: string; // hoặc union bên dưới

  imageUrl: string;
  duration: number;

  ingredients: string[];
  steps: string[];

  isGlutenFree: boolean;
  isVegan: boolean;
  isVegetarian: boolean;
  isLactoseFree: boolean;
};

export type MealDataModel = MealModel & {
  categories: CategoryModel[];
};
