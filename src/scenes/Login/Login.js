import React from 'react'
import * as firebase from "firebase/app"
import "firebase/auth"
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const appStorage = window.localStorage
const firebaseApiKey = process.env.REACT_APP_FIREBASE_API_KEY

const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: "apodviewer-2e111.firebaseapp.com",
  databaseURL: "https://apodviewer-2e111.firebaseio.com",
  projectId: "apodviewer-2e111",
  storageBucket: "apodviewer-2e111.appspot.com",
  messagingSenderId: "888665527053",
  appId: "1:888665527053:web:508fdc7fbf64f530801644",
  measurementId: "G-11EPTCFFN1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// This is our firebaseui configuration object
const uiConfig = ({
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      appStorage.setItem("user", JSON.stringify(authResult))
    }
  },
  signInFlow: 'popup',
  signInSuccessUrl: 'http://localhost:3000',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
  // Prevents redirect
  credentialHelper: 'none',
  tosUrl: '/terms-of-service' // This doesn't exist yet
})

/*
componentDidMount() {
  let isLoggedIn = this.isUserLoggedIn()
  this.setState({isLoggedIn: isLoggedIn})
  console.log(isLoggedIn)
}

isUserLoggedIn() {
  let token = appStorage.getItem('jwt')
  return !!token
}
*/

// TODO: Add a drawer component that slides the menu
class Login extends React.Component {
  render() {
    return(
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
    )
  }
}

export default Login