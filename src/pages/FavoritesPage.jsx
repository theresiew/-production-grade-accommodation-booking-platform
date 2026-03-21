import { ListingCard } from '@/components/listings/ListingCard.jsx';
import { ErrorState } from '@/components/ui/ErrorState.jsx';
import { useFavorites } from '@/context/FavoritesContext.jsx';

export function FavoritesPage() {
  const { favoriteIds, favoriteListings } = useFavorites();

  if (favoriteIds.length === 0) {
    return <ErrorState title="No favorites yet" message="Add favorites from the listings feed." />;
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