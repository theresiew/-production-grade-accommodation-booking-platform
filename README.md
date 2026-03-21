# AirStay Booking Platform

Production-grade accommodation booking platform built with React + Vite + TypeScript.

## Features
- API-driven listings feed using Airbnb RapidAPI endpoint.
- Centralized Axios client in `src/services/api.js`.
- TanStack Query server state (`useQuery`, `queryKey`, `staleTime`, `cacheTime`, invalidation).
- Context API global state for filters and favorites.
- Zustand store for complex booking logic with persistence.
- Protected route for bookings dashboard.
- Listing details, favorites, booking creation/cancellation, and login flow.
- Responsive UI for mobile, tablet, and desktop.

## Tech Stack
- React 18 + Vite + TypeScript
- Axios
- TanStack Query
- Zustand
- React Router DOM

## Project Structure
```text
src/
  components/
    forms/
    layout/
    listings/
    ui/
    user/
  context/
    AuthContext.jsx
    FavoritesContext.jsx
    FiltersContext.jsx
  hooks/
    useBookings.js
    useListingsQuery.js
  pages/
    HomePage.jsx
    ListingDetailsPage.jsx
    BookingsPage.jsx
    FavoritesPage.jsx
    LoginPage.jsx
  routes/
    AppRoutes.jsx
    ProtectedRoute.jsx
  services/
    api.js
  store/
    bookingStore.js
  utils/
    storage.js
```

## API Integration
Mandatory endpoint used:
- `https://airbnb19.p.rapidapi.com/api/v2/searchPropertyByPlaceId`

Headers configured centrally in `src/services/api.js`:
- `x-rapidapi-key` from environment variable
- `x-rapidapi-host: airbnb19.p.rapidapi.com`
- `Content-Type: application/json`

### Response Normalization
`src/services/api.js` normalizes nested API payloads into a consistent `Listing` model and applies client-side filtering.

## State Management Breakdown
- Local state: form fields, UI interactions, controlled search input.
- Global state (Context API): filters and favorites.
- Advanced shared state (Zustand): booking creation/cancellation logic.
- Server state (TanStack Query): listings, listing details, booking query/mutations.

## Setup
1. Install dependencies:
```bash
npm install
```
2. Create `.env` from `.env.example`:
```bash
cp .env.example .env
```
3. Set key:
```env
VITE_RAPID_API_KEY=your_rapidapi_key
```
4. Run dev server:
```bash
npm run dev
```

## Required Routes
- `/` listings feed
- `/listing/:id` listing details
- `/bookings` protected bookings dashboard
- `/favorites` saved listings
- `/login` authentication

## Caching Behavior
- Listings use stable query keys based on filters.
- `staleTime` and `cacheTime` are configured to avoid unnecessary re-fetches.
- Query invalidation refreshes booking dashboards after booking/cancel actions.

## Deployment (Vercel/Netlify)
1. Push repository.
2. Import project into Vercel or Netlify.
3. Add `VITE_RAPID_API_KEY` in platform environment variables.
4. Deploy.

Routing support files included:
- `vercel.json` rewrite to `index.html` for client-side routes.
- `public/_redirects` fallback rule for Netlify SPA routing.

Live URL: _Add deployed URL here after deployment._

## Commit Guidance
This assignment expects a minimum of 10 meaningful commits. Use clear commit messages grouped by feature.

