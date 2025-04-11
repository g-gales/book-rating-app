import "./BookTile.scss";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookRating from "../BookRating/BookRating";

function BookTile({ book }) {
  const navigate = useNavigate();
  const [isRating, setIsRating] = useState(false);

  useEffect(() => {
    book.rating === 0 ? setIsRating(false) : setIsRating(true);
  }, [book.rating]);

  return (
    <div onClick={() => navigate(`/book/${book.id}`)} className="book-tile">
      <h3 className="book-title">{book.title}</h3>
      <p className="book-author">By: {book.author}</p>
      <p className="book-read">{book.read ? "READ" : "TO BE READ"}</p>
      {isRating ? (
        <BookRating rating={book.rating} />
      ) : (
        <button
          className="btn-container"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/rate/${book.id}`);
          }}>
          Rate Now!
        </button>
      )}
      <div className="book-description-wrapper">
        <p className="book-description">{book.description}</p>
      </div>
    </div>
  );
}

export default BookTile;
