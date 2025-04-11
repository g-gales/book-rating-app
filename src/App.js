import "./App.scss";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Books from "./components/Books/Books";
import AddBook from "./components/Forms/AddBook/AddBook";
import RateBook from "./components/Forms/RateBook/RateBook";
import BookDetails from "./components/Books/BookDetails/BookDetails";

import * as database from "./database";

import { Routes, Route } from "react-router-dom";

function App() {
  const books = database.useBooks();

  const handleAddBook = async (title, author, genre, desc, stat) => {
    const data = {
      title: title,
      author: author,
      genre: genre,
      description: desc,
      read: stat,
    };
    const savedId = await database.save(data);
    data.id = savedId;
  };

  const handleRateBook = (id, rating, read, review) => {
    books.forEach((book) => {
      if (book.id === id) {
        const data = { rating: rating, read: read, review: review };
        database.update(id, data);
      }
    });
  };

  return (
    <div className="app-container">
      <Header />
      <main className="main-container">
        <Routes>
          <Route path="/" element={<Books books={books} />} />
          <Route path="book/:id" element={<BookDetails />} />
          <Route path="/add" element={<AddBook onAddBook={handleAddBook} />} />
          <Route
            path="/rate/:id?"
            element={<RateBook onRateBook={handleRateBook} />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
