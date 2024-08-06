import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import logo from '../../assets/tsh.png'
import { useAuth } from '../../contexts/UserContext'

const Login: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [error, setError] = useState('')
  const { currentUser, login, setUserData } = useAuth()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser) {
      navigate('/')
    }
  }, [currentUser, navigate])

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const userCredential = await login(username, password)
      if (userCredential) {
        setUserData(userCredential)
        setIsLoggedIn(true)
        if (userCredential.designation_id === 1) {
          navigate('/employeeHome')
        }
      } else {
        setError(
          'Failed to sign in. Please check your credentials and try again.'
        )
      }
    } catch (error) {
      setError(
        'Failed to sign in. Please check your credentials and try again.'
      )
    }
    setLoading(false)
  }

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <img src={logo} alt="Logo" className="logo" />
        <h2>Training Management System</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
          {error && <p className="error-msg">{error}</p>}
        </form>
      </div>
    </div>
  )
}

export default Login
