import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BASE_URL from '../Config';
import './books.css';

const Ebooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${BASE_URL}/books/`);
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        const data = await response.json();
        // Map backend data to frontend structure
        const mappedBooks = data.map(book => ({
          id: book.id,
          title: book.title,
          cover: book.pdf_file ? `${BASE_URL}${book.pdf_file}` : 'https://via.placeholder.com/300x400?text=No+Cover', // Placeholder if no cover
          price: book.price, // Default price, can be added to model later
          slug: book.slug,
          author: book.author
        }));
        setBooks(mappedBooks);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Commented out dummy data
  /*
  const books = [
    {
      id: 1,
      title: "The Great Gatsby",
      cover: "https://images-na.ssl-images-amazon.com/images/I/81af+MCATTL.jpg",
      price: "$12.99",
      slug: "the-great-gatsby"
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      cover: "https://images-na.ssl-images-amazon.com/images/I/81aY1lxk+9L.jpg",
      price: "$14.99",
      slug: "to-kill-a-mockingbird"
    },
    {
      id: 3,
      title: "1984",
      cover: "https://images-na.ssl-images-amazon.com/images/I/71kxa1-0mfL.jpg",
      price: "$11.99",
      slug: "1984"
    },
    {
      id: 4,
      title: "Pride and Prejudice",
      cover: "https://images-na.ssl-images-amazon.com/images/I/81NLDvyAHrL.jpg",
      price: "$13.99",
      slug: "pride-and-prejudice"
    }
  ];
  */

  if (loading) {
    return (
      <div className="ebooks-container">
        <h1 className="ebooks-header1">Ebooks</h1>
        <p>Loading books...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ebooks-container">
        <h1 className="ebooks-header1">Ebooks</h1>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="ebooks-container">
      <h1 className="ebooks-header1">Ebooks</h1>
      <div className="books-grid">
        {books.map(book => (
          <Link key={book.id} to={`/books/${book.id}/${book.slug}`} className="book-card-link">
            <div className="book-card">
              <img src={book.cover} alt={book.title} className="book-cover" />
              <h3 className="book-title">{book.title}</h3>
              <p className="book-price">KES {book.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Ebooks;