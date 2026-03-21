import { useCancelBookingMutation, useBookingsQuery } from '@/hooks/useBookings';
import { ErrorState } from '@/components/ui/ErrorState';
import { Loader } from '@/components/ui/Loader';

export function BookingsPage() {
  const bookingsQuery = useBookingsQuery();
  const cancelBooking = useCancelBookingMutation();

  if (bookingsQuery.isLoading) {
    return <Loader message="Loading your bookings..." />;
  }

  if (bookingsQuery.isError) {
    return <ErrorState message="Could not fetch bookings. Please refresh and try again." />;
  }

  const bookings = bookingsQuery.data || [];

  if (bookings.length === 0) {
    return <ErrorState title="No bookings yet" message="Book a listing to populate your dashboard." />;
  }

  return (
    <div className="page simple-page">
      <h1>Bookings Dashboard</h1>
      <section className="booking-list">
        {bookings.map((booking) => (
          <article className="booking-card" key={booking.id}>
            <h3>{booking.listingTitle}</h3>
            <p>
              {booking.checkin} to {booking.checkout} · {booking.guests} guests
            </p>
            <p>Status: {booking.status}</p>
            <button
              type="button"
              disabled={booking.status === 'cancelled' || cancelBooking.isPending}
              onClick={() => cancelBooking.mutate(booking.id)}
            >
              Cancel booking
            </button>
          </article>
        ))}
      </section>
    </div>
  );
}