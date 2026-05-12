import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    pass1: '',
    pass2: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (formData.pass1 !== formData.pass2) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      await register({
        email: formData.email.trim(),
        pass1: formData.pass1,
        pass2: formData.pass2,
      });
      setSuccess('Account created!');

      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Create account</h2>
          <p>Sign up with your email</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}

          {success && <div className="success-message">{success}</div>}

          <div className="form-group-log">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group-log">
            <label htmlFor="pass1">Password</label>
            <input
              type="password"
              id="pass1"
              name="pass1"
              value={formData.pass1}
              onChange={handleChange}
              required
              autoComplete="new-password"
              placeholder="Choose a password"
            />
          </div>

          <div className="form-group-log">
            <label htmlFor="pass2">Confirm password</label>
            <input
              type="password"
              id="pass2"
              name="pass2"
              value={formData.pass2}
              onChange={handleChange}
              required
              autoComplete="new-password"
              placeholder="Confirm your password"
            />
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Creating account...' : 'Sign up'}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="link">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
