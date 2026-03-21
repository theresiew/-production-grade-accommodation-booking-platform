import { FormEvent, useState } from 'react';
import { useCreateBookingMutation } from '@/hooks/useBookings';
import { Listing } from '@/types';

interface BookingFormProps {
  listing: Listing;
}

export function BookingForm({ listing }: BookingFormProps) {
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [guests, setGuests] = useState(1);
  const [validationError, setValidationError] = useState('');
  const createBooking = useCreateBookingMutation();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
    <form className="booking-form" onSubmit={onSubmit}>
      <h3>Book this stay</h3>

      <label>
        Check-in
        <input type="date" value={checkin} onChange={(event) => setCheckin(event.target.value)} required />
      </label>

      <label>
        Check-out
        <input
          type="date"
          value={checkout}
          min={checkin || undefined}
          onChange={(event) => setCheckout(event.target.value)}
          required
        />
      </label>

      <label>
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

      {createBooking.isSuccess ? <p className="success-text">Booking confirmed.</p> : null}
      {validationError ? <p className="error-text">{validationError}</p> : null}
      {createBooking.isError ? <p className="error-text">Could not create booking. Try again.</p> : null}
    </form>
  );
}
