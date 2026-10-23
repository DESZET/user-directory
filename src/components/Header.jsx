// Header banner
export default function Header({ count }) {
  return (
    <header className="mb-7 flex items-center justify-between border-3 border-black bg-accent px-8 py-7 text-white shadow-[6px_6px_0_#000]">
      <h1 className="text-3xl font-bold leading-none tracking-tight">
        User Directory
      </h1>
      <div className="border-3 border-black bg-white px-4 py-1.5 font-mono text-sm font-bold text-black shadow-[3px_3px_0_#000]">
        {String(count).padStart(2, '0')} USERS
      </div>
    </header>
  )
}
