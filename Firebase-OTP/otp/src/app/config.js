
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/auth'
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDgd_wBab1bbYBLyHpmUKvTUOj9nyJ2Zhw",
  authDomain: "otp-send-c3a83.firebaseapp.com",
  projectId: "otp-send-c3a83",
  storageBucket: "otp-send-c3a83.firebasestorage.app",
  messagingSenderId: "41839569057",
  appId: "1:41839569057:web:d13a9a7ebe85dfb3fba8e0",
  measurementId: "G-2TJ7TT1M6K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

// export { app };