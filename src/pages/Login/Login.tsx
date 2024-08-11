import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import logo from '../../assets/tsh.png'
import { useAuth } from '../../contexts/UserContext'
import { validateInputs } from './validateinput'

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
    const validateVal = validateInputs(username,password)
    console.log()
    if( validateVal.isValid== false){  
      if(validateVal.errors.username && !validateVal.errors.password){
        setError(validateVal.errors.username)
        console.log(error)
      }
      if(!validateVal.errors.username && validateVal.errors.password){
        setError(validateVal.errors.password)
        console.log(error)
      }
      if(validateVal.errors.username && validateVal.errors.password){
        setError(validateVal.errors.username + validateVal.errors.password)
        console.log(error)

      }
    }
    else{
      try {
        const userCredential = await login(username, password)
        if (userCredential) {
          console.log('User credential:', userCredential)
          setUserData(userCredential)
          setIsLoggedIn(true)
          if (userCredential.role == "HOD") {
            navigate('/hodhome')
          } else if (userCredential.role == "HR") {
            navigate('/hrhome')
          } else {
            navigate('/employeehome')
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
              data-testid="username-input"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              data-testid="password-input"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
          {error && <p className="error-msg"  data-testid="error-msg">{error}</p>}
        </form>
      </div>
    </div>
  )
}

export default Login
