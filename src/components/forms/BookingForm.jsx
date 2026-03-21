import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext.jsx';
import { useCreateBookingMutation } from '@/hooks/useBookings.js';

export function BookingForm({ listing }) {
  const { isAuthenticated } = useAuth();
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [guests, setGuests] = useState(1);
  const [validationError, setValidationError] = useState('');
  const createBooking = useCreateBookingMutation();

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!isAuthenticated) {
      setValidationError('Please login before creating a booking.');
      return;
    }
    if (!checkin || !checkout) {
      setValidationError('Please select both check-in and check-out dates.');
      return;
    }
    if (new Date(checkout) <= new Date(checkin)) {
      setValidationError('Check-out date must be after check-in date.');
      return;
    }
    setValidationError('');

    await createBooking.mutateAsync({
      listingId: listing.id,
      listingTitle: listing.title,
      checkin,
      checkout,
      guests
    });

    setCheckin('');
    setCheckout('');
    setGuests(1);
  };

  return (
    <form
      className="flex flex-col gap-3 rounded-2xl border border-[#e8dfd0] bg-[#fffdf8] p-4 shadow-[0_8px_24px_rgba(40,44,52,0.06)]"
      onSubmit={onSubmit}
    >
      <h3 className="m-0 text-xl font-semibold">Book this stay</h3>

      <label className="flex flex-col gap-1.5 text-[0.92rem]">
        Check-in
        <input type="date" value={checkin} onChange={(event) => setCheckin(event.target.value)} required />
      </label>

      <label className="flex flex-col gap-1.5 text-[0.92rem]">
        Check-out
        <input
          type="date"
          value={checkout}
          min={checkin || undefined}
          onChange={(event) => setCheckout(event.target.value)}
          required
        />
      </label>

      <label className="flex flex-col gap-1.5 text-[0.92rem]">
        Guests
        <input
          type="number"
          min={1}
          max={listing.guests}
          value={guests}
          onChange={(event) => setGuests(Number(event.target.value) || 1)}
        />
      </label>

      <button type="submit" disabled={createBooking.isPending}>
        {createBooking.isPending ? 'Booking...' : 'Confirm Booking'}
      </button>
      {!isAuthenticated ? (
        <p className="m-0 text-[#9e2b25]">
          You must be logged in.{' '}
          <Link className="font-medium underline" to="/login">
            Go to login
          </Link>
        </p>
      ) : null}

      {createBooking.isSuccess ? <p className="m-0 text-[#1f7a4d]">Booking confirmed.</p> : null}
      {validationError ? <p className="m-0 text-[#9e2b25]">{validationError}</p> : null}
      {createBooking.isError ? <p className="m-0 text-[#9e2b25]">Could not create booking. Try again.</p> : null}
    </form>
  );
}
