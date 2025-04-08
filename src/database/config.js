// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAH05Q6AVcenXq6i53SrbWdJ1lEj0Gb-dY",
  authDomain: "info5143---major-project.firebaseapp.com",
  projectId: "info5143---major-project",
  storageBucket: "info5143---major-project.firebasestorage.app",
  messagingSenderId: "239630701735",
  appId: "1:239630701735:web:2f07a2151b9f01c5a73782",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
