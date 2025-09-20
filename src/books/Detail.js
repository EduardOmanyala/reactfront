

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./books.css";

const BASE_URL = "http://127.0.0.1:8000"; // change to your backend URL
const FALLBACK_COVER =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png";

const Detail = () => {
  const { id, slug } = useParams();
  const [book, setBook] = useState(null);
  const [allBooks, setAllBooks] = useState([]);
  const [showCustomer, setShowCustomer] = useState(false);

  useEffect(() => {
    // Fetch single book
    fetch(`${BASE_URL}/books/${id}/`)
      .then((res) => res.json())
      .then((data) => setBook(data))
      .catch((err) => console.error("Error fetching book:", err));

    // Fetch all for related section
    fetch(`${BASE_URL}/books/`)
      .then((res) => res.json())
      .then((data) => setAllBooks(data))
      .catch((err) => console.error("Error fetching books:", err));
  }, [id, slug]);

  if (!book) {
    return <div>Loading book...</div>;
  }

  const relatedBooks = allBooks
    .filter((b) => b.id !== book.id)
    .slice(0, 3);

  return (
    <div className="detail-container">
      <div className="book-detail-grid">
        <div className="book-cover-detail">
          <img
            src={book.pdf_file || FALLBACK_COVER}
            alt={book.title}
            onError={(e) => (e.target.src = FALLBACK_COVER)}
          />
        </div>
        <div className="book-info">
          <h1 className="t-color">{book.title}</h1>
          <br/>
          <p className="t-color"><strong>Author:</strong> {book.author}</p>
          <br/>
          <p className="t-color">{book.summary}</p>
        </div>
        <div className="book-purchase">
          <p className="price">$14.99</p> {/* Add real price field if you have it */}
          <button className="buy-now">
            Buy Now
          </button>
        </div>
      </div>

      <div className="related-books">
        <h2 className="t-color">Related Books</h2>
        <div className="books-grid">
          {relatedBooks.map((relBook) => (
            <Link
              key={relBook.id}
              to={`/books/${relBook.id}/${relBook.slug}`}
              className="book-card-link"
            >
              <div className="book-card">
                <img
                  src={relBook.pdf_file || FALLBACK_COVER}
                  alt={relBook.title}
                  className="book-cover"
                  onError={(e) => (e.target.src = FALLBACK_COVER)}
                />
                <h3 className="book-title">{relBook.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      
    </div>
  );
};

export default Detail;
