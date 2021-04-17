import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

// Optionally import the services that you want to use
//import "firebase/database";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB1Px4-E6CbQgrcQ0fF2Y9QlttHSUfMnsQ",
  authDomain: "picpic-310022.firebaseapp.com",
  projectId: "picpic-310022",
  storageBucket: "picpic-310022.appspot.com",
  messagingSenderId: "363765270863",
  appId: "1:363765270863:web:ec05b7ef56508bce4b5d3a",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
