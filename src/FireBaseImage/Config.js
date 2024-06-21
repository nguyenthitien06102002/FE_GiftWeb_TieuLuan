// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTB_hw42FI7LmL9eH2bW3PyzgYpPjXesY",
  authDomain: "giftweb.firebaseapp.com",
  projectId: "giftweb",
  storageBucket: "giftweb.appspot.com",
  messagingSenderId: "541683500646",
  appId: "1:541683500646:web:b797dc0b19eeaf3fbd4fa7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app);