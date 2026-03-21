import { AppLayout } from './components/layout/AppLayout.jsx';
import { AppRoutes } from './routes/AppRoutes.jsx';

export default function App() {
  return (
    <AppLayout>
      <AppRoutes />
    </AppLayout>
  );
}