import { useMemo, useState, useEffect } from 'react'
import { SomethingCard } from './SomethingCard.jsx'
import './SomethingList.css'

const GHIBLI_FILMS_API = '/api/films'

export function SomethingList() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return movies
    return movies.filter(m => (m.title || '').toLowerCase().includes(q))
  }, [movies, search])

  useEffect(() => {
    console.log('SomethingList component mounted')
  }, [])

  useEffect(() => {
    console.log('Movies updated:', movies.length, 'items')
  }, [movies])

  async function handleLoad() {
    try {
      setIsLoading(true)
      setError(null)
      const res = await fetch(GHIBLI_FILMS_API)
      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      const data = await res.json()
      setMovies(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }

  function handleClearSearch() {
    setSearch('')
  }

  return (
    <div className="movies-list">
      <div className="toolbar">
        <button className="load-btn" onClick={handleLoad} disabled={isLoading}>
          {isLoading ? 'Loading…' : 'Load movies'}
        </button>
        <input
          className="search-input"
          type="text"
          placeholder="Search by title…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="clear-btn" onClick={handleClearSearch} disabled={!search}>
          Clear
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      <ul className="grid">
        {filtered.map(movie => (
          <li key={movie.id} className="grid-item">
            <SomethingCard movie={movie} />
          </li>
        ))}
      </ul>
    </div>
  )
}


