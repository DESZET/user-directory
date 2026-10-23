// Skeleton card pas loading
export default function LoadingState({ count = 9 }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden border-3 border-black bg-white shadow-brutal"
        >
          <div className="h-2 animate-pulse border-b-3 border-black bg-gray-200" />
          <div className="p-5">
            <div className="mb-4 flex items-center gap-3.5">
              <div className="h-[52px] w-[52px] shrink-0 animate-pulse border-3 border-black bg-gray-200" />
              <div className="flex-1">
                <div className="mb-2 h-4 w-2/3 animate-pulse bg-gray-200" />
                <div className="h-3 w-1/3 animate-pulse bg-gray-200" />
              </div>
            </div>
            <div className="mb-4 h-9 animate-pulse border-2 border-black bg-gray-200" />
            <div className="flex items-center justify-between">
              <div className="h-4 w-1/2 animate-pulse bg-gray-200" />
              <div className="h-6 w-20 animate-pulse bg-gray-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
