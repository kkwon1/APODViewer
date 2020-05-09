import { useState, useCallback } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";

async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

const SaveApod = ({ url, payload }) => {
  const [saveState, setSaveState] = useState({
    data: null,
    error: null,
    isLoading: false,
  });

  const saveApod = useCallback(() => {
    console.log("Saving APOD!");
    setSaveState((prevState) => ({ ...prevState, isLoading: true }));

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        user.getIdToken().then(function (idToken) {
          payload.IDToken = idToken;
          payload.UserID = user.uid;

          postData(url, payload)
            .then((res) => {
              let parsedData = JSON.parse(atob(res));
              setSaveState({
                ...saveState,
                data: parsedData,
                isLoading: false,
              });
            })
            .catch((err) => {
              setSaveState((prevState) => ({
                ...prevState,
                error: err,
                isLoading: false,
              }));
            });
        });
      } else {
        // Raise an error
      }
    });
  }, [url, payload, saveState]);

  return [saveState, saveApod];
};

export default SaveApod;
