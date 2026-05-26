import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { authFetch } from "../../api/auth";
import BASE_URL from "../../Config";
import "./Cpa.css";

const BOOK_ID = 12;
const amount = 200;

const GetAccess = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isPaying, setIsPaying] = useState(false);
  const buyReleaseTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (buyReleaseTimerRef.current) {
        clearTimeout(buyReleaseTimerRef.current);
        buyReleaseTimerRef.current = null;
      }
    };
  }, []);

  const handleGetAccessClick = async () => {
    if (!isAuthenticated) {
      navigate("/login");
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
      setIsPaying(false);
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
        setIsPaying(false);
        if (buyReleaseTimerRef.current) {
          clearTimeout(buyReleaseTimerRef.current);
          buyReleaseTimerRef.current = null;
        }
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

      const bookResponse = await fetch(`${BASE_URL}/books/${BOOK_ID}/`);
      if (!bookResponse.ok) {
        throw new Error("Failed to fetch book details");
      }
      const bookData = await bookResponse.json();
      const slug = bookData?.slug;
      if (!slug) {
        throw new Error("Missing book slug");
      }

      const txRef = `book-12-${userId}-${(window.crypto?.randomUUID?.() || Date.now())}`;

      window.FlutterwaveCheckout({
        public_key: "FLWPUBK-b36c7e6de3c449c08baf5c9e597ae288-X",
        tx_ref: txRef,
        amount,
        currency: "KES",
        redirect_url: `https://ken-lib.com/books/payment-confirm/${BOOK_ID}/${slug}/`,
        meta: {
          book_id: BOOK_ID,
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
      setIsPaying(false);
    }
  };

  return (
    <div className="container-getaccess">
      <div className="actions-col-ga">
        <h4 className="call2act">
          Get Access to all Answers, and Request Answers to Any Questions
        </h4>
        <button
          type="button"
          className="btn-similar-ga"
          onClick={handleGetAccessClick}
          disabled={isPaying}
        >
          {isPaying ? "Processing" : "Get Access KES 200"}
        </button>
      </div>
    </div>
  );
};

export default GetAccess;
