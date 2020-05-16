import * as firebase from "firebase/app";
import "firebase/auth";

const firebaseApiKey = process.env.REACT_APP_FIREBASE_API_KEY;
const firebaseName = process.env.REACT_APP_FIREBASE_NAME;
const firebaseMsgId = process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID;
const firebaseAppId = process.env.REACT_APP_FIREBASE_APP_ID;
const firebaseMeasurementId = process.env.REACT_APP_FIREBASE_MEASUREMENT_ID;

const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: `${firebaseName}.firebaseapp.com`,
  databaseURL: `https://${firebaseName}.firebaseio.com`,
  projectId: firebaseName,
  storageBucket: `${firebaseName}.appspot.com`,
  messagingSenderId: firebaseMsgId,
  appId: firebaseAppId,
  measurementId: firebaseMeasurementId,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
