import { useFavorites } from '../context/FavoritesContext'
import ListingCard from '../components/ui/ListingCard'
import { Link } from 'react-router-dom'

function Favorites() {
  const { favorites } = useFavorites()

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Favorites</h1>

      {favorites.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg mb-4">You have no saved listings yet.</p>
          <Link
            to="/"
            className="bg-rose-500 text-white px-6 py-3 rounded-full hover:bg-rose-600 transition font-medium"
          >
            Explore Stays
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites