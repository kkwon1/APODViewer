import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import styled from "styled-components";
import firebase from "../../utils/Firebase";

const appStorage = window.localStorage;

const FirebaseLogin = styled(StyledFirebaseAuth)`
  padding: 3rem;
`;

// This is our firebaseui configuration object
const uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
  // Prevents redirect
  credentialHelper: "none",
  tosUrl: "/terms-of-service", // This doesn't exist yet
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      appStorage.setItem("user", JSON.stringify(authResult));
      window.location = process.env.REACT_APP_MAIN_PAGE_URL;
    },
  },
};

// TODO: Add a drawer component that slides the menu
class Login extends React.Component {
  render() {
    return <FirebaseLogin uiConfig={uiConfig} firebaseAuth={firebase.auth()} />;
  }
}

export default Login;
