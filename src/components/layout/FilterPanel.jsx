import { useState } from 'react'

const categories = [
  { label: 'All', icon: '🏠' },
  { label: 'Beach', icon: '🏖️' },
  { label: 'Mountain', icon: '⛰️' },
  { label: 'City', icon: '🏙️' },
  { label: 'Countryside', icon: '🌿' },
  { label: 'Luxury', icon: '💎' },
  { label: 'Cabin', icon: '🪵' },
  { label: 'Pool', icon: '🏊' },
]

function FilterPanel({ onFilterChange, filters }) {
  const [selected, setSelected] = useState('All')
  const [priceRange, setPriceRange] = useState(1000)
  const [minRating, setMinRating] = useState(0)

  const handleCategory = (label) => {
    setSelected(label)
    onFilterChange({ category: label, priceRange, minRating })
  }

  const handlePrice = (val) => {
    setPriceRange(val)
    onFilterChange({ category: selected, priceRange: val, minRating })
  }

  const handleRating = (val) => {
    setMinRating(val)
    onFilterChange({ category: selected, priceRange, minRating: val })
  }

  const handleReset = () => {
    setSelected('All')
    setPriceRange(1000)
    setMinRating(0)
    onFilterChange({ category: 'All', priceRange: 1000, minRating: 0 })
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm sticky top-24">
      <div className="flex justify-between items-center mb-5">
        <h2 className="font-bold text-gray-800 text-lg">Filters</h2>
        <button
          onClick={handleReset}
          className="text-xs text-rose-500 hover:underline font-medium"
        >
          Reset all
        </button>
      </div>

      {/* Category */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Property Type</h3>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => handleCategory(cat.label)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm transition ${
                selected === cat.label
                  ? 'bg-rose-50 border-rose-400 text-rose-600 font-medium'
                  : 'border-gray-200 text-gray-600 hover:border-gray-400'
              }`}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Max Price: <span className="text-rose-500">${priceRange}</span>
        </h3>
        <input
          type="range"
          min={50}
          max={1000}
          step={50}
          value={priceRange}
          onChange={(e) => handlePrice(Number(e.target.value))}
          className="w-full accent-rose-500"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>$50</span>
          <span>$1000</span>
        </div>
      </div>

      {/* Rating */}
      <div className="mb-2">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Min Rating</h3>
        <div className="flex flex-wrap gap-2">
          {[0, 3, 4, 4.5].map((r) => (
            <button
              key={r}
              onClick={() => handleRating(r)}
              className={`text-sm px-3 py-1.5 rounded-full border transition ${
                minRating === r
                  ? 'bg-rose-500 text-white border-rose-500'
                  : 'border-gray-300 text-gray-600 hover:border-gray-800'
              }`}
            >
              {r === 0 ? 'Any' : `${r}⭐+`}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FilterPanel