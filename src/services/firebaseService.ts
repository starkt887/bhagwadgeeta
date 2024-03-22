// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUgmYG617uTUkaoH0zLcwlKOmHPRHoe1U",
  authDomain: "bhagwadgeeta-63b1c.firebaseapp.com",
  projectId: "bhagwadgeeta-63b1c",
  storageBucket: "bhagwadgeeta-63b1c.appspot.com",
  messagingSenderId: "527701662623",
  appId: "1:527701662623:web:b599ba4682044cf53dbbaa",
  measurementId: "G-2NP1QND38Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
export const firestoreDb = getFirestore(app);
// https://firebase.google.com/docs/auth/web/google-signin
// https://console.firebase.google.com/u/0/project/bhagwadgeeta-63b1c/overview