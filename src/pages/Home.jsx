import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { searchProperties } from '../services/api'
import ListingCard from '../components/ui/ListingCard'
import Loader from '../components/ui/Loader'
import ErrorState from '../components/ui/ErrorState'
import FilterPanel from '../components/layout/FilterPanel'
import { useState } from 'react'

function Home() {
  const [searchParams] = useSearchParams()
  const search = searchParams.get('search')
  const [filters, setFilters] = useState({ category: 'All', priceRange: 1000, minRating: 0 })

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['listings', search],
    queryFn: () => searchProperties(),
    staleTime: 1000 * 60 * 5,
  })

  const allListings = data?.data?.list || []

  const filtered = allListings.filter((listing) => {
    const price = parseFloat(
      listing?.pricingQuote?.structuredStayDisplayPrice?.primaryLine?.price?.replace(/[^0-9.]/g, '')
    )
    const rating = listing?.avgRating || 0
    const withinPrice = isNaN(price) || price <= filters.priceRange
    const withinRating = rating >= filters.minRating
    return withinPrice && withinRating
  })

  if (isError) return <ErrorState message={error?.message} />

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex gap-6">

      {/* Sidebar Filter */}
      <aside className="hidden md:block w-64 shrink-0">
        <FilterPanel onFilterChange={setFilters} filters={filters} />
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          {search ? `Results for "${search}"` : 'Explore Stays'}
        </h1>

        {isLoading ? (
          <Loader />
        ) : filtered.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-lg">No listings match your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home