import { Link } from 'react-router-dom'
import { useFavorites } from '../../context/FavoritesContext'

function ListingCard({ listing }) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()

  const id = listing?.id
  const title = listing?.name || 'Beautiful Stay'
  const image = listing?.pictures?.[0]?.large || listing?.picture?.large || 'https://via.placeholder.com/400x300?text=No+Image'
  const price = listing?.pricingQuote?.structuredStayDisplayPrice?.primaryLine?.price || 'N/A'
  const rating = listing?.avgRating || listing?.star || null
  const reviewCount = listing?.reviewsCount || 0
  const city = listing?.city || ''

  const favorite = isFavorite(id)

  const handleFavorite = (e) => {
    e.preventDefault()
    if (favorite) {
      removeFavorite(id)
    } else {
      addFavorite(listing)
    }
  }

  return (
    <Link to={`/listing/${id}`} className="group block rounded-xl overflow-hidden hover:shadow-lg transition">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
        {/* Favorite Button */}
        <button
          onClick={handleFavorite}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 hover:bg-white transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={favorite ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth={2}
            className={`w-5 h-5 ${favorite ? 'text-rose-500' : 'text-gray-600'}`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
        </button>
      </div>

      {/* Info */}
      <div className="pt-3 px-1">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-gray-800 text-sm truncate max-w-[70%]">{title}</h3>
          {rating && (
            <div className="flex items-center gap-1 text-sm text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-rose-500">
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
              </svg>
              {rating}
            </div>
          )}
        </div>
        {city && <p className="text-gray-500 text-sm">{city}</p>}
        {reviewCount > 0 && <p className="text-gray-400 text-xs">{reviewCount} reviews</p>}
        <p className="text-gray-800 text-sm mt-1">
          <span className="font-semibold">{price}</span> night
        </p>
      </div>
    </Link>
  )
}

export default ListingCard