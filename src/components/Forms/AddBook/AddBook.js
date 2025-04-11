import React, { useState } from "react";

import Messages from "../Messages/Messages";
import "../Forms.scss";

function AddBook({ onAddBook }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (description === "" || title === "" || author === "" || genre === "") {
      setMessage("add-error");
    } else {
      setMessage("add-saving");

      await onAddBook(title, author, genre, description, status);

      // Reset the form state.
      setMessage("add-success");
      setTitle("");
      setAuthor("");
      setGenre("");
      setDescription("");
      setStatus(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Add a New Book:</h2>

        {message !== "" && <Messages message={message} />}

        <label>
          Title
          <input
            id="form-title"
            type="text"
            maxLength={150}
            value={title}
            onChange={(event) => setTitle(event.target.value)}></input>
        </label>
        <label>
          Author
          <input
            id="form-author"
            type="text"
            maxLength={150}
            value={author}
            onChange={(event) => setAuthor(event.target.value)}></input>
        </label>
        <label>
          Genre:
          <select
            id="form-sel"
            value={genre}
            onChange={(event) => setGenre(event.target.value)}>
            <option defaultValue={""} value=""></option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-Fi</option>
            <option value="fantasy">Fantasy</option>
            <option value="non-fiction">Non-Fiction</option>
            <option value="thriller">Thriller</option>
          </select>
        </label>
        <label>
          Description
          <textarea
            id="form-desc"
            maxLength={1000}
            value={description}
            rows={3}
            onChange={(event) => setDescription(event.target.value)}></textarea>
        </label>
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

        <button className="add-btn-container">Add</button>
      </form>
    </div>
  );
}

export default AddBook;
