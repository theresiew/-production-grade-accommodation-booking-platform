import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext.jsx';
import { useFilters } from '@/context/FiltersContext.jsx';
import { UserProfileCard } from '@/components/user/UserProfileCard.jsx';

export function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const { filters, updateFilters } = useFilters();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(filters.query || '');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const incoming = searchParams.get('query') || '';
    setQuery(incoming);
    if (incoming !== filters.query) {
      updateFilters({ query: incoming });
    }
  }, [searchParams, filters.query, updateFilters]);

  const onSubmit = (event) => {
    event.preventDefault();
    const next = new URLSearchParams(searchParams);
    if (query) {
      next.set('query', query);
    } else {
      next.delete('query');
    }
    navigate({ pathname: '/', search: next.toString() });
    updateFilters({ query });
  };

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <Link to="/">AirStay</Link>
      </div>

      <form className="navbar-search" onSubmit={onSubmit}>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by title or host"
          aria-label="Search stays"
        />
        <button type="submit">Search</button>
      </form>

      <nav className="navbar-links">
        <Link to="/favorites">Favorites</Link>
        <Link to="/bookings">Bookings</Link>
        {isAuthenticated ? (
          <>
            <UserProfileCard />
            <button onClick={logout} className="btn-link" type="button">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" state={{ from: location }}>
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}