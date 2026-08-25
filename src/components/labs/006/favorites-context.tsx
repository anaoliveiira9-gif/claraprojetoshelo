"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type FavoritesContextValue = {
  favoriteIds: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

/**
 * Session-only favorites store (no persistence) shared across the NOVA
 * app-shell routes via React Context.
 */
export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  const toggleFavorite = useCallback((id: string) => {
    setFavoriteIds((current) =>
      current.includes(id)
        ? current.filter((favId) => favId !== id)
        : [...current, id],
    );
  }, []);

  const isFavorite = useCallback(
    (id: string) => favoriteIds.includes(id),
    [favoriteIds],
  );

  const value = useMemo(
    () => ({ favoriteIds, isFavorite, toggleFavorite }),
    [favoriteIds, isFavorite, toggleFavorite],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

/** Returns null when rendered outside FavoritesProvider (e.g. in the standalone showcase). */
export function useFavoritesOptional() {
  return useContext(FavoritesContext);
}
