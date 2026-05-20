import React, { useState, useEffect } from "react";
import BASE_URL from "../Config";
import { Link } from 'react-router-dom';
import "./BookBanner.css";


 const ids = [11]; // hardcoded PKs


const BookBanner = () => {


  
 

  const [book, setBook] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    // pick random ID once on load
    const randomId = ids[Math.floor(Math.random() * ids.length)];
    setId(randomId);
  }, []);

  useEffect(() => {
    if (!id) return;

    fetch(`${BASE_URL}/books/${id}/`)
      .then((res) => res.json())
      .then((data) => setBook(data))
      .catch((err) => console.error("Error fetching book:", err));
  }, [id]);

   if (!book) return <p>Loading...</p>; // prevent null crash

  return (
    <div className="container-bkbanner">

      {/* ── Column 1: Book Cover ── */}
      <div className="cover-col-bkbanner">
        <img
          className="cover-img-bkbanner"
          src={book.pdf_file}
          alt="The Let Them Theory book cover"
        />
      </div>

      {/* ── Column 2: Book Info ── */}
      <div className="info-col-bkbanner">
        <p className="bestseller-badge-bkbanner">Money . Investments</p>

        <h1 className="title-bkbanner">
          {book.title}
        </h1>

        <p className="authors-bkbanner">
          by{" "}
          <Link className="author-link-bkbanner" to={`/books/${book.id}/${book.slug}`}>{book.author}</Link> (Author),{" "}
          {/* <a className="author-link-bkbanner" href="https://www.youtube.com/">{book.author}</a> (Author),{" "} */}
          {/* <a className="author-link-bkbanner" href="https://www.youtube.com/">Sawyer Robbins</a> (Author) */}
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <span className="format-label-bkbanner">Format: <strong>E-Book</strong></span>
        </p>

        <div className="ratings-row-bkbanner">
          <span className="stars-bkbanner">★★★★</span>
          <Link className="rating-count-bkbanner" to={`/books/${book.id}/${book.slug}`}>42,440</Link>
          {/* <a className="rating-count-bkbanner" href="https://www.youtube.com/">42,440</a> */}
          <span className="goodreads-bkbanner">4.0 &nbsp;1,509 ratings</span>
        </div>

        <div
            
            dangerouslySetInnerHTML={{ __html: book.adinfo }}
          />
   

       
        <Link className="read-more-bkbanner" to={`/books/${book.id}/${book.slug}`}>▾ Read more</Link>
       
      </div>

      {/* ── Column 3: Action Buttons (top-aligned) ── */}
      <div className="actions-col-bkbanner">
        <Link to={`/books/${book.id}/${book.slug}`} className="btn-similar-bkbanner">
        KES {book.price}
        </Link>

        <Link to={`/books/${book.id}/${book.slug}`} className="btn-buying-bkbanner">
        Buy Now
        </Link>
        {/* <button className="btn-list-bkbanner">Add to List</button> */}
      </div>

    </div>
  );
};

export default BookBanner;
