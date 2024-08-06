import React from 'react'
import './navbar.css'
import { useAuth } from '../../contexts/UserContext'
import currentuserImage from '../../assets/profile.jpeg'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/firebase-config'

const NavBar: React.FC = () => {
  const { userData } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      // Redirect user to login page
      window.location.href = '/'
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark shadow">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          {/* Sign Out Button */}
          <button className="btn btn-danger ms-2" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
        <div className="d-flex align-items-center">
          <div className="text-end me-2">
            <p className="curruserName mb-0">{userData?.staff_name}</p>
            <p className="curruserRole">
              {userData?.designation_id === 1
                ? 'Employee'
                : userData?.staff_name}
            </p>
          </div>
          <img
            src={currentuserImage}
            width="60"
            height="60"
            className="d-inline-block align-center rounded-circle ms-2"
            alt="User"
          />
        </div>
      </div>
    </nav>
  )
}

export default NavBar
