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
    <header className="sticky top-0 z-20 grid grid-cols-1 items-center gap-3 border-b border-[#e8dfd0] bg-[rgba(255,253,248,0.92)] px-5 py-4 backdrop-blur md:grid-cols-[160px_minmax(180px,1fr)_auto]">
      <div>
        <Link to="/" className="text-xl font-extrabold text-[#b0413e]">
          AirStay
        </Link>
      </div>

      <form className="flex gap-2" onSubmit={onSubmit}>
        <input
          className="min-w-0 flex-1"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by title or host"
          aria-label="Search stays"
        />
        <button type="submit">Search</button>
      </form>

      <nav className="flex flex-wrap items-center gap-2.5">
        <Link to="/favorites" className="text-sm font-medium hover:text-[#b0413e]">
          Favorites
        </Link>
        <Link to="/bookings" className="text-sm font-medium hover:text-[#b0413e]">
          Bookings
        </Link>
        {isAuthenticated ? (
          <>
            <UserProfileCard />
            <button
              onClick={logout}
              className="border-[#e8dfd0] bg-transparent text-[#1f2933]"
              type="button"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" state={{ from: location }} className="text-sm font-medium hover:text-[#b0413e]">
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}
