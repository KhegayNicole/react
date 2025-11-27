import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { Spinner } from './Spinner.jsx'
import './Profile.css'

export function Profile() {
  const navigate = useNavigate()
  const { user, loading, logout } = useAuth()

  if (loading) {
    return <Spinner />
  }

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div>
          <p className="profile-eyebrow">Signed in as</p>
          <h1 className="profile-title">{user?.email}</h1>
        </div>

        <dl className="profile-details">
          <div>
            <dt>User ID</dt>
            <dd>{user?.uid}</dd>
          </div>
          {user?.metadata?.creationTime && (
            <div>
              <dt>Created</dt>
              <dd>{new Date(user.metadata.creationTime).toLocaleString()}</dd>
            </div>
          )}
          {user?.metadata?.lastSignInTime && (
            <div>
              <dt>Last sign-in</dt>
              <dd>{new Date(user.metadata.lastSignInTime).toLocaleString()}</dd>
            </div>
          )}
        </dl>

        <button className="profile-logout" type="button" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </div>
  )
}


