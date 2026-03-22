# StayFinder 🏠

A production-grade accommodation booking platform inspired by Airbnb, built with React + Vite, TanStack Query, Zustand, and Tailwind CSS.

## Live Demo
[StayFinder on Vercel](https://your-vercel-url.vercel.app)

## GitHub Repository
[https://github.com/theresiew/-production-grade-accommodation-booking-platform](https://github.com/theresiew/-production-grade-accommodation-booking-platform)

## Project Structure
```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   └── FilterPanel.jsx
│   └── ui/
│       ├── ListingCard.jsx
│       ├── Loader.jsx
│       └── ErrorState.jsx
├── pages/
│   ├── Home.jsx
│   ├── ListingDetails.jsx
│   ├── Bookings.jsx
│   ├── Favorites.jsx
│   └── Login.jsx
├── services/
│   └── api.js
├── store/
│   └── useBookingStore.js
├── context/
│   └── FavoritesContext.jsx
└── hooks/
```

## API Integration
This project uses the Airbnb API from RapidAPI.

- Base URL: `https://airbnb19.p.rapidapi.com`
- Endpoint: `/api/v2/searchPropertyByPlaceId`
- Axios is configured in `src/services/api.js` with a centralized instance
- API key is stored securely in `.env` file and never hardcoded
- Graceful fallback to mock data when API quota is exceeded

## Setup Instructions

1. Clone the repository
```bash
git clone https://github.com/theresiew/-production-grade-accommodation-booking-platform.git
cd -production-grade-accommodation-booking-platform
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file in the root directory
```
VITE_RAPID_API_KEY=your_rapidapi_key_here
```

4. Run the development server
```bash
npm run dev
```

5. For Vercel deployment, add `VITE_RAPID_API_KEY` in your Vercel project environment variables settings.

## State Management
- **Local State** — Forms and UI interactions using `useState`
- **Global State** — Favorites managed with Context API and persisted in `localStorage`
- **Advanced State** — Bookings managed with Zustand
- **Server State** — Listings fetched and cached with TanStack Query

## Caching Strategy
- `staleTime: 5 minutes` — data stays fresh for 5 minutes
- `gcTime: 10 minutes` — cached data kept for 10 minutes
- Navigating between pages loads instantly from cache without extra API calls

## Features
- 🔍 Search destinations with URL parameter sync
- 🏠 Browse real property listings from Airbnb API
- ❤️ Save favorites persisted in localStorage
- 📅 Book properties with check-in/check-out dates and guest count
- 📋 View and cancel bookings
- 🔽 Filter by max price, min rating, and property type
- 🖼️ Image gallery on listing details page
- 📱 Fully responsive design (mobile, tablet, desktop)
- ⚡ Skeleton loading states
- 🛡️ Graceful error handling

## Tech Stack
- **React 18** + **Vite**
- **Tailwind CSS** — utility-first styling
- **Axios** — HTTP client with centralized config
- **TanStack Query** — server state, caching, background updates
- **Zustand** — booking global state management
- **React Router DOM** — client-side routing
- **RapidAPI Airbnb19** — property listings data