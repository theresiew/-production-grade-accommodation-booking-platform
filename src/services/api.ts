import axios from 'axios';
import { Listing, SearchFilters } from '@/types';

const apiKey = import.meta.env.VITE_RAPID_API_KEY;

export const api = axios.create({
  baseURL: 'https://airbnb19.p.rapidapi.com/api/v2',
  headers: {
    'Content-Type': 'application/json',
    'x-rapidapi-host': 'airbnb19.p.rapidapi.com',
    'x-rapidapi-key': apiKey
  }
});

const defaultDescription =
  'A comfortable stay with curated amenities, flexible check-in, and a reliable host experience.';

function toNumber(value: unknown, fallback = 0): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function extractPrice(raw: any): number {
  return (
    toNumber(raw?.price?.unit?.amount) ||
    toNumber(raw?.price?.amount) ||
    toNumber(raw?.pricingQuote?.rate?.amount) ||
    toNumber(raw?.structuredDisplayPrice?.primaryLine?.price) ||
    0
  );
}

function normalizeListing(raw: any): Listing {
  const imageList = (raw?.images || raw?.contextualPictures || [])
    .map((item: any) => item?.url || item?.picture || item)
    .filter(Boolean);

  return {
    id: String(raw?.id || raw?.listing?.id || raw?.propertyId || crypto.randomUUID()),
    title: raw?.name || raw?.title || raw?.listing?.name || 'Untitled stay',
    location: raw?.location?.city || raw?.city || raw?.localizedCityName || 'Unknown location',
    rating: toNumber(raw?.avgRatingA11yLabel?.split(' ')[0] || raw?.rating || raw?.avgRatingLocalized),
    pricePerNight: extractPrice(raw),
    currency: raw?.price?.unit?.currencyCode || raw?.currency || 'USD',
    image: imageList[0] || 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1280',
    images: imageList,
    description: raw?.description || raw?.summary || raw?.caption || defaultDescription,
    guests: toNumber(raw?.personCapacity || raw?.guests || 2, 2),
    bedrooms: toNumber(raw?.bedroomCount || raw?.bedrooms || 1, 1),
    bathrooms: toNumber(raw?.bathroomCount || raw?.bathrooms || 1, 1),
    hostName: raw?.host?.name || raw?.primaryHost?.firstName || 'AirStay Host'
  };
}

function parseListingsPayload(payload: any): any[] {
  return (
    payload?.data?.searchResults ||
    payload?.data?.homes ||
    payload?.data?.results ||
    payload?.results ||
    payload?.homes ||
    []
  );
}

export async function fetchListings(filters: SearchFilters): Promise<Listing[]> {
  const response = await api.get('/searchPropertyByPlaceId', {
    params: {
      placeId: filters.placeId,
      checkin: filters.checkin,
      checkout: filters.checkout,
      adults: 2,
      children: 0,
      infants: 0,
      pets: 0,
      page: 1,
      currency: 'USD'
    }
  });

  const rawListings = parseListingsPayload(response.data);
  const normalized = rawListings.map(normalizeListing);

  return normalized.filter((item) => {
    const matchesQuery = !filters.query || item.title.toLowerCase().includes(filters.query.toLowerCase());
    const matchesRating = !filters.minRating || item.rating >= filters.minRating;
    const matchesMin = filters.minPrice === undefined || item.pricePerNight >= filters.minPrice;
    const matchesMax = filters.maxPrice === undefined || item.pricePerNight <= filters.maxPrice;
    return matchesQuery && matchesRating && matchesMin && matchesMax;
  });
}

export async function fetchListingDetails(id: string, filters: SearchFilters): Promise<Listing | null> {
  const listings = await fetchListings(filters);
  return listings.find((listing) => listing.id === id) || null;
}

export function isRateLimitError(error: unknown): boolean {
  if (!axios.isAxiosError(error)) {
    return false;
  }
  return error.response?.status === 429;
}