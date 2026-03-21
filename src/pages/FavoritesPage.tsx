import { useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { ListingCard } from '@/components/listings/ListingCard';
import { ErrorState } from '@/components/ui/ErrorState';
import { useFavorites } from '@/context/FavoritesContext';
import { Listing } from '@/types';

export function FavoritesPage() {
  const queryClient = useQueryClient();
  const { favoriteIds } = useFavorites();

  const cachedListings = queryClient.getQueriesData<Listing[]>({ queryKey: ['listings'] });

  const favoriteListings = useMemo(() => {
    const merged = cachedListings.flatMap(([, listings]) => listings || []);
    const uniqueById = new Map(merged.map((listing) => [listing.id, listing]));
    return favoriteIds.map((id) => uniqueById.get(id)).filter(Boolean) as Listing[];
  }, [cachedListings, favoriteIds]);

  if (favoriteIds.length === 0) {
    return <ErrorState title="No favorites yet" message="Add favorites from the listings feed." />;
  }

  if (favoriteListings.length === 0) {
    return (
      <ErrorState
        title="Favorites need refresh"
        message="Open Home to load listings, then your saved favorites will show here."
      />
    );
  }

  return (
    <div className="page simple-page">
      <h1>Saved Favorites</h1>
      <section className="listing-grid">
        {favoriteListings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </section>
    </div>
  );
}