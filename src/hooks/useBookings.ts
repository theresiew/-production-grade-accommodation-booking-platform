import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useBookingStore } from '@/store/bookingStore';
import { Booking, BookingInput } from '@/types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function useBookingsQuery() {
  return useQuery({
    queryKey: ['bookings'],
    queryFn: async () => {
      await delay(200);
      return useBookingStore.getState().bookings;
    },
    staleTime: 1000 * 60 * 2,
    cacheTime: 1000 * 60 * 10
  });
}

export function useCreateBookingMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: BookingInput) => {
      await delay(300);
      return useBookingStore.getState().addBooking(input);
    },
    onMutate: async (input) => {
      await queryClient.cancelQueries({ queryKey: ['bookings'] });
      const previous = queryClient.getQueryData<Booking[]>(['bookings']) || [];
      const optimistic: Booking = {
        ...input,
        id: `temp-${Date.now()}`,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      };
      queryClient.setQueryData<Booking[]>(['bookings'], [optimistic, ...previous]);
      return { previous };
    },
    onError: (_error, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['bookings'], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    }
  });
}

export function useCancelBookingMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await delay(250);
      useBookingStore.getState().cancelBooking(id);
      return id;
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['bookings'] });
      const previous = queryClient.getQueryData<Booking[]>(['bookings']) || [];
      queryClient.setQueryData<Booking[]>(
        ['bookings'],
        previous.map((booking) =>
          booking.id === id ? { ...booking, status: 'cancelled' } : booking
        )
      );
      return { previous };
    },
    onError: (_error, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['bookings'], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    }
  });
}