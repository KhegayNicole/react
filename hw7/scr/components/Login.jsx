import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { useAuth } from '../context/AuthContext.jsx'
import { Spinner } from './Spinner.jsx'
import './Login.css'

export function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, loading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!loading && user) {
      navigate('/profile', { replace: true })
    }
  }, [user, loading, navigate])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    try {
      setIsSubmitting(true)
      await signInWithEmailAndPassword(auth, email, password)
      const redirectTo = location.state?.from?.pathname ?? '/profile'
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Welcome back</h1>
        <p className="auth-subtitle">
          Need an account?{' '}
          <Link to="/signup" className="auth-link">
            Sign up
          </Link>
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            minLength={6}
          />

          {error && <p className="auth-error">{error}</p>}

          <button className="auth-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Logging in…' : 'Log in'}
          </button>
        </form>
      </div>
    </div>
  )
}

