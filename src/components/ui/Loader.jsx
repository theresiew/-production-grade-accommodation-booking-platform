export function Loader({ message = 'Loading data...' }) {
  return (
    <div
      className="rounded-2xl border border-[#e8dfd0] bg-[#fffdf8] p-4 text-center shadow-[0_8px_24px_rgba(40,44,52,0.06)]"
      role="status"
      aria-live="polite"
    >
      <div className="mx-auto mb-2.5 h-[22px] w-[22px] animate-spin rounded-full border-[3px] border-[#f4d7c5] border-t-[#b0413e]" />
      <p className="m-0">{message}</p>
    </div>
  );
}
