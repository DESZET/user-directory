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
  // ambil data user dari hook
  const { users, loading, error, refetch } = useUsers()

  // state UI
  const [query, setQuery] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)

  // useDeferredValue biar input tetap responsif walau data banyak
  const deferredQuery = useDeferredValue(query)

  // filter user berdasarkan nama atau email
  const filteredUsers = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase()
    if (!q) return users
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q),
    )
  }, [users, deferredQuery])

  const handleSelectUser = useCallback((user) => {
    setSelectedUser(user)
  }, [])

  const handleCloseModal = useCallback(() => {
    setSelectedUser(null)
  }, [])

  return (
    <div className="mx-auto max-w-7xl px-6 py-9">
      <Header count={users.length} />

      {!loading && !error && (
        <SearchBar
          query={query}
          onChange={setQuery}
          resultCount={filteredUsers.length}
          totalCount={users.length}
        />
      )}

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

      {selectedUser && (
        <UserModal user={selectedUser} onClose={handleCloseModal} />
      )}

      <footer className="mt-10 border-t-3 border-black pt-4 text-center font-mono text-xs font-bold text-gray-400">
        USER DIRECTORY - POWERED BY DESTA
      </footer>
    </div>
  )
}
