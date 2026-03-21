import { useFilters } from '@/context/FiltersContext.jsx';

const locations = [
  { label: 'Chicago (sample)', placeId: 'ChIJ7cv00DwsDogRAMDACa2m4K8' },
  { label: 'New York', placeId: 'ChIJOwg_06VPwokRYv534QaPC8g' },
  { label: 'Sydney', placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4' },
  { label: 'London', placeId: 'ChIJdd4hrwug2EcRmSrV3Vo6llI' }
];

export function SidebarFilters() {
  const { filters, updateFilters, resetFilters } = useFilters();

  const onLocation = (event) => {
    const placeId = event.target.value;
    const selected = locations.find((item) => item.placeId === placeId);
    updateFilters({ placeId, locationLabel: selected?.label || 'Custom location' });
  };

  return (
    <aside className="animate-[slide-in_220ms_ease] rounded-2xl border border-[#e8dfd0] bg-[#fffdf8] p-4 shadow-[0_8px_24px_rgba(40,44,52,0.06)]">
      <div className="flex flex-col gap-3.5">
        <h2 className="m-0 text-xl font-semibold">Filters</h2>

        <label className="flex flex-col gap-1.5 text-[0.92rem]">
          Location
          <select value={filters.placeId} onChange={onLocation}>
            {locations.map((location) => (
              <option key={location.placeId} value={location.placeId}>
                {location.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5 text-[0.92rem]">
          Min Price
          <input
            type="number"
            min={0}
            value={filters.minPrice ?? ''}
            onChange={(event) => updateFilters({ minPrice: Number(event.target.value) || undefined })}
          />
        </label>

        <label className="flex flex-col gap-1.5 text-[0.92rem]">
          Max Price
          <input
            type="number"
            min={0}
            value={filters.maxPrice ?? ''}
            onChange={(event) => updateFilters({ maxPrice: Number(event.target.value) || undefined })}
          />
        </label>

        <label className="flex flex-col gap-1.5 text-[0.92rem]">
          Rating
          <input
            type="range"
            min={0}
            max={5}
            step={0.5}
            value={filters.minRating ?? 0}
            onChange={(event) => updateFilters({ minRating: Number(event.target.value) })}
          />
          <span className="text-[#5f6c7b]">{filters.minRating ?? 0}+</span>
        </label>

        <label className="flex flex-col gap-1.5 text-[0.92rem]">
          Check-in
          <input
            type="date"
            value={filters.checkin ?? ''}
            onChange={(event) => updateFilters({ checkin: event.target.value || undefined })}
          />
        </label>

        <label className="flex flex-col gap-1.5 text-[0.92rem]">
          Check-out
          <input
            type="date"
            value={filters.checkout ?? ''}
            onChange={(event) => updateFilters({ checkout: event.target.value || undefined })}
          />
        </label>

        <button className="border-[#e8dfd0] bg-[#fffdf8] text-[#1f2933]" type="button" onClick={resetFilters}>
          Reset
        </button>
      </div>
    </aside>
  );
}
