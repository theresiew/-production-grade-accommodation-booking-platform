export function Loader({ message = 'Loading data...' }) {
  return (
    <div className="status-card" role="status" aria-live="polite">
      <div className="spinner" />
      <p>{message}</p>
    </div>
  );
}