import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { searchProperties } from '../services/api'
import ListingCard from '../components/ui/ListingCard'
import Loader from '../components/ui/Loader'
import ErrorState from '../components/ui/ErrorState'

function Home() {
  const [searchParams] = useSearchParams()
  const search = searchParams.get('search')

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['listings', search],
    queryFn: () => searchProperties(),
    staleTime: 1000 * 60 * 5,
  })

  const listings = data?.data?.list || []

  if (isLoading) return <Loader />
  if (isError) return <ErrorState message={error?.message} />

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {search ? `Results for "${search}"` : 'Explore Stays'}
      </h1>

      {listings.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          <p className="text-lg">No listings found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home