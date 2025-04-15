import { FaArrowLeft } from "react-icons/fa";

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import "./BookDetails.scss";
import BookRating from "../BookRating/BookRating";
import * as database from "../../../database";

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [bookGenre, setBookGenre] = useState("");
  const [isRating, setIsRating] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      const bookData = await database.getBookById(id);
      if (bookData) {
        setBook(bookData);
      }

      switch (bookData.genre) {
        case "romance":
          setBookGenre("Romance");
          break;
        case "sci-fi":
          setBookGenre("Sci-Fi");
          break;
        case "fantasy":
          setBookGenre("Fantasy");
          break;
        case "non-fiction":
          setBookGenre("Non-Fiction");
          break;
        case "thriller":
          setBookGenre("Thriller");
          break;
        default:
          setBookGenre("");
      }

      bookData.rating === 0 ? setIsRating(false) : setIsRating(true);
    };

    fetchBook();
  }, [id]);

  if (!book) return <p className="loading">Loading book details...</p>;

  const handleRemove = () => {
    if (
      window.confirm(
        "Deleting a book is a permenant action. Are you sure you want to continue?"
      )
    ) {
      database.remove(book.id);
      navigate("/");
    }
  };

  return (
    <div className="book-details-container">
      <div className="book-details">
        <button onClick={() => navigate("/")} className="return-btn">
          <FaArrowLeft className="icon" /> Return to Library
        </button>

        <h2>{book.title}</h2>
        <div className="author-genre-container">
          <p className="details-author">By: {book.author}</p>
          <p className="details-genre">{bookGenre}</p>
        </div>

        <p className="book-read">{book.read ? "READ" : "TO BE READ"}</p>
        {isRating ? (
          <BookRating rating={book.rating} />
        ) : (
          <button
            className="rate-btn"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/rate/${book.id}`);
            }}>
            Rate Now!
          </button>
        )}
        <h3>Synopsis</h3>
        <p>{book.description}</p>
        {book.review && (
          <>
            <h3>Review</h3>
            <p>{book.review}</p>
          </>
        )}
        <div className="e-r-btn-container">
          {isRating && (
            <button
              className="edit-btn"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/rate/${book.id}`);
              }}>
              Edit Review
            </button>
          )}
          <button className="delete-btn" onClick={handleRemove}>
            Remove Book
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
