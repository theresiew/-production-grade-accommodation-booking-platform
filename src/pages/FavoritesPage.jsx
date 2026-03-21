import { ListingCard } from '@/components/listings/ListingCard.jsx';
import { ErrorState } from '@/components/ui/ErrorState.jsx';
import { useFavorites } from '@/context/FavoritesContext.jsx';

export function FavoritesPage() {
  const { favoriteIds, favoriteListings } = useFavorites();

  if (favoriteIds.length === 0) {
    return <ErrorState title="No favorites yet" message="Add favorites from the listings feed." />;
  }

  return (
    <div className="mx-auto max-w-[1000px]">
      <h1 className="mb-5 mt-0 text-3xl font-semibold">Saved Favorites</h1>
      <section className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
        {favoriteListings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </section>
    </div>
  );
}
