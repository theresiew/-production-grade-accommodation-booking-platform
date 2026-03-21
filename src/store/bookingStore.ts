import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Booking, BookingInput } from '@/types';

interface BookingState {
  bookings: Booking[];
  addBooking: (input: BookingInput) => Booking;
  cancelBooking: (id: string) => void;
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      bookings: [],
      addBooking: (input) => {
        const booking: Booking = {
          ...input,
          id: crypto.randomUUID(),
          status: 'confirmed',
          createdAt: new Date().toISOString()
        };
        set((state) => ({ bookings: [booking, ...state.bookings] }));
        return booking;
      },
      cancelBooking: (id) =>
        set((state) => ({
          bookings: state.bookings.map((booking) =>
            booking.id === id ? { ...booking, status: 'cancelled' } : booking
          )
        }))
    }),
    {
      name: 'bookings-store'
    }
  )
);