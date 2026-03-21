import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext.jsx';

export function LoginPage() {
  const [username, setUsername] = useState('');
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || '/';

  const onSubmit = (event) => {
    event.preventDefault();
    if (!username.trim()) {
      return;
    }
    login(username);
    navigate(from, { replace: true });
  };

  return (
    <div className="grid min-h-[72vh] place-items-center">
      <form
        className="flex w-[min(420px,95%)] flex-col gap-3 rounded-2xl border border-[#e8dfd0] bg-[#fffdf8] p-4 shadow-[0_8px_24px_rgba(40,44,52,0.06)]"
        onSubmit={onSubmit}
      >
        <h1 className="m-0 text-3xl font-semibold">Login</h1>
        <p className="m-0 text-[#5f6c7b]">Sign in to manage your bookings dashboard.</p>
        <label className="flex flex-col gap-1.5 text-[0.92rem]">
          Username
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="your name"
            required
          />
        </label>
        <button type="submit">Continue</button>
      </form>
    </div>
  );
}
