/**
 * EmptyState — shown when search returns no results.
 */
export default function EmptyState({ query }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 border-3 border-black bg-white py-20 text-center shadow-brutal">
      <div className="flex h-20 w-20 items-center justify-center border-3 border-black bg-[#F8E000] text-4xl shadow-brutal-sm">
        ?
      </div>
      <div>
        <h3 className="mb-1 text-xl font-bold tracking-tight">No users found</h3>
        <p className="text-sm text-gray-500">
          No results for{' '}
          <span className="font-mono font-bold text-accent">"{query}"</span>
          . Try a different search term.
        </p>
      </div>
    </div>
  )
}
