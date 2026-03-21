import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchListingDetails, fetchListings } from '@/services/api.js';

export function listingsQueryKey(filters) {
  return ['listings', filters];
}

export function useListingsQuery(filters) {
  return useQuery({
    queryKey: listingsQueryKey(filters),
    queryFn: () => fetchListings(filters),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 20
  });
}

export function useListingDetailsQuery(id, filters) {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ['listing', id, filters],
    queryFn: () => fetchListingDetails(id, filters),
    enabled: Boolean(id && filters.placeId),
    initialData: () => {
      const cachedListings = queryClient.getQueryData(listingsQueryKey(filters));
      return cachedListings?.find((listing) => listing.id === id) ?? null;
    },
    staleTime: 1000 * 60 * 10,
    cacheTime: 1000 * 60 * 30
  });
}