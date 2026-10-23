// Warna strip dan avatar tiap card
const STRIP_COLORS = [
  'bg-strip-1',
  'bg-strip-2',
  'bg-strip-3',
  'bg-strip-4',
  'bg-strip-5',
  'bg-strip-6',
  'bg-strip-7',
  'bg-strip-8',
  'bg-strip-9',
]

const AVATAR_COLORS = [
  'bg-strip-1 text-white',
  'bg-strip-2 text-black',
  'bg-strip-3 text-white',
  'bg-strip-4 text-white',
  'bg-strip-5 text-white',
  'bg-strip-6 text-black',
  'bg-strip-7 text-white',
  'bg-strip-8 text-white',
  'bg-strip-9 text-black',
]

export default function UserCard({ user, index, onClick }) {
  const strip = STRIP_COLORS[index % STRIP_COLORS.length]
  const avatar = AVATAR_COLORS[index % AVATAR_COLORS.length]
  const initials = getInitials(user.name)

  return (
    <div
      onClick={() => onClick(user)}
      className="cursor-pointer overflow-hidden border-3 border-black bg-white shadow-brutal transition-all duration-150 hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-brutal-accent active:translate-x-[5px] active:translate-y-[5px] active:shadow-none"
    >
      <div className={`h-2 border-b-3 border-black ${strip}`} />

      <div className="p-5">
        <div className="mb-4 flex items-center gap-3.5">
          <div
            className={`flex h-[52px] w-[52px] shrink-0 items-center justify-center border-3 border-black font-mono text-lg font-bold ${avatar}`}
          >
            {initials}
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-base font-bold leading-tight tracking-tight">
              {user.name}
            </h3>
            <p className="font-mono text-xs font-bold text-gray-500">
              @{user.username}
            </p>
          </div>
        </div>

        <div className="mb-4 border-2 border-black bg-[#F8F8F8] px-3 py-2 text-sm font-medium text-gray-700">
          {user.email}
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-sm font-semibold">
            {user.company.name}
          </span>
          <span className="shrink-0 bg-black px-2 py-1 font-mono text-[11px] font-bold text-white">
            {user.address.city.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  )
}

// ambil inisial dari nama
function getInitials(name) {
  return name
    .split(' ')
    .map((word) => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}
