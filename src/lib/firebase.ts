import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYdupgA3x-dlrZ9V78eM2tbVCpOx1mfQA",
  authDomain: "brandshoots-be2c8.firebaseapp.com",
  projectId: "brandshoots-be2c8",
  storageBucket: "brandshoots-be2c8.firebasestorage.app",
  messagingSenderId: "226623626742",
  appId: "1:226623626742:web:b0d238e66046ffab3ffbd7",
  databaseURL: "https://brandshoots-be2c8-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
export const database = getDatabase(app);

// Initialize Firebase services if needed
// export const auth = getAuth(app);
// export const db = getFirestore(app);
// export const storage = getStorage(app);
