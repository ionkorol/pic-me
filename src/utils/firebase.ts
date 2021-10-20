import { firebaseConfig } from "configs";
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
