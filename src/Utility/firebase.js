import firebase from "firebase/compat/app";
//authentication
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLc6QwxoNvyxuQJXmz48tQvSrPP9m2dKA",
  authDomain: "my-clone-582f3.firebaseapp.com",
  projectId: "my-clone-582f3",
  storageBucket: "my-clone-582f3.appspot.com",
  messagingSenderId: "787865831949",
  appId: "1:787865831949:web:545c93f0b3a22ec9de6344",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = app.firestore();
