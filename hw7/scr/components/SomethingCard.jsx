import { Link } from 'react-router-dom'
import './SomethingCard.css'

export function SomethingCard({ item }) {
  return (
    <Link to={`/items/${item.id}`} className="item-card-link">
      <article className="item-card">
        {item.thumbnail && (
          <img src={item.thumbnail} alt={item.title} className="item-thumbnail" />
        )}
        <h3 className="item-title">{item.title}</h3>
        <div className="item-meta">
          {item.brand && <span className="item-brand">{item.brand}</span>}
          {item.price && <span className="item-price">${item.price}</span>}
        </div>
        <p className="item-description">{item.description || 'No description available'}</p>
      </article>
    </Link>
  )
}



