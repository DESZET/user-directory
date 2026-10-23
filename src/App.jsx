import { useState, useMemo, useDeferredValue, useCallback } from 'react'
import { useUsers } from './hooks/useUsers'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import UserCard from './components/UserCard'
import UserModal from './components/UserModal'
import LoadingState from './components/LoadingState'
import ErrorState from './components/ErrorState'
import EmptyState from './components/EmptyState'

export default function App() {
  // --- Data layer ---
  const { users, loading, error, refetch } = useUsers()

  // --- UI state ---
  const [query, setQuery] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)

  // --- Search performance ---
  // useDeferredValue lets React keep the input responsive even if
  // filtering is expensive. React renders the input at high priority
  // (immediate) and the filtered list at low priority (deferred).
  // For 10k+ rows this prevents the "typing lag" problem.
  const deferredQuery = useDeferredValue(query)

  // --- Filtering (memoised so we only recompute when query or users change) ---
  const filteredUsers = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase()
    if (!q) return users
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q),
    )
  }, [users, deferredQuery])

  // --- Modal handlers ---
  const handleSelectUser = useCallback((user) => {
    setSelectedUser(user)
  }, [])

  const handleCloseModal = useCallback(() => {
    setSelectedUser(null)
  }, [])

  // --- Render ---
  return (
    <div className="mx-auto max-w-7xl px-6 py-9">
      {/* Header */}
      <Header count={users.length} />

      {/* Search */}
      {!loading && !error && (
        <SearchBar
          query={query}
          onChange={setQuery}
          resultCount={filteredUsers.length}
          totalCount={users.length}
        />
      )}

      {/* Content area */}
      {loading && <LoadingState />}

      {error && !loading && <ErrorState message={error} onRetry={refetch} />}

      {!loading && !error && filteredUsers.length === 0 && (
        <EmptyState query={query} />
      )}

      {!loading && !error && filteredUsers.length > 0 && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredUsers.map((user, i) => (
            <div
              key={user.id}
              className="animate-card-in"
              style={{ animationDelay: `${Math.min(i * 40, 400)}ms` }}
            >
              <UserCard user={user} index={i} onClick={handleSelectUser} />
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedUser && (
        <UserModal user={selectedUser} onClose={handleCloseModal} />
      )}

      {/* Footer */}
      <footer className="mt-10 border-t-3 border-black pt-4 text-center font-mono text-xs font-bold text-gray-400">
        USER DIRECTORY · POWERED BY DESTA
      </footer>
    </div>
  )
}
