import { Outlet } from 'react-router-dom'
import { NavBar } from './NavBar.jsx'
import './RootLayout.css'

export function RootLayout() {
  return (
    <div className="root-layout">
      <NavBar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}

