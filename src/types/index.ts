export interface Listing {
  id: string;
  title: string;
  location: string;
  rating: number;
  pricePerNight: number;
  currency: string;
  image: string;
  images: string[];
  description: string;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  hostName: string;
}

export interface SearchFilters {
  placeId: string;
  locationLabel: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  query?: string;
  checkin?: string;
  checkout?: string;
}

export interface BookingInput {
  listingId: string;
  listingTitle: string;
  checkin: string;
  checkout: string;
  guests: number;
}

export interface Booking extends BookingInput {
  id: string;
  status: 'confirmed' | 'cancelled';
  createdAt: string;
}