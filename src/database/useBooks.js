// useBooks.js
import { useState, useEffect } from "react";
import { db } from "./config";
import { collection, onSnapshot } from "firebase/firestore";

export const useBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "books"), (snapshot) => {
      setBooks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsub();
  }, []);

  return books;
};
