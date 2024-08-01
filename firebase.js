// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZF61W_8XbEHre8XeH_a8LFT9ipD-SWN0",
  authDomain: "inventory-management-16431.firebaseapp.com",
  projectId: "inventory-management-16431",
  storageBucket: "inventory-management-16431.appspot.com",
  messagingSenderId: "209219415559",
  appId: "1:209219415559:web:b87eecb41a5cdd338d04a2",
  measurementId: "G-XRGKYBEQ24"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore();

export {firestore};