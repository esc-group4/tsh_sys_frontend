import React, { useEffect, useState } from 'react'
import './navbar.css'
import { useAuth } from '../../contexts/UserContext'
import currentuserImage from '../../assets/profile.jpeg'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/firebase-config'

const NavBar: React.FC = () => {
  const { userData } = useAuth()
  const [designationName, setDesignationName] = useState('')

  useEffect(() => {
    const fetchDesignationName = async () => {
      if (userData?.designation_id) {
        try {
          const name = await getDesignationName(userData.designation_id)
          setDesignationName(name)
        } catch (error) {
          setDesignationName('Unknown')
        }
      }
    }

    fetchDesignationName()
  }, [userData?.designation_id])

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
            <p className="curruserRole">{designationName}</p>
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

// Function to fetch designation name
const getDesignationName = async (designationId: number) => {
  try {
    const response = await fetch(`http://localhost:8080/designation/1`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    return data.position
  } catch (error) {
    console.error('Error fetching designation name:', error)
    return 'Unknown'
  }
}
