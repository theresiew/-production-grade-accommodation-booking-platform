import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { Listing } from '@/types';
import { readStorage, writeStorage } from '@/utils/storage';

interface FavoritesContextValue {
  favoriteIds: string[];
  toggleFavorite: (listing: Listing) => void;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState(() => readStorage<string[]>('favorites.ids', []));

  useEffect(() => {
    writeStorage('favorites.ids', favoriteIds);
  }, [favoriteIds]);

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favoriteIds,
      toggleFavorite: (listing: Listing) => {
        setFavoriteIds((prev) =>
          prev.includes(listing.id) ? prev.filter((id) => id !== listing.id) : [...prev, listing.id]
        );
      },
      isFavorite: (id: string) => favoriteIds.includes(id)
    }),
    [favoriteIds]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
}