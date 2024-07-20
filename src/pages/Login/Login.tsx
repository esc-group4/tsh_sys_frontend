import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../../assets/tsh.png';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { LoginProps } from './Login.types';
import { useAuth } from "../../contexts/UserContext";

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add a state for login status
  const [error, setError] = useState('');
  const { currentUser, login  } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);





  const handleLogin = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userCredential = await login(username, password); // we use the login from the user context
    if (userCredential) {
      const user = userCredential.user;
      const token = await user.getIdToken();
      const response = await fetch('http://localhost:3001/api/verifyToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      
  
      if (!response.ok) {
        throw new Error('Token verification failed');
      }
      const userData = await response.json();
      console.log('User data:', userData);
      console.log("Login successful, userCredential:", userCredential);
      // You can now use the token to authenticate requests to your backend
      setIsLoggedIn(true);
      navigate("/employeeHome"); // will change based on the user's role
    } else {
      setError("Failed to sign in. Please check your credentials and try again.");
    }
    setLoading(false);
  };


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
  );
};

export default Login;
