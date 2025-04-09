import "./App.scss";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Books from "./components/Books/Books";
import AddBook from "./components/AddBook/AddBook";
import RateBook from "./components/RateBook/RateBook";
// import BookDetails from "./components/Books/BookDetails/BookDetails";

import * as database from "./database";

import { Routes, Route } from "react-router-dom";

function App() {
  const books = database.useBooks();

  return (
    <>
      <Header />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Books books={books} />} />
          {/* <Route path="/book/:id" element={<BookDetails />} /> */}
          <Route path="/add" element={<AddBook />} />
          <Route path="/rate" element={<RateBook />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
