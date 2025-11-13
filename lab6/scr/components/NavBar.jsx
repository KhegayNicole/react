import { Link, useLocation } from 'react-router-dom'
import './NavBar.css'

export function NavBar() {
  const location = useLocation()

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          EVRTHNG store
        </Link>
        <ul className="navbar-links">
          <li>
            <Link 
              to="/" 
              className={isActive('/') ? 'navbar-link active' : 'navbar-link'}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/about" 
              className={isActive('/about') ? 'navbar-link active' : 'navbar-link'}
            >
              About
            </Link>
          </li>
          <li>
            <Link 
              to="/items" 
              className={isActive('/items') ? 'navbar-link active' : 'navbar-link'}
            >
              Products
            </Link>
          </li>
          <li>
            <Link 
              to="/login" 
              className={isActive('/login') ? 'navbar-link active' : 'navbar-link'}
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

