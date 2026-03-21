import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SidebarFilters } from '@/components/layout/SidebarFilters';
import { ListingCard } from '@/components/listings/ListingCard';
import { ErrorState } from '@/components/ui/ErrorState';
import { Loader } from '@/components/ui/Loader';
import { useFilters } from '@/context/FiltersContext';
import { useListingsQuery } from '@/hooks/useListingsQuery';
import { isRateLimitError } from '@/services/api';

export function HomePage() {
  const { filters, updateFilters } = useFilters();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const query = searchParams.get('query') || '';
    if (query !== filters.query) {
      updateFilters({ query });
    }
  }, [searchParams, filters.query, updateFilters]);

  const listingsQuery = useListingsQuery(filters);

  let content = null;

  if (listingsQuery.isLoading) {
    content = <Loader message="Loading accommodations..." />;
  } else if (listingsQuery.isError) {
    const message = isRateLimitError(listingsQuery.error)
      ? 'Rate limit reached. Please wait a moment and try again.'
      : 'Could not load listings at the moment. Please retry shortly.';
    content = <ErrorState message={message} />;
  } else if (!listingsQuery.data || listingsQuery.data.length === 0) {
    content = <ErrorState title="No listings found" message="Try changing search or filters." />;
  } else {
    content = (
      <section className="listing-grid" aria-live="polite">
        {listingsQuery.data.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </section>
    );
  }

  return (
    <div className="page page-home">
      <SidebarFilters />
      <section className="content-panel">
        <header className="content-header">
          <h1>Stays in {filters.locationLabel}</h1>
          <p>{listingsQuery.data?.length ?? 0} properties</p>
        </header>
        {content}
      </section>
    </div>
  );
}