import { useState, useEffect } from "react";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "./config";

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

export async function getBookById(id) {
  try {
    const docRef = doc(db, "books", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.error("No such book found.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching book:", error);
    return null;
  }
}
