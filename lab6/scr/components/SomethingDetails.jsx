import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { itemsService } from '../services/itemsService.js'
import { Spinner } from './Spinner.jsx'
import { ErrorBox } from './ErrorBox.jsx'
import './SomethingDetails.css'

export function SomethingDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadItem() {
      try {
        setIsLoading(true)
        setError(null)
        const data = await itemsService.getById(id)
        setItem(data)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load item')
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      loadItem()
    }
  }, [id])

  if (isLoading) {
    return <Spinner />
  }

  if (error) {
    return (
      <div className="details-container">
        <ErrorBox error={error} onRetry={() => window.location.reload()} />
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>
    )
  }

  if (!item) {
    return (
      <div className="details-container">
        <div className="not-found">
          <h2>Item not found</h2>
          <p>The item you're looking for doesn't exist.</p>
        </div>
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>
    )
  }

  return (
    <div className="details-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <article className="item-details">
        {item.images && item.images.length > 0 && (
          <div className="item-images">
            <img src={item.images[0]} alt={item.title} className="item-main-image" />
            {item.images.length > 1 && (
              <div className="item-thumbnails">
                {item.images.slice(1, 4).map((img, idx) => (
                  <img key={idx} src={img} alt={`${item.title} ${idx + 2}`} className="item-thumbnail" />
                ))}
              </div>
            )}
          </div>
        )}

        <div className="item-info">
          <h1 className="item-title">{item.title}</h1>
          
          <div className="item-details-grid">
            <div className="detail-item">
              <span className="detail-label">Brand:</span>
              <span className="detail-value">{item.brand || 'N/A'}</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Category:</span>
              <span className="detail-value">{item.category || 'N/A'}</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Price:</span>
              <span className="detail-value price">${item.price || 'N/A'}</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Discount:</span>
              <span className="detail-value">{item.discountPercentage ? `${item.discountPercentage}%` : 'N/A'}</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Rating:</span>
              <span className="detail-value rating">
                {item.rating ? `⭐ ${item.rating}` : 'N/A'}
              </span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Stock:</span>
              <span className="detail-value">{item.stock !== undefined ? item.stock : 'N/A'}</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">SKU:</span>
              <span className="detail-value">{item.sku || 'N/A'}</span>
            </div>
          </div>

          <div className="item-description-section">
            <h2>Description</h2>
            <p className="item-description">{item.description || 'No description available.'}</p>
          </div>
        </div>
      </article>
    </div>
  )
}

