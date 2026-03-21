import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { Listing } from '@/types';
import { readStorage, writeStorage } from '@/utils/storage';

interface FavoritesContextValue {
  favoriteIds: string[];
  favoriteListings: Listing[];
  toggleFavorite: (listing: Listing) => void;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState(() => readStorage<string[]>('favorites.ids', []));
  const [favoriteMap, setFavoriteMap] = useState<Record<string, Listing>>(() =>
    readStorage<Record<string, Listing>>('favorites.map', {})
  );

  useEffect(() => {
    writeStorage('favorites.ids', favoriteIds);
  }, [favoriteIds]);

  useEffect(() => {
    writeStorage('favorites.map', favoriteMap);
  }, [favoriteMap]);

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favoriteIds,
      favoriteListings: favoriteIds.map((id) => favoriteMap[id]).filter(Boolean),
      toggleFavorite: (listing: Listing) => {
        setFavoriteIds((prev) => {
          const exists = prev.includes(listing.id);
          if (exists) {
            setFavoriteMap((current) => {
              const next = { ...current };
              delete next[listing.id];
              return next;
            });
            return prev.filter((id) => id !== listing.id);
          }
          setFavoriteMap((current) => ({ ...current, [listing.id]: listing }));
          return [...prev, listing.id];
        });
      },
      isFavorite: (id: string) => favoriteIds.includes(id)
    }),
    [favoriteIds, favoriteMap]
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
