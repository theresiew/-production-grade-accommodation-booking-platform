import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SidebarFilters } from '@/components/layout/SidebarFilters.jsx';
import { ListingCard } from '@/components/listings/ListingCard.jsx';
import { ErrorState } from '@/components/ui/ErrorState.jsx';
import { Loader } from '@/components/ui/Loader.jsx';
import { useFilters } from '@/context/FiltersContext.jsx';
import { useListingsQuery } from '@/hooks/useListingsQuery.js';
import { toUserErrorMessage } from '@/services/api.js';

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
    content = (
      <ErrorState
        message={toUserErrorMessage(listingsQuery.error)}
        actionLabel="Retry"
        onAction={() => listingsQuery.refetch()}
      />
    );
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