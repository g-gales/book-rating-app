import { useState, useEffect } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config";

export async function load() {
  try {
    const querySnapshot = await getDocs(collection(db, "books"));

    const data = [];

    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });

    return data;
  } catch (error) {
    throw new Error("Failed to load the database");
  }
}

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
