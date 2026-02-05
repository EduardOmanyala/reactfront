

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const BASE_URL = "https://api.ken-lib.com";
const FALLBACK_COVER =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png";

export default function Complete() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    // Fetch single book
    fetch(`${BASE_URL}/books/${id}/`)
      .then((res) => res.json())
      .then((data) => setBook(data))
      .catch((err) => console.error("Error fetching book:", err));
  }, [id]);

  if (!book) {
    return <div>Loading book...</div>;
  }

  return (
    <div className="purchase-complete-container">
      <style>{`
        .purchase-complete-container {
          max-width: 640px;
          margin: 0 auto;
          margin-bottom: 10rem;
          padding: 24px 16px 40px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif;
          text-align: center;
        }

        .purchase-complete-icon {
          width: 56px;
          height: 56px;
          margin: 0 auto 16px;
        }

        .purchase-complete-title {
          font-size: 28px;
          font-weight: 600;
          color: white;
          margin-bottom: 8px;
        }

        .purchase-complete-order {
          font-size: 15px;
          color: #6b7280;
          margin-bottom: 12px;
        }

        .purchase-complete-description {
          font-size: 15px;
          color: #6b7280;
          line-height: 1.5;
          margin-bottom: 24px;
        }

        .purchase-complete-button {
          display: block;
          width: 100%;
          max-width: 420px;
          margin: 0 auto 28px;
          padding: 14px 16px;
          background: #35b6e6;
          color: #ffffff;
          font-size: 16px;
          font-weight: 600;
          border-radius: 9999px;
          border: none;
          cursor: pointer;
        }

        .purchase-complete-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 16px;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          max-width: 420px;
          margin: 0 auto;
        }

        .purchase-complete-thumbnail {
          width: 56px;
          height: 56px;
          border-radius: 8px;
          background: #f3f4f6;
          object-fit: cover;
          flex-shrink: 0;
        }

        .purchase-complete-card-text {
          text-align: left;
        }

        .purchase-complete-product {
          font-size: 15px;
          font-weight: 600;
          color: white;
        }

        .purchase-complete-subtitle {
          font-size: 13px;
          color: #6b7280;
        }

        @media (max-width: 480px) {
          .purchase-complete-title {
            font-size: 24px;
          }
        }
      `}</style>

      <div className="purchase-complete-icon">
        <svg viewBox="0 0 24 24" width="56" height="56" fill="none">
          <circle cx="12" cy="12" r="11" stroke="#16a34a" strokeWidth="2" />
          <path
            d="M7 12.5l3.2 3.2L17 9"
            stroke="#16a34a"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="purchase-complete-title">Purchase complete!</div>

      <div className="purchase-complete-order">
        Your order number is <strong>54609347</strong>
      </div>

      <div className="purchase-complete-description">
        Your purchase is complete. Your book has been sent to the email you provided.
      </div>

      <button className="purchase-complete-button">Browse books</button>

      <div className="purchase-complete-card">
        <img
          className="purchase-complete-thumbnail"
          src={book.pdf_file || FALLBACK_COVER}
          alt={book.title}
          onError={(e) => (e.target.src = FALLBACK_COVER)}
        />
        <div className="purchase-complete-card-text">
          <div className="purchase-complete-product">{book.title}</div>
          <div className="purchase-complete-subtitle">
            By {book.author}
          </div>
        </div>
      </div>
    </div>
  );
}

