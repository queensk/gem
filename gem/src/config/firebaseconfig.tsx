// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYWESvtkJ6hBuCIQ7QlJDhRdx1Pt6v6EY",
  authDomain: "gemapp-119be.firebaseapp.com",
  projectId: "gemapp-119be",
  storageBucket: "gemapp-119be.appspot.com",
  messagingSenderId: "281309508536",
  appId: "1:281309508536:web:c1688e344a980b9fca954d",
  measurementId: "G-YPY8LPRGE2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const storage = getStorage(app);
export default storage;
