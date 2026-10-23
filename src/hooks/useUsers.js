import { useState, useEffect } from 'react'

// Custom hook buat fetch data user dari JSONPlaceholder API
// pake AbortController biar ga memory leak pas component unmount
export function useUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchUsers() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(
          'https://jsonplaceholder.typicode.com/users',
          { signal: controller.signal },
        )
        if (!res.ok) {
          throw new Error(`HTTP ${res.status} — Failed to load users`)
        }
        const data = await res.json()
        setUsers(data)
      } catch (err) {
        // abort error itu cleanup, bukan error beneran
        if (err.name === 'AbortError') return
        setError(err.message || 'Something went wrong. Please try again.')
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchUsers()

    // cleanup: batalkan fetch kalau component unmount
    return () => controller.abort()
  }, [])

  // buat tombol retry di error state
  const refetch = () => {
    setLoading(true)
    setError(null)
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(setUsers)
      .catch((err) => setError(err.message || 'Something went wrong.'))
      .finally(() => setLoading(false))
  }

  return { users, loading, error, refetch }
}
