import React, { useState } from 'react';
import axios from 'axios';
import BASE_URL from '../../Config';
import '../../books/books.css';

const Request = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await axios.post(`${BASE_URL}/api/password-reset/`, { email });
      setSubmitted(true);
    } catch (err) {
      setError(err?.response?.data?.error || 'Unable to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="customer-container">
      <div className="customer-card">
        <div className="customer-header">
          <h2>Reset Your Password</h2>
          <br />
          <p>Enter your email to receive a password reset link.</p>
        </div>

        {submitted ? (
          <div className="success-message">
            Check your email for the password reset link.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="customer-form">
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>

            <button type="submit" className="customer-button" disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Request;
