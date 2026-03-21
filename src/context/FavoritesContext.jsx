import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { readStorage, writeStorage } from '@/utils/storage.js';

const FavoritesContext = createContext(undefined);

export function FavoritesProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useState(() => readStorage('favorites.ids', []));
  const [favoriteMap, setFavoriteMap] = useState(() => readStorage('favorites.map', {}));

  useEffect(() => {
    writeStorage('favorites.ids', favoriteIds);
  }, [favoriteIds]);

  useEffect(() => {
    writeStorage('favorites.map', favoriteMap);
  }, [favoriteMap]);

  const value = useMemo(
    () => ({
      favoriteIds,
      favoriteListings: favoriteIds.map((id) => favoriteMap[id]).filter(Boolean),
      toggleFavorite: (listing) => {
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
      isFavorite: (id) => favoriteIds.includes(id)
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