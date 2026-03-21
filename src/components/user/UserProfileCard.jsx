import { useAuth } from '@/context/AuthContext.jsx';

export function UserProfileCard() {
  const { username } = useAuth();

  if (!username) {
    return null;
  }

  return (
    <div className="rounded-full bg-[#f4d7c5] px-2.5 py-1.5 text-[0.85rem]" title="Logged in user">
      {username.slice(0, 1).toUpperCase()} {'\u00b7'} {username}
    </div>
  );
}
