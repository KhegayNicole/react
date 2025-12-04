import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import './NavBar.css'

export function NavBar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, loading, logout } = useAuth()

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  const handleLogout = async () => {
    await logout()
    navigate('/login')
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

          {!loading && !user && (
            <>
              <li>
                <Link
                  to="/login"
                  className={isActive('/login') ? 'navbar-link active' : 'navbar-link'}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className={isActive('/signup') ? 'navbar-link active' : 'navbar-link'}
                >
                  Sign up
                </Link>
              </li>
            </>
          )}

          {!loading && user && (
            <>
              <li>
                <Link
                  to="/profile"
                  className={isActive('/profile') ? 'navbar-link active' : 'navbar-link'}
                >
                  Profile
                </Link>
              </li>
              <li>
                <button type="button" className="navbar-button" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

