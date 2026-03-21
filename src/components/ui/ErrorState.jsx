export function ErrorState({ title = 'Something went wrong', message, actionLabel, onAction }) {
  return (
    <div className="rounded-2xl border border-[#f3c3c0] bg-[#fff8f7] p-4 text-center shadow-[0_8px_24px_rgba(40,44,52,0.06)]">
      <h3 className="m-0 text-lg font-semibold">{title}</h3>
      <p className="mt-2">{message}</p>
      {actionLabel && onAction ? (
        <button type="button" className="border-[#e8dfd0] bg-[#fffdf8] text-[#1f2933]" onClick={onAction}>
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}
