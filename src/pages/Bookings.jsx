import useBookingStore from '../store/useBookingStore'
import { Link } from 'react-router-dom'

function Bookings() {
  const { bookings, cancelBooking } = useBookingStore()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Bookings</h1>

      {bookings.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg mb-4">You have no bookings yet.</p>
          <Link
            to="/"
            className="bg-rose-500 text-white px-6 py-3 rounded-full hover:bg-rose-600 transition font-medium"
          >
            Explore Stays
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="flex gap-4 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm"
            >
              <img
                src={booking.image}
                alt={booking.title}
                className="w-32 h-24 object-cover rounded-xl shrink-0"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{booking.title}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {booking.checkin} → {booking.checkout}
                </p>
                <p className="text-sm text-gray-500">
                  {booking.guests} guest{booking.guests > 1 ? 's' : ''}
                </p>
                <p className="text-sm font-semibold text-gray-800 mt-1">
                  {booking.price} / night
                </p>
              </div>
              <button
                onClick={() => cancelBooking(booking.id)}
                className="self-start text-sm text-rose-500 hover:text-rose-600 font-medium transition"
              >
                Cancel
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Bookings