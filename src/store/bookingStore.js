import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useBookingStore = create(
  persist(
    (set) => ({
      bookings: [],
      addBooking: (input) => {
        const booking = {
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