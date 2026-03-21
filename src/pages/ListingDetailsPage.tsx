import { Link, useParams } from 'react-router-dom';
import { BookingForm } from '@/components/forms/BookingForm';
import { ErrorState } from '@/components/ui/ErrorState';
import { Loader } from '@/components/ui/Loader';
import { useFilters } from '@/context/FiltersContext';
import { useListingDetailsQuery } from '@/hooks/useListingsQuery';

export function ListingDetailsPage() {
  const { id = '' } = useParams();
  const { filters } = useFilters();
  const detailsQuery = useListingDetailsQuery(id, filters);

  if (detailsQuery.isLoading) {
    return <Loader message="Loading property details..." />;
  }

  if (detailsQuery.isError) {
    return (
      <ErrorState
        message="Could not load this property. Return to listings and try again."
        actionLabel="Retry"
        onAction={() => detailsQuery.refetch()}
      />
    );
  }

  if (!detailsQuery.data) {
    return (
      <ErrorState
        title="Listing not found"
        message="The selected listing could not be located with current filters."
      />
    );
  }

  const listing = detailsQuery.data;

  return (
    <div className="page page-details">
      <div className="details-media">
        <img src={listing.image} alt={listing.title} />
      </div>

      <div className="details-main">
        <Link to="/" className="back-link">
          Back to feed
        </Link>
        <h1>{listing.title}</h1>
        <p>
          {listing.location} · {listing.rating.toFixed(1)} stars · Hosted by {listing.hostName}
        </p>
        <p>{listing.description}</p>

        <ul className="details-meta">
          <li>{listing.guests} guests</li>
          <li>{listing.bedrooms} bedrooms</li>
          <li>{listing.bathrooms} bathrooms</li>
          <li>
            {listing.pricePerNight} {listing.currency}/night
          </li>
        </ul>
      </div>

      <BookingForm listing={listing} />
    </div>
  );
}
