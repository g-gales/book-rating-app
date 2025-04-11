import React, { useState, useEffect } from "react";

import Messages from "../Messages/Messages";
import "../Forms.scss";

function RateBook({ onRateBook, books }) {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(null);
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState("");
  const [currentBookTitle, setCurrentBookTitle] = useState("");
  const [currentBookId, setCurrentBookId] = useState("");

  // Ensures when a new book is selected, the book useStates are updated
  useEffect(() => {
    if (currentBookId) {
      const selectedBook = books.find((b) => b.id === currentBookId);

      setReview(selectedBook.review);
      setRating(parseInt(selectedBook.rating));
      setStatus(selectedBook.read);
    }
  }, [currentBookId, books]);

  const handleBookChange = (title) => {
    const selectedBook = books.find((b) => b.title === title);
    setCurrentBookId(selectedBook.id);
    setCurrentBookTitle(title);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    if (review === "" || rating === null) {
      setMessage("rate-error");
    } else if (currentBookId === "") {
      setMessage("rate-error-book");
    } else {
      setMessage("rate-saving");

      await onRateBook(currentBookId, rating, status, review);

      // Reset the form state.
      setMessage("rate-success");
      setRating(null);
      setReview("");
      setStatus(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        {currentBookTitle === "" ? (
          <h2>Pick a Book to Rate</h2>
        ) : (
          <h2>Rating: "{currentBookTitle}"</h2>
        )}

        {message !== "" && <Messages message={message} />}

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

        <div className="read-rating">
          <div className="form-check">
            <label>
              <span>
                <input
                  type="checkbox"
                  checked={status}
                  onClick={() => setStatus(!status)}
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
