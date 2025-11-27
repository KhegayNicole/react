import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { SomethingCard } from './SomethingCard.jsx'
import { Spinner } from './Spinner.jsx'
import { ErrorBox } from './ErrorBox.jsx'
import { fetchItems } from '../features/items/itemsSlice.js'
import './SomethingList.css'

export function SomethingList() {
  const dispatch = useDispatch()
  const { list, loadingList, errorList } = useSelector((state) => state.items)
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''

  useEffect(() => {
    dispatch(fetchItems(query))
  }, [dispatch, query])

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

  if (loadingList) {
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

      {errorList && <ErrorBox error={errorList} onRetry={() => dispatch(fetchItems(query))} />}

      {!errorList && list.length === 0 && !loadingList && (
        <p className="no-results">No products found{query && ` for "${query}"`}</p>
      )}

      {!errorList && list.length > 0 && (
        <ul className="grid">
          {list.map(item => (
            <li key={item.id} className="grid-item">
              <SomethingCard item={item} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}


