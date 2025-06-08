import { useState, useEffect, useCallback } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState<any[]>([]);

  const updateLocalStorage = (updatedFavorites: any[]) => {
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  const refetchFavorites = useCallback(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    refetchFavorites();
  }, [refetchFavorites]);

  const addFavorite = (movie: any) => {
    const exists = favorites.some((m) => m.imdbID === movie.imdbID);
    if (!exists) {
      const updated = [...favorites, movie];
      updateLocalStorage(updated);
    }
  };

  const removeFavorite = (imdbID: string) => {
    const updated = favorites.filter((m) => m.imdbID !== imdbID);
    updateLocalStorage(updated);
  };

  return { favorites, addFavorite, removeFavorite, updateLocalStorage };
}
