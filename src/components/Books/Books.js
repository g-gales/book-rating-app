import "./Books.scss";

import BookTile from "./BookTile/BookTile";
import React, { useState } from "react";

function Books({ books }) {
  const [search, setSearch] = useState("");

  const filteredBooks = books.filter((book) => {
    const query = search.toLowerCase();
    return (
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query)
    );
  });
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
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => <BookTile key={book.id} book={book} />)
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </div>
  );
}

export default Books;
