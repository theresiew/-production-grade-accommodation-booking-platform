import { useCancelBookingMutation, useBookingsQuery } from '@/hooks/useBookings.js';
import { ErrorState } from '@/components/ui/ErrorState.jsx';
import { Loader } from '@/components/ui/Loader.jsx';

export function BookingsPage() {
  const bookingsQuery = useBookingsQuery();
  const cancelBooking = useCancelBookingMutation();

  if (bookingsQuery.isLoading) {
    return <Loader message="Loading your bookings..." />;
  }

  if (bookingsQuery.isError) {
    return (
      <ErrorState
        message="Could not fetch bookings. Please refresh and try again."
        actionLabel="Retry"
        onAction={() => bookingsQuery.refetch()}
      />
    );
  }

  const bookings = bookingsQuery.data || [];

  if (bookings.length === 0) {
    return <ErrorState title="No bookings yet" message="Book a listing to populate your dashboard." />;
  }

  return (
    <div className="mx-auto max-w-[1000px]">
      <h1 className="mb-5 mt-0 text-3xl font-semibold">Bookings Dashboard</h1>
      <section className="grid gap-3">
        {bookings.map((booking) => (
          <article
            className="rounded-2xl border border-[#e8dfd0] bg-[#fffdf8] p-4 shadow-[0_8px_24px_rgba(40,44,52,0.06)]"
            key={booking.id}
          >
            <h3 className="m-0 text-lg font-semibold">{booking.listingTitle}</h3>
            <p className="mb-2 mt-2 text-[#5f6c7b]">
              {booking.checkin} to {booking.checkout} {'\u00b7'} {booking.guests} guests
            </p>
            <p className="mt-0">Status: {booking.status}</p>
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
