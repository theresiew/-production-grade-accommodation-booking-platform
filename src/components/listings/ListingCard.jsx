import { Link } from 'react-router-dom';
import { useFavorites } from '@/context/FavoritesContext.jsx';

export function ListingCard({ listing }) {
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <article className="flex flex-col overflow-hidden rounded-[14px] border border-[#e8dfd0] bg-white">
      <img className="h-40 w-full object-cover" src={listing.image} alt={listing.title} loading="lazy" />
      <div className="flex flex-col gap-1.5 p-3">
        <h3 className="m-0 text-base font-semibold">{listing.title}</h3>
        <p className="m-0 text-[#5f6c7b]">{listing.location}</p>
        <p className="m-0 text-[#5f6c7b]">
          {listing.rating.toFixed(1)} star rating · {listing.pricePerNight} {listing.currency} / night
        </p>
      </div>
      <div className="mt-auto flex gap-2 p-3">
        <button type="button" onClick={() => toggleFavorite(listing)}>
          {isFavorite(listing.id) ? 'Unfavorite' : 'Favorite'}
        </button>
        <Link
          to={`/listing/${listing.id}`}
          className="flex-1 rounded-[10px] border border-[#e8dfd0] px-3 py-2 text-center text-sm"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
