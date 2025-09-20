import React, { useState } from 'react';
import './books.css'; // Assuming books.css has the styles, or we can add them

const Customer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Here you would integrate with payment gateway
    // For now, just simulate
    try {
      // Simulate payment redirect
      setSuccess('Redirecting to payment gateway...');
      // setTimeout(() => {
      //   // Redirect to payment gateway URL
      //   window.location.href = 'https://example-payment-gateway.com'; // Replace with actual gateway
      // }, 1500);
    } catch (err) {
      setError('Payment initiation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div>
      <h1>Hello</h1>

      <div className="customer-container">
        <div className="customer-card">
          <div className="customer-header">
            <h2>Complete Your Purchase</h2>
            <p>Enter your email to proceed to payment</p>
          </div>

          <form onSubmit={handleSubmit} className="customer-form">
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            {success && (
              <div className="success-message">
                {success}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>

            <button
              type="submit"
              className="customer-button"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Make Payment'}
            </button>
          </form>
        </div>
      </div>

    </div>
  );
};

export default Customer;