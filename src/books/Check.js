import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import BASE_URL from '../Config';
import './books.css';

const Check = () => {
  const { id } = useParams(); // Get book id from the URL
  const [book, setBook] = useState(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetch(`${BASE_URL}/books/${id}/`)
      .then((res) => res.json())
      .then((data) => setBook(data))
      .catch((err) => console.error('Error fetching book:', err));
  }, [id]);

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
        //public_key: "2182b2122e94eb6464234d1a3c85375b", // replace with your real public key
        public_key: "FLWPUBK-b36c7e6de3c449c08baf5c9e597ae288-X", // replace with your real public key
        //tx_ref: "book-" + Date.now(), // unique transaction ref
        tx_ref: `book-${id}-${uuidv4()}`,
        amount: book?.price ?? 0,
        currency: "KES",
        redirect_url: `https://api.ken-lib.com/books/purchase/complete/${id}/`, // adjust to your backend route
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

  if (!book) {
    return <div>Loading book...</div>;
  }

  return (
    <div className="customer-container">
      <div className="customer-card">
        <div className="customer-header">
          <h2>Complete Your Purchase</h2>
          <br/>
          <p>Enter email where your book should be sent.</p>
          <p className="price">KES {book.price}</p>
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
