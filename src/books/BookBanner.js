import React, { useState, useEffect } from "react";
import BASE_URL from "../Config";
import { Link } from 'react-router-dom';
import "./BookBanner.css";


 const ids = [11, 10]; // hardcoded PKs


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
          <a className="author-link-bkbanner" href="https://www.youtube.com/">{book.author}</a> (Author),{" "}
          {/* <a className="author-link-bkbanner" href="https://www.youtube.com/">Sawyer Robbins</a> (Author) */}
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <span className="format-label-bkbanner">Format: <strong>E-Book</strong></span>
        </p>

        <div className="ratings-row-bkbanner">
          <span className="stars-bkbanner">★★★★</span>
          <a className="rating-count-bkbanner" href="https://www.youtube.com/">42,440</a>
          <span className="goodreads-bkbanner">4.0 &nbsp;1,509 ratings</span>
        </div>

        <div
            
            dangerouslySetInnerHTML={{ __html: book.info }}
          />
   

        {/* <div className="charts-row-bkbanner">
          <span className="charts-badge-bkbanner">Amazon Charts</span>
          <a className="charts-rank-bkbanner" href="https://www.youtube.com/">#2 this week</a>
        </div> */}

        {/* <div className="accolades-bkbanner">
          <p className="accolade-bkbanner">Over 10 Million Copies Sold!</p>
          <p className="accolade-bkbanner">#1 <span>New York Times</span> Bestseller</p>
          <p className="accolade-bkbanner">#1 <span>Sunday Times</span> Bestseller</p>
          <p className="accolade-bkbanner">#1 Amazon Bestseller</p>
          <p className="accolade-bkbanner">#1 Audible Bestseller</p>
        </div> */}

        {/* <p className="description-title-bkbanner">
          A Life-Changing Tool Millions of People Can't Stop Talking About
        </p>

        <p className="description-text-bkbanner">
          What if the key to happiness, success, and love was as simple as two words?
        </p>

        <p className="description-text-bkbanner">
          If you've ever felt stuck, overwhelmed, or frustrated with where you are, the problem isn't
          you. The problem is the power you give to other people. Two simple words—<em>Let Them</em>—will
          set you free. Free from the opinions, drama, and judgments of others. Free from the exhausting
          cycle of trying to manage everything and everyone...
        </p> */}

        <a className="read-more-bkbanner" href="https://www.youtube.com/">▾ Read more</a>
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
