import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SomethingCard } from './SomethingCard.jsx'
import { Spinner } from './Spinner.jsx'
import { ErrorBox } from './ErrorBox.jsx'
import { itemsService } from '../services/itemsService.js'
import './SomethingList.css'

export function SomethingList() {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''

  useEffect(() => {
    async function loadItems() {
      try {
        setIsLoading(true)
        setError(null)
        const data = await itemsService.getAll(query)
        setItems(data.products || [])
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load items')
      } finally {
        setIsLoading(false)
      }
    }

    loadItems()
  }, [query])

  function handleSearchChange(e) {
    const value = e.target.value
    if (value) {
      setSearchParams({ q: value })
    } else {
      setSearchParams({})
    }
  }

  function handleClearSearch() {
    setSearchParams({})
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="items-list">
      <div className="toolbar">
        <input
          className="search-input"
          type="text"
          placeholder="Search products…"
          value={query}
          onChange={handleSearchChange}
        />
        {query && (
          <button className="clear-btn" onClick={handleClearSearch}>
            Clear
          </button>
        )}
      </div>

      {error && <ErrorBox error={error} onRetry={() => window.location.reload()} />}

      {!error && items.length === 0 && !isLoading && (
        <p className="no-results">No products found{query && ` for "${query}"`}</p>
      )}

      {!error && items.length > 0 && (
        <ul className="grid">
          {items.map(item => (
            <li key={item.id} className="grid-item">
              <SomethingCard item={item} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}


