import { create } from 'zustand'

const useBookingStore = create((set) => ({
  bookings: [],
  addBooking: (booking) =>
    set((state) => ({
      bookings: [...state.bookings, { ...booking, id: Date.now() }],
    })),
  cancelBooking: (id) =>
    set((state) => ({
      bookings: state.bookings.filter((b) => b.id !== id),
    })),
}))

export default useBookingStore