import { Link, useParams } from 'react-router-dom';
import { BookingForm } from '@/components/forms/BookingForm.jsx';
import { ErrorState } from '@/components/ui/ErrorState.jsx';
import { Loader } from '@/components/ui/Loader.jsx';
import { useFilters } from '@/context/FiltersContext.jsx';
import { useListingDetailsQuery } from '@/hooks/useListingsQuery.js';

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
    <div className="grid gap-4 xl:grid-cols-[2fr_2fr_1.2fr]">
      <div>
        <img className="min-h-[360px] w-full rounded-2xl object-cover" src={listing.image} alt={listing.title} />
      </div>

      <div className="rounded-2xl border border-[#e8dfd0] bg-[#fffdf8] p-4 shadow-[0_8px_24px_rgba(40,44,52,0.06)]">
        <Link to="/" className="font-semibold text-[#b0413e]">
          Back to feed
        </Link>
        <h1 className="mb-3 mt-4 text-3xl font-semibold">{listing.title}</h1>
        <p className="m-0 text-[#5f6c7b]">
          {listing.location} {'\u00b7'} {listing.rating.toFixed(1)} stars {'\u00b7'} Hosted by {listing.hostName}
        </p>
        <p className="mb-0 mt-4 leading-7">{listing.description}</p>

        <ul className="mt-4 grid list-none gap-1.5 p-0">
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
