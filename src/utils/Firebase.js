import * as firebase from "../../node_modules/firebase/app";
import "../../node_modules/firebase/auth";
import firebase_config from "../data/firebase_config";

// Initialize Firebase
firebase.initializeApp(firebase_config);

export default firebase;
