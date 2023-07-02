// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBnAwq23MgvJcRpjlZ7Jh5SbnGoNpwpksk",
  authDomain: "messenger-clone-e5ebd.firebaseapp.com",
  projectId: "messenger-clone-e5ebd",
  storageBucket: "messenger-clone-e5ebd.appspot.com",
  messagingSenderId: "479747561639",
  appId: "1:479747561639:web:910a0107c06ba64ded2382",
  measurementId: "G-8V56Z2CF7T"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)
