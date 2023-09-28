// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJsf8l28fL_S_J9WScD9eufdxKflW_5M8",
  authDomain: "appointment-system-b3828.firebaseapp.com",
  projectId: "appointment-system-b3828",
  storageBucket: "appointment-system-b3828.appspot.com",
  messagingSenderId: "778181174116",
  appId: "1:778181174116:web:6b73c410937b6689261071",
  measurementId: "G-7SDLSXBXMC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db= getFirestoreDatabase(app);