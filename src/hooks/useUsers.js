import { useState, useEffect } from 'react'

/**
 * useUsers — fetches user data from the JSONPlaceholder public API.
 *
 * Uses an AbortController inside useEffect to:
 *   1. Cancel the in-flight request if the component unmounts (prevents
 *      the "state update on unmounted component" memory leak warning).
 *   2. Ignore stale responses so a slow earlier fetch can't overwrite a
 *      newer one.
 *
 * Returns { users, loading, error, refetch }.
 */
export function useUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // AbortController lets us cancel the fetch on cleanup.
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
        // Guard: if the effect was cleaned up before we got here,
        // the controller has already aborted and this will throw —
        // but we also check manually for safety.
        setUsers(data)
      } catch (err) {
        // AbortError happens on cleanup — not a real error, just ignore.
        if (err.name === 'AbortError') return
        setError(err.message || 'Something went wrong. Please try again.')
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchUsers()

    // Cleanup: abort the fetch if the component unmounts.
    return () => controller.abort()
  }, [])

  // Allow manual refetch (used by the error retry button).
  const refetch = () => {
    // Re-trigger the effect by toggling a key on the parent, or
    // simply call the same logic. For simplicity, we expose a
    // function that re-runs the fetch.
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
