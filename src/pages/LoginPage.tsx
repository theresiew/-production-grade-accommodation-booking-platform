import { FormEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export function LoginPage() {
  const [username, setUsername] = useState('');
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const from = (location.state as { from?: { pathname: string } } | null)?.from?.pathname || '/';

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!username.trim()) {
      return;
    }
    login(username);
    navigate(from, { replace: true });
  };

  return (
    <div className="page login-page">
      <form className="login-card" onSubmit={onSubmit}>
        <h1>Login</h1>
        <p>Sign in to manage your bookings dashboard.</p>
        <label>
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