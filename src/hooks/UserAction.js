import { useState, useCallback } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import ApodUtils from "../scenes/APODViewer/utils/ApodUtils";

const apodUtils = new ApodUtils();

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
      let user = firebase.auth().currentUser;
      if (user) {
        user.getIdToken().then(function (idToken) {
          let bearer = "Bearer " + idToken;
          payload.UserID = user.uid;
          payload.Action = action;

          postData(url, payload, bearer)
            .then((res) => {
              setUserAction({
                ...actionState,
                data: res,
                isLoading: false,
              });
              apodUtils.updateApodDataLocalStorage(res, payload.Action);
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
    },
    [actionState, payload, url]
  );

  return [userAction];
};

export default UserAction;
