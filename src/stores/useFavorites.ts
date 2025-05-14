import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface FavoriteCity {
  name: string;
  country: string;
}

interface FavoritesState {
  favorites: FavoriteCity[];
  addFavorite: (city: FavoriteCity) => void;
  removeFavorite: (cityName: string) => void;
}

export const useFavorites = create<FavoritesState>()(
  persist(
    (set) => ({
      favorites: [],
      addFavorite: (city) =>
        set((state) => ({ favorites: [...state.favorites, city] })),
      removeFavorite: (cityName) =>
        set((state) => ({
          favorites: state.favorites.filter((f) => f.name !== cityName),
        })),
    }),
    { name: "favorites-storage" }
  )
);
