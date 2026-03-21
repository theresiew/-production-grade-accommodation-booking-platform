interface ErrorStateProps {
  title?: string;
  message: string;
}

export function ErrorState({ title = 'Something went wrong', message }: ErrorStateProps) {
  return (
    <div className="status-card error">
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
}