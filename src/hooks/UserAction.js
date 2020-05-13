import { useState, useCallback } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";

async function postData(url = "", data = {}, bearer) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

const UserAction = ({ url, payload }) => {
  const [actionState, setUserAction] = useState({
    data: null,
    error: null,
    isLoading: false,
  });

  const userAction = useCallback(
    (action) => {
      setUserAction({ ...actionState, isLoading: true });

      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          user.getIdToken().then(function (idToken) {
            let bearer = "Bearer " + idToken;
            payload.UserID = user.uid;
            payload.Action = action;

            postData(url, payload, bearer)
              .then((res) => {
                let parsedData = JSON.parse(atob(res));
                setUserAction({
                  ...actionState,
                  data: parsedData,
                  isLoading: false,
                });
              })
              .catch((err) => {
                setUserAction({
                  ...actionState,
                  error: err,
                  isLoading: false,
                });
              });
          });
        } else {
          // TODO: Raise an error
        }
      });
    },
    [actionState, payload, url]
  );

  return [actionState, userAction];
};

export default UserAction;
