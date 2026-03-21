import { ChangeEvent } from 'react';
import { useFilters } from '@/context/FiltersContext';

const locations = [
  { label: 'Chicago (sample)', placeId: 'ChIJ7cv00DwsDogRAMDACa2m4K8' },
  { label: 'New York', placeId: 'ChIJOwg_06VPwokRYv534QaPC8g' },
  { label: 'Sydney', placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4' },
  { label: 'London', placeId: 'ChIJdd4hrwug2EcRmSrV3Vo6llI' }
];

export function SidebarFilters() {
  const { filters, updateFilters, resetFilters } = useFilters();

  const onLocation = (event: ChangeEvent<HTMLSelectElement>) => {
    const placeId = event.target.value;
    const selected = locations.find((item) => item.placeId === placeId);
    updateFilters({ placeId, locationLabel: selected?.label || 'Custom location' });
  };

  return (
    <aside className="filters-panel">
      <h2>Filters</h2>

      <label>
        Location
        <select value={filters.placeId} onChange={onLocation}>
          {locations.map((location) => (
            <option key={location.placeId} value={location.placeId}>
              {location.label}
            </option>
          ))}
        </select>
      </label>

      <label>
        Min Price
        <input
          type="number"
          min={0}
          value={filters.minPrice ?? ''}
          onChange={(event) => updateFilters({ minPrice: Number(event.target.value) || undefined })}
        />
      </label>

      <label>
        Max Price
        <input
          type="number"
          min={0}
          value={filters.maxPrice ?? ''}
          onChange={(event) => updateFilters({ maxPrice: Number(event.target.value) || undefined })}
        />
      </label>

      <label>
        Rating
        <input
          type="range"
          min={0}
          max={5}
          step={0.5}
          value={filters.minRating ?? 0}
          onChange={(event) => updateFilters({ minRating: Number(event.target.value) })}
        />
        <span>{filters.minRating ?? 0}+</span>
      </label>

      <label>
        Check-in
        <input
          type="date"
          value={filters.checkin ?? ''}
          onChange={(event) => updateFilters({ checkin: event.target.value || undefined })}
        />
      </label>

      <label>
        Check-out
        <input
          type="date"
          value={filters.checkout ?? ''}
          onChange={(event) => updateFilters({ checkout: event.target.value || undefined })}
        />
      </label>

      <button className="secondary" type="button" onClick={resetFilters}>
        Reset
      </button>
    </aside>
  );
}
