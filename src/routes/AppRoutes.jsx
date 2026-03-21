import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage.jsx';
import { ListingDetailsPage } from '@/pages/ListingDetailsPage.jsx';
import { BookingsPage } from '@/pages/BookingsPage.jsx';
import { FavoritesPage } from '@/pages/FavoritesPage.jsx';
import { LoginPage } from '@/pages/LoginPage.jsx';
import { ProtectedRoute } from './ProtectedRoute.jsx';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/listing/:id" element={<ListingDetailsPage />} />
      <Route
        path="/bookings"
        element={
          <ProtectedRoute>
            <BookingsPage />
          </ProtectedRoute>
        }
      />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}