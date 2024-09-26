// src/pages/Login.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { login } from '../store/actions/authActions'; // Import login action

// interface LoginProps {
//   onLogin: () => void; // Remove this if Redux manages authentication entirely
// }

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  
  const navigate = useNavigate(); // To programmatically navigate after login
  const dispatch = useDispatch<AppDispatch>(); // Typed dispatch for async actions
  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // If authenticated, redirect to home page
    if (auth.isAuthenticated) {
      localStorage.setItem('isAuthenticated', 'true'); // Save login status to localStorage
      navigate('/'); // Redirect to home page after login
    }
  }, [auth.isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Dispatch login action, Redux will handle auth state
    dispatch(login({ username, password }));
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {auth.error && <div className="alert alert-danger">{auth.error}</div>}
        {/* Display error if authentication fails */}
        <button type="submit" className="btn btn-primary" disabled={auth.loading}>
          {auth.loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
