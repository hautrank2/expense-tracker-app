import React, { createContext, useContext, useMemo, useState } from "react";

type FavoritesContextType = {
  favoriteMealIds: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const FavoritesProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [favoriteMealIds, setFavoriteMealIds] = useState<string[]>([]);

  const addFavorite = (id: string) => {
    setFavoriteMealIds((prev) => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });
  };

  const removeFavorite = (id: string) => {
    setFavoriteMealIds((prev) => prev.filter((mealId) => mealId !== id));
  };

  const toggleFavorite = (id: string) => {
    setFavoriteMealIds((prev) =>
      prev.includes(id)
        ? prev.filter((mealId) => mealId !== id)
        : [...prev, id],
    );
  };

  const isFavorite = (id: string) => {
    return favoriteMealIds.includes(id);
  };

  const value = useMemo(
    () => ({
      favoriteMealIds,
      addFavorite,
      removeFavorite,
      toggleFavorite,
      isFavorite,
    }),
    [favoriteMealIds],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used inside FavoritesProvider");
  }
  return context;
};
