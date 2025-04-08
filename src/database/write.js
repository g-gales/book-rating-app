import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./config";

export async function save(data) {
  try {
    const docRef = await addDoc(collection(db, "books"), {
      // add fields
    });
    return docRef.id;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function update(id, data) {
  const docRef = doc(db, "books", id);

  try {
    await updateDoc(docRef, data);
  } catch (error) {
    console.error(error);
  }
}

export async function remove(id) {
  const docRef = doc(db, "books", id);

  try {
    await deleteDoc(docRef);
  } catch (error) {
    console.error(error);
  }
}
