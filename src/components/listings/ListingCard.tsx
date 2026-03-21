import { Link } from 'react-router-dom';
import { useFavorites } from '@/context/FavoritesContext';
import { Listing } from '@/types';

interface ListingCardProps {
  listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <article className="listing-card">
      <img src={listing.image} alt={listing.title} loading="lazy" />
      <div className="listing-body">
        <h3>{listing.title}</h3>
        <p>{listing.location}</p>
        <p>
          {listing.rating.toFixed(1)} star rating · {listing.pricePerNight} {listing.currency} / night
        </p>
      </div>
      <div className="listing-actions">
        <button type="button" onClick={() => toggleFavorite(listing)}>
          {isFavorite(listing.id) ? 'Unfavorite' : 'Favorite'}
        </button>
        <Link to={`/listing/${listing.id}`}>View Details</Link>
      </div>
    </article>
  );
}