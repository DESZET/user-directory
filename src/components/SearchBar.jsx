// Search bar buat filter user
export default function SearchBar({ query, onChange, resultCount, totalCount }) {
  return (
    <div className="mb-7">
      <div className="flex gap-3">
        <div className="relative flex flex-1 items-center">
          <svg
            className="absolute left-4 z-10 h-5 w-5 text-black"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={query}
            onChange={(e) => onChange(e.target.value)}
            className="h-14 w-full border-3 border-black bg-white py-0 pl-[3.1rem] pr-4 font-sans text-base font-medium outline-none transition-all shadow-brutal-sm placeholder:text-gray-400 focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[6px_6px_0_#7C3AED]"
          />
        </div>

        <div className="flex items-center border-3 border-black bg-[#F8E000] px-5 font-mono text-sm font-bold shadow-brutal-sm">
          {query
            ? `${String(resultCount).padStart(2, '0')} / ${String(totalCount).padStart(2, '0')}`
            : 'SORT'}
        </div>
      </div>
    </div>
  )
}
