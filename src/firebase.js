import firebase from "firebase/app";
import "firebase/auth";
// import "firebase/database";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: YOUR_FIREBASE_API_KEY,
  authDomain: "group-chat-web-app.firebaseapp.com",
  databaseURL: "https://group-chat-web-app.firebaseio.com",
  projectId: "group-chat-web-app",
  storageBucket: "group-chat-web-app.appspot.com",
  messagingSenderId: "185560438358",
  appId: "1:185560438358:web:02b3c80719b1bd6bbe4df7",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth;
export const db = firebase.firestore();
