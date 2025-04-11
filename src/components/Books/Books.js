import "./Books.scss";

import BookTile from "./BookTile/BookTile";
import React, { useState } from "react";

function Books({ books }) {
  const [search, setSearch] = useState("");
  return (
    <div className="library-container">
      <div className="books-title-container">
        <h2 className="books-title">In the Library</h2>
        <input
          id="search"
          className="search"
          type="text"
          placeholder="Search"
          maxLength={150}
          value={search}
          onChange={(event) => setSearch(event.target.value)}></input>
      </div>
      <div className="books-container">
        {books.map((book, index) => (
          <BookTile key={index} book={book} />
        ))}
      </div>
    </div>
  );
}

export default Books;
