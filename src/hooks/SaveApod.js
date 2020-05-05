import { useState, useCallback } from "react";

async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
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
    postData(url, payload)
      .then((res) => {
        let parsedData = JSON.parse(atob(res));
        setSaveState({ ...saveState, data: parsedData, isLoading: false });
      })
      .catch((err) => {
        setSaveState((prevState) => ({
          ...prevState,
          error: err,
          isLoading: false,
        }));
      });
  }, [url, payload, saveState]);

  return [saveState, saveApod];
};

export default SaveApod;
