

import { Helmet } from "react-helmet";
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authFetch } from "../api/auth";
import BASE_URL from "../Config";
import "./books.css";

const FALLBACK_COVER =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png";

const Detail = () => {
  const { id, slug } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();

  const [book, setBook] = useState(null);
  const [hasPurchased, setHasPurchased] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [downloadBusy, setDownloadBusy] = useState(false);
  const buyReleaseTimerRef = useRef(null);
  const downloadReleaseTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (buyReleaseTimerRef.current) {
        clearTimeout(buyReleaseTimerRef.current);
        buyReleaseTimerRef.current = null;
      }
      if (downloadReleaseTimerRef.current) {
        clearTimeout(downloadReleaseTimerRef.current);
        downloadReleaseTimerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    // Fetch single book
    fetch(`${BASE_URL}/books/${id}/`)
      .then((res) => res.json())
      .then((data) => setBook(data))
      .catch((err) => console.error("Error fetching book:", err));
  }, [id, slug]);

  useEffect(() => {
    if (!isAuthenticated || !book) {
      setHasPurchased(false);
      return;
    }

    const checkPurchase = async () => {
      try {
        const response = await authFetch(
          `${BASE_URL}/purchases/check/${book.id}/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 401) {
          setHasPurchased(false);
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to check purchase status");
        }

        const data = await response.json();
        setHasPurchased(Boolean(data.purchased));
      } catch (err) {
        console.error("Error checking purchase:", err);
      }
    };

    checkPurchase();
  }, [isAuthenticated, book]);

  // Loading state (auth or book)
  if (loading || !book) {
    return <div>Loading...</div>;
  }

  // Handle Buy button click
  const handleBuyClick = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (hasPurchased) {
      return;
    }

    setIsPaying(true);
    if (buyReleaseTimerRef.current) {
      clearTimeout(buyReleaseTimerRef.current);
    }
    buyReleaseTimerRef.current = setTimeout(() => {
      setIsPaying(false);
      buyReleaseTimerRef.current = null;
    }, 6000);

    if (!window.FlutterwaveCheckout) {
      console.error("Flutterwave script is not loaded.");
      return;
    }

    try {
      const userResponse = await authFetch(`${BASE_URL}/api/user/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (userResponse.status === 401) {
        navigate("/login");
        return;
      }

      if (!userResponse.ok) {
        throw new Error("Failed to fetch current user");
      }

      const userData = await userResponse.json();
      const userId = userData?.id;
      const email = userData?.email;

      if (!userId || !email) {
        throw new Error("Missing user id or email");
      }

      const txRef = `book-${id}-${userId}-${(window.crypto?.randomUUID?.() || Date.now())}`;

      // Trigger Flutterwave payment
      window.FlutterwaveCheckout({
        public_key: "FLWPUBK-b36c7e6de3c449c08baf5c9e597ae288-X",
        tx_ref: txRef,
        amount: book?.price ?? 0,
        currency: "KES",
        redirect_url: `https://ken-lib.com/books/payment-confirm/${id}/${slug}/`,
        meta: {
          book_id: id,
          user_id: userId,
        },
        customer: {
          email,
          phone_number: "",
        },
        customizations: {
          title: "Testprep Kenya",
          description: "E-Book Purchase",
        },
      });
    } catch (err) {
      console.error("Payment initialization error:", err);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await authFetch(
        `${BASE_URL}/books/download/${book.id}/`,
        {
          method: "GET",
        }
      );

      if (response.status === 401) {
        navigate("/login");
        return;
      }

      if (!response.ok) {
        throw new Error("Download failed");
      }

      const blob = await response.blob();

      let filename = `book_${book.id}`;
      const disposition = response.headers.get("Content-Disposition");

      if (disposition && disposition.includes("filename=")) {
        filename = disposition.split("filename=")[1].replace(/"/g, "");
      }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;

      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download error:", err);
    }
  };

  const handleDownloadClick = () => {
    if (downloadBusy) return;
    setDownloadBusy(true);
    if (downloadReleaseTimerRef.current) {
      clearTimeout(downloadReleaseTimerRef.current);
    }
    downloadReleaseTimerRef.current = setTimeout(() => {
      setDownloadBusy(false);
      downloadReleaseTimerRef.current = null;
    }, 8000);
    void handleDownload();
  };

  return (
    <div className="detail-container">

       <Helmet>
        <title>{book.title}</title>
      </Helmet>



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
          <br />
          <p className="t-color">
            <strong>Author:</strong> {book.author}
          </p>
          <br />

          <div
            className="t-color"
            dangerouslySetInnerHTML={{ __html: book.info }}
          />
        </div>

        <div className="book-purchase">
          <p className="price">KES {book.price}</p>

          {/* BUY BUTTON */}
          {(!isAuthenticated || (isAuthenticated && !hasPurchased)) && (
            <button
              id="buy"
              type="button"
              className="buy-now"
              onClick={handleBuyClick}
              disabled={isPaying}
            >
              {isPaying ? "Processing" : "Buy Now"}
            </button>
          )}

          <br />

          {/* DOWNLOAD BUTTON */}
          {isAuthenticated && hasPurchased && (
            <button
              id="down-btn"
              type="button"
              className="buy-now mt-1"
              onClick={handleDownloadClick}
              disabled={downloadBusy}
              aria-busy={downloadBusy}
            >
              <span className="download-btn-inner">
                {downloadBusy && (
                  <span className="btn-inline-spinner" aria-hidden="true" />
                )}
                Download
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Detail;
