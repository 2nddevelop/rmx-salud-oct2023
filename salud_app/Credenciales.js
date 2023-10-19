// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFJBgnEPMGCKZ4OYf-9LVCuhVanKABvYk",
  authDomain: "dbcocaroad.firebaseapp.com",
  projectId: "dbcocaroad",
  storageBucket: "dbcocaroad.appspot.com",
  messagingSenderId: "1030674304120",
  appId: "1:1030674304120:web:5bc3b020317d8760fe318d"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

export default appFirebase;