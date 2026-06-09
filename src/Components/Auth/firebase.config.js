// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBmigliEaw-HmTvHkKhSHcY6NSrYlQAp9Y",
  authDomain: "smart-phone-auth.firebaseapp.com",
  projectId: "smart-phone-auth",
  storageBucket: "smart-phone-auth.firebasestorage.app",
  messagingSenderId: "464262955254",
  appId: "1:464262955254:web:dedf627347e16928576cd7",
  measurementId: "G-LTL1TVHNV4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
