import { useEffect, useState } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";

const appStorage = window.localStorage;

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

function UserDataFetcher(url) {
  const [userDataState, setUserDataState] = useState({
    userData: [],
    isFetching: false,
  });

  let rawData = appStorage.getItem("userData");
  let cachedData = JSON.parse(rawData);

  async function fetchData() {
    setUserDataState({ ...userDataState, isFetching: true });
    if (!cachedData) {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          user.getIdToken().then(function (idToken) {
            let bearer = "Bearer " + idToken;
            let payload = {
              UserID: user.uid,
            };

            postData(url, payload, bearer)
              .then((res) => {
                setUserDataState({
                  ...userDataState,
                  userDataState: res,
                  isFetching: false,
                });

                appStorage.setItem("userData", JSON.stringify(res));
              })
              .catch((err) => {
                console.log(err);
                setUserDataState({ ...userDataState, isFetching: false });
              });
          });
        } else {
          // TODO: Raise an error
        }
      });
    } else {
      setUserDataState({
        ...userDataState,
        userData: cachedData,
        isFetching: false,
      });
    }
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [];
}

export default UserDataFetcher;
