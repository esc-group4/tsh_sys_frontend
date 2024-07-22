import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../../assets/tsh.png';
import { useAuth } from '../../contexts/UserContext';
import { validateInputs } from './validateinput';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [inputErrors, setInputErrors] = useState<{ username?: string; password?: string }>({});
  const { currentUser, login, setUserData } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { isValid, errors } = validateInputs(username, password);
    setInputErrors(errors);

    if (!isValid) {
      return;
    }

    try {
      setLoading(true);
      const userCredential = await login(username, password);
      if (userCredential) {
        const user = userCredential.user;
        const token = await user.getIdToken();
        const response = await fetch('http://localhost:3001/token/verifyToken', {
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
        setUserData(userData);
        setIsLoggedIn(true);
        if (userData) {
          navigate('/employeeHome');
        }
      }
    } catch (error) {
      setError('Failed to sign in. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
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
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
            {inputErrors.username && <p className="error-msg">{inputErrors.username}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {inputErrors.password && <p className="error-msg">{inputErrors.password}</p>}
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {error && <p className="error-msg">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
