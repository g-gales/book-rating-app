import "./BookTile.scss";

import { useNavigate } from "react-router-dom";

function BookTile({ book }) {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/book/${book.id}`)} className="book-tile">
      <h3 className="book-title">{book.title}</h3>
      <p className="book-author">{book.author}</p>
      <p className="book-read">{book.read ? "READ" : "TO BE READ"}</p>
      {/* stars */}
      <p className="book-description">{book.description}</p>
    </div>
  );
}

export default BookTile;
