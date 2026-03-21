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
      <section className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4" aria-live="polite">
        {listingsQuery.data.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </section>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
      <SidebarFilters />
      <section className="rounded-2xl border border-[#e8dfd0] bg-[#fffdf8] p-4 shadow-[0_8px_24px_rgba(40,44,52,0.06)]">
        <header className="flex flex-col justify-between gap-2 md:flex-row md:items-baseline">
          <h1 className="m-0 text-3xl font-semibold">Stays in {filters.locationLabel}</h1>
          <p className="m-0 text-[#5f6c7b]">{listingsQuery.data?.length ?? 0} properties</p>
        </header>
        {content}
      </section>
    </div>
  );
}
