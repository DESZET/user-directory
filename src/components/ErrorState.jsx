// Tampilan error pake tombol retry
export default function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 border-3 border-black bg-white py-20 text-center shadow-brutal">
      <div className="flex h-20 w-20 items-center justify-center border-3 border-black bg-strip-3 text-4xl font-bold text-white shadow-brutal-sm">
        !
      </div>

      <div>
        <h3 className="mb-2 text-xl font-bold tracking-tight">
          Failed to load users
        </h3>
        <p className="max-w-sm text-sm text-gray-500">{message}</p>
      </div>

      <button
        onClick={onRetry}
        className="border-3 border-black bg-accent px-6 py-3 font-mono text-sm font-bold text-white shadow-brutal-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal active:translate-x-1 active:translate-y-1 active:shadow-none"
      >
        ↻ TRY AGAIN
      </button>
    </div>
  )
}
