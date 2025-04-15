import { FaArrowLeft } from "react-icons/fa";

import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

import Messages from "../Messages/Messages";
import * as database from "../../../database";
import "../Forms.scss";

function RateBook({ onRateBook }) {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState("");
  const [currentBookTitle, setCurrentBookTitle] = useState("");
  const [currentBookId, setCurrentBookId] = useState("");

  const books = database.useBooks();
  const { id } = useParams();
  const navigate = useNavigate();

  // Ensures when a new book is selected, the book useStates are updated
  useEffect(() => {
    if (id && books.length > 0) {
      const selectedBook = books.find((b) => b.id === id);
      if (selectedBook) {
        setCurrentBookId(selectedBook.id);
        setCurrentBookTitle(selectedBook.title);
        setReview(selectedBook.review || "");
        setRating(selectedBook.rating ? parseInt(selectedBook.rating) : 0);
        setStatus(!!selectedBook.read);
      }
    }
  }, [id, books]);

  const handleBookChange = (title) => {
    const selectedBook = books.find((b) => b.title === title);
    if (selectedBook) {
      setCurrentBookId(selectedBook.id);
      setCurrentBookTitle(selectedBook.title);
      setReview(selectedBook.review || "");
      setRating(selectedBook.rating ? parseInt(selectedBook.rating) : 0);
      setStatus(!!selectedBook.read);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    if (review === "" || rating === 0) {
      setMessage("rate-error");
    } else if (currentBookId === "") {
      setMessage("rate-error-book");
    } else {
      setMessage("rate-saving");

      await onRateBook(currentBookId, rating, status, review);

      // Reset the form state.
      setMessage("rate-success");
      setRating(0);
      setReview("");
      setStatus(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        {id && (
          <button
            onClick={() => navigate(`/book/${id}`)}
            className="return-btn">
            <FaArrowLeft className="icon" /> Return to Book Details
          </button>
        )}

        {currentBookTitle === "" ? (
          <h2>Pick a Book to Rate</h2>
        ) : (
          <h2>Rating: "{currentBookTitle}"</h2>
        )}

        {message !== "" && <Messages message={message} />}

        {!id && (
          <label>
            <select
              id="form-sel"
              value={currentBookTitle}
              onChange={(event) => handleBookChange(event.target.value)}>
              <option value="">-- Select a Book --</option>
              {books.map((book, index) => (
                <option key={index} value={book.title}>
                  {book.title}
                </option>
              ))}
            </select>
          </label>
        )}

        <div className="read-rating">
          <div className="form-check">
            <label>
              <span>
                <input
                  type="checkbox"
                  checked={status}
                  onChange={() => setStatus(!status)}
                />
                <span></span>
              </span>
              Read
            </label>
          </div>

          <label>
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(event) => setRating(parseInt(event.target.value))}
            />
            Rating
          </label>
        </div>

        <label>
          Review
          <textarea
            id="form-review"
            maxLength={500}
            value={review}
            rows={3}
            onChange={(event) => setReview(event.target.value)}></textarea>
        </label>

        <button className="add-btn-container">Rate</button>
      </form>
    </div>
  );
}

export default RateBook;
