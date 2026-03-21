import { useAuth } from '@/context/AuthContext.jsx';

export function UserProfileCard() {
  const { username } = useAuth();

  if (!username) {
    return null;
  }

  return (
    <div className="profile-chip" title="Logged in user">
      {username.slice(0, 1).toUpperCase()} · {username}
    </div>
  );
}