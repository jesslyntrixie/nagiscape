// /src/components/AuthModal.jsx

import React, { useState, useEffect } from 'react';
const apiUrl = import.meta.env.VITE_API_BASE_URL;

function AuthModal({ isOpen, onClose, onAuthSuccess, onForgotPasswordClick }) {
  const [isLoginView, setIsLoginView] = useState(true);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);


  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setIsLoginView(true); // Selalu kembali ke tampilan login
        setError(null);
        setEmail('');
        setPassword('');
        setSuccessMessage(null);
      }, 200); 

      
      return () => clearTimeout(timer);
    }
  }, [isOpen]); // Dependensi: efek ini hanya berjalan jika 'isOpen' berubah


  if (!isOpen) {
    return null;
  }

  const handleLogin = async (e) => {
    e.preventDefault(); // supaya ga ke refresh setiap habis submit
    setIsLoading(true);
    setError(null);

    try{
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      localStorage.setItem('authToken', data.token);
      onAuthSuccess(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Error: ${response.statusText}`);
      }

      localStorage.setItem('authToken', data.token);
      setSuccessMessage(data.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleView = () => {
      setIsLoginView(!isLoginView);
      // Reset fields dan error saat ganti view
      setError(null);
      setEmail('');
      setPassword('');
  }

  const backToLogin = () => {
    setIsLoginView(true);
    setSuccessMessage(null);
    setEmail('');
    setPassword('');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>&times;</button>
        
        {isLoginView ? (
          <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin} autoComplete="off" >
              <label htmlFor="login-email">Email</label>
              <input type="email" id="login-email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <label htmlFor="login-password">Password</label>
              <input type="password" autoComplete="new-password" id="login-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <div className="modal-extra-links">
                <span onClick={onForgotPasswordClick} className="forgot-password-trigger">
                  Forgot Password?
                </span>
              </div>
              {error && <p className="error form-message">{error}</p>}
              <button type="submit" className="modal-action-btn" disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Login'}
              </button>
            </form>
            <p className="modal-toggle-text">
              Don't have an account? <span onClick={toggleView}>Sign up here</span>
            </p>
          </div>
        ) : (
          <div>
            {successMessage ? (
              <div className="modal-success-view">
                <div className="success-icon">
                  <i className="ri-mail-check-line"></i>
                </div>
                <h3>Registration Successful!</h3>
                <p className="success-instruction">{successMessage}</p>
                {/* <p className="success-instruction">Please check your inbox and click the verification link to activate your account.</p> */}
                <button className="modal-action-btn" onClick={backToLogin}>
                  Back to Login
                </button>
              </div>
            ) : (
              <>
                <h2>Sign Up</h2>
                <form onSubmit={handleRegister} autoComplete="off">
                  <label htmlFor="reg-email">Email</label>
                  <input type="email" id="reg-email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  <label htmlFor="reg-password">Password</label>
                  <input autoComplete="new-password" type="password" id="reg-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  
                  
                  {error && <p className="modal-error">{error}</p>}
                  <button type="submit" className="modal-action-btn" disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Sign Up'}
                  </button>
                </form>
                <p className="modal-toggle-text">
                  Already have an account? <span onClick={toggleView}>Login here</span>
                </p> 
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthModal;