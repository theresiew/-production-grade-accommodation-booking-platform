import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { readStorage, writeStorage } from '@/utils/storage.js';

const defaultFilters = {
  placeId: 'ChIJ7cv00DwsDogRAMDACa2m4K8',
  locationLabel: 'Chicago',
  minRating: 0,
  query: ''
};

const FiltersContext = createContext(undefined);

export function FiltersProvider({ children }) {
  const [filters, setFilters] = useState(() => readStorage('filters.state', defaultFilters));

  useEffect(() => {
    writeStorage('filters.state', filters);
  }, [filters]);

  const value = useMemo(
    () => ({
      filters,
      updateFilters: (next) => setFilters((prev) => ({ ...prev, ...next })),
      resetFilters: () => setFilters(defaultFilters)
    }),
    [filters]
  );

  return <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>;
}

export function useFilters() {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error('useFilters must be used within FiltersProvider');
  }
  return context;
}