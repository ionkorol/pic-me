import { firebaseConfig } from "configs";
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

// Optionally import the services that you want to use
//import "firebase/database";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
