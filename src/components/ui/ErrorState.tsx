interface ErrorStateProps {
  title?: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function ErrorState({ title = 'Something went wrong', message, actionLabel, onAction }: ErrorStateProps) {
  return (
    <div className="status-card error">
      <h3>{title}</h3>
      <p>{message}</p>
      {actionLabel && onAction ? (
        <button type="button" className="secondary" onClick={onAction}>
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}
