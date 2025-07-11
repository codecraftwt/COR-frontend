// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALINQ528TyJ1n5lhOU9DRM0GfJBmWrBfc",
  authDomain: "corapp-72b4e.firebaseapp.com",
  projectId: "corapp-72b4e",
  storageBucket: "corapp-72b4e.firebasestorage.app",
  messagingSenderId: "118105669603",
  appId: "1:118105669603:web:6f45fa90a3c3c39e98ead6",
  measurementId: "G-JKC228RX0H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };