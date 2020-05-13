import * as firebase from "./node_modules/firebase/app";
import "./node_modules/firebase/auth";

const firebaseApiKey = process.env.REACT_APP_FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: "apodviewer-2e111.firebaseapp.com",
  databaseURL: "https://apodviewer-2e111.firebaseio.com",
  projectId: "apodviewer-2e111",
  storageBucket: "apodviewer-2e111.appspot.com",
  messagingSenderId: "888665527053",
  appId: "1:888665527053:web:508fdc7fbf64f530801644",
  measurementId: "G-11EPTCFFN1",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
