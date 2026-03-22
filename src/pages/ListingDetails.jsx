import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { searchProperties } from '../services/api'
import { useFavorites } from '../context/FavoritesContext'
import useBookingStore from '../store/useBookingStore'
import Loader from '../components/ui/Loader'
import ErrorState from '../components/ui/ErrorState'
import { useState } from 'react'

function ListingDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  const addBooking = useBookingStore((state) => state.addBooking)

  const [checkin, setCheckin] = useState('')
  const [checkout, setCheckout] = useState('')
  const [guests, setGuests] = useState(1)
  const [booked, setBooked] = useState(false)

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['listings'],
    queryFn: () => searchProperties(),
    staleTime: 1000 * 60 * 5,
  })

  const listings = data?.data?.list || []
  const listing = listings.find((l) => String(l.id) === String(id))

  if (isLoading) return <Loader />
  if (isError) return <ErrorState message={error?.message} />
  if (!listing) return <ErrorState message="Listing not found." />

  const title = listing?.name || 'Beautiful Stay'
  const images = listing?.pictures || []
  const mainImage = images?.[0]?.large || 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800'
  const extraImages = images?.slice(1, 5) || []
  const price = listing?.pricingQuote?.structuredStayDisplayPrice?.primaryLine?.price || 'N/A'
  const rating = listing?.avgRating || null
  const reviewCount = listing?.reviewsCount || 0
  const city = listing?.city || ''
  const description = listing?.description || 'A wonderful place to stay. Enjoy the comfort and luxury of this amazing property.'
  const favorite = isFavorite(id)

  const handleBooking = () => {
    if (!checkin || !checkout) return
    addBooking({ id, title, image: mainImage, price, checkin, checkout, guests })
    setBooked(true)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-rose-500 transition mb-6"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
        </svg>
        Back to listings
      </button>

      {/* Title Row */}
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-2xl font-bold text-gray-800 pr-4">{title}</h1>
        <button
          onClick={() => favorite ? removeFavorite(id) : addFavorite(listing)}
          className="flex items-center gap-1 text-sm text-rose-500 hover:text-rose-600 transition shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            fill={favorite ? 'currentColor' : 'none'}
            stroke="currentColor" strokeWidth={2}
            className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
          {favorite ? 'Saved' : 'Save'}
        </button>
      </div>

      {/* Rating Row */}
      {rating && (
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-rose-500">
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
          </svg>
          <span className="font-semibold">{rating}</span>
          <span className="text-gray-400">·</span>
          <span className="underline font-medium">{reviewCount} reviews</span>
          {city && <><span className="text-gray-400">·</span><span>{city}</span></>}
        </div>
      )}

      {/* Image Gallery */}
      <div className="grid grid-cols-4 grid-rows-2 gap-2 rounded-2xl overflow-hidden mb-8 h-80">
        <div className="col-span-2 row-span-2">
          <img src={mainImage} alt={title} className="w-full h-full object-cover" />
        </div>
        {extraImages.map((img, i) => (
          <div key={i} className="col-span-1 row-span-1">
            <img src={img?.large} alt={`${title} ${i + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Description */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">About this place</h2>
          <p className="text-gray-600 leading-relaxed">{description}</p>

          {/* Amenities placeholder */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">What this place offers</h2>
            <div className="grid grid-cols-2 gap-3">
              {['WiFi', 'Kitchen', 'Free parking', 'Air conditioning', 'TV', 'Washer'].map((amenity) => (
                <div key={amenity} className="flex items-center gap-2 text-gray-600 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-rose-400">
                    <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                  </svg>
                  {amenity}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md h-fit sticky top-24">
          <p className="text-xl font-bold text-gray-800 mb-1">
            {price} <span className="text-sm font-normal text-gray-500">/ night</span>
          </p>
          {rating && (
            <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-rose-500">
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
              </svg>
              {rating} · {reviewCount} reviews
            </div>
          )}

          {booked ? (
            <div className="text-center py-4">
              <p className="text-green-600 font-semibold text-lg">🎉 Booking Confirmed!</p>
              <button
                onClick={() => navigate('/bookings')}
                className="mt-4 w-full bg-rose-500 text-white py-3 rounded-xl hover:bg-rose-600 transition font-medium"
              >
                View Bookings
              </button>
            </div>
          ) : (
            <>
              <div className="border border-gray-300 rounded-xl overflow-hidden mb-4">
                <div className="grid grid-cols-2 divide-x divide-gray-300">
                  <div className="p-3">
                    <label className="text-xs font-bold text-gray-700 uppercase">Check-in</label>
                    <input
                      type="date"
                      value={checkin}
                      onChange={(e) => setCheckin(e.target.value)}
                      className="w-full text-sm outline-none mt-1 text-gray-700"
                    />
                  </div>
                  <div className="p-3">
                    <label className="text-xs font-bold text-gray-700 uppercase">Check-out</label>
                    <input
                      type="date"
                      value={checkout}
                      onChange={(e) => setCheckout(e.target.value)}
                      className="w-full text-sm outline-none mt-1 text-gray-700"
                    />
                  </div>
                </div>
                <div className="border-t border-gray-300 p-3">
                  <label className="text-xs font-bold text-gray-700 uppercase">Guests</label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full text-sm outline-none mt-1 text-gray-700"
                  />
                </div>
              </div>
              <button
                onClick={handleBooking}
                disabled={!checkin || !checkout}
                className="w-full bg-rose-500 text-white py-3 rounded-xl hover:bg-rose-600 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reserve
              </button>
              <p className="text-center text-xs text-gray-400 mt-3">You won't be charged yet</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ListingDetails