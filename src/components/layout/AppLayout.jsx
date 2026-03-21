import { Navbar } from './Navbar.jsx';

export function AppLayout({ children }) {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main">{children}</main>
    </div>
  );
}
