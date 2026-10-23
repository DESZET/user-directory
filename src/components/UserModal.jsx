import { useEffect } from 'react'

// Modal detail user, tutup pake tombol X atau Escape
export default function UserModal({ user, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEsc)
    // lock scroll body pas modal kebuka
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!user) return null

  const initials = user.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md animate-slide-up border-3 border-black bg-white shadow-brutal-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-4 border-b-3 border-black bg-accent px-6 py-6 text-white">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center border-3 border-black bg-white font-mono text-2xl font-bold text-black">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold tracking-tight">{user.name}</h2>
            <p className="font-mono text-sm opacity-90">@{user.username}</p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 border-3 border-black bg-white px-3 py-1 font-mono text-sm font-bold text-black transition-all hover:bg-black hover:text-white"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="max-h-[50vh] overflow-y-auto p-6">
          <Section title="Contact">
            <Field k="email" v={user.email} />
            <Field k="phone" v={user.phone} />
            <Field k="website" v={user.website} />
          </Section>

          <Section title="Address">
            <Field k="street" v={`${user.address.street}, ${user.address.suite}`} />
            <Field k="city" v={user.address.city} />
            <Field k="zipcode" v={user.address.zipcode} />
            <Field k="geo" v={`${user.address.geo.lat}, ${user.address.geo.lng}`} />
          </Section>

          <Section title="Company" last>
            <div className="border-3 border-black bg-cream p-4 shadow-brutal-sm">
              <div className="mb-1.5 text-lg font-bold">{user.company.name}</div>
              <div className="mb-2 text-sm italic text-gray-600">
                "{user.company.catchPhrase}"
              </div>
              <div className="font-mono text-xs font-bold text-accent">
                // {user.company.bs}
              </div>
            </div>
          </Section>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children, last }) {
  return (
    <div className={last ? '' : 'mb-5'}>
      <div className="mb-3 inline-block bg-black px-2.5 py-1 font-mono text-xs font-bold uppercase tracking-wider text-white">
        {title}
      </div>
      <div className="space-y-0">{children}</div>
    </div>
  )
}

function Field({ k, v }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b-2 border-gray-200 py-2 text-sm last:border-b-0">
      <span className="shrink-0 font-mono text-xs font-bold text-gray-500">
        {k}
      </span>
      <span className="text-right font-semibold">{v}</span>
    </div>
  )
}
