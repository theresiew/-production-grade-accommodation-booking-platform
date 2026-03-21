import { Navbar } from './Navbar.jsx';

export function AppLayout({ children }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="p-4">{children}</main>
    </div>
  );
}
