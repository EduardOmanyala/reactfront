import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './books.css';

const Check = () => {
  const { id } = useParams(); // Get book id from the URL
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (!window.FlutterwaveCheckout) {
        setError("Flutterwave script not loaded");
        setLoading(false);
        return;
      }

      // Trigger Flutterwave payment
      window.FlutterwaveCheckout({
        public_key: "FLWPUBK_TEST-20f3552e74d88c0ce534a8a29c3710e3-X", // replace with your real public key
        //tx_ref: "book-" + Date.now(), // unique transaction ref
        tx_ref: `book-${id}-${uuidv4()}`,
        amount: 150, // Replace with your dynamic amount
        currency: "KES",
        redirect_url: "http://localhost:3000/books/purchase/complete/", // adjust to your backend route
        meta: {
          book_id: id,
        },
        customer: {
          email: email,
          phone_number: "", // optional
        },
        customizations: {
          title: "Testprep Kenya",
          description: "Subscription for study items",
        },
      });

      setSuccess('Redirecting to Flutterwave...');
    } catch (err) {
      setError('Payment initiation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="customer-container">
      <div className="customer-card">
        <div className="customer-header">
          <h2>Complete Your Purchase</h2>
          <br/>
          <p>Enter email where your book should be sent.</p>
        </div>

        <form onSubmit={handleSubmit} className="customer-form">
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
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
    
  );
};

export default Check;
