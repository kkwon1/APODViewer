import * as firebase from "../../node_modules/firebase/app";
import "../../node_modules/firebase/auth";

const firebaseApiKey = process.env.FIREBASE_API_KEY;
const firebaseName = process.env.FIREBASE_NAME;
const firebaseMsgId = process.env.FIREBASE_MESSAGING_SENDER_ID;
const firebaseAppId = process.env.FIREBASE_APP_ID;
const firebaseMeasurementId = process.env.FIREBASE_MEASUREMENT_ID;

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
