import { useEffect, useState } from "react";
import moment from "moment";

const appStorage = window.localStorage;
const dateFormat = "YYYY-MM-DD";

function ApodDataFetcher(url) {
  const [apodState, setApodState] = useState({
    apodData: [],
    isFetching: false,
  });
  const [endpointUrl] = useState(url);

  let rawData = appStorage.getItem("apodData");
  let cachedData = JSON.parse(rawData);

  async function fetchData() {
    setApodState({ ...apodState, isFetching: true });
    if (!cachedData || cachedData.length === 0 || dataIsStale(cachedData[0])) {
      const res = await fetch(endpointUrl);
      res
        .json()
        .then((res) => {
          // Decode from base64 to string, and then parse the object
          let parsedData = JSON.parse(atob(res));
          let inorderData = parsedData.reverse();
          setApodState({
            ...apodState,
            apodData: inorderData,
            isFetching: false,
          });
          appStorage.setItem("apodData", JSON.stringify(inorderData));
        })
        .catch((err) => {
          console.log(err);
          setApodState({ ...apodState, isFetching: false });
        });
    } else {
      setApodState({
        ...apodState,
        apodData: cachedData,
        isFetching: false,
      });
    }
  }

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return [apodState];
}

function dataIsStale(latestApod) {
  let now = moment().format(dateFormat);

  return now > latestApod.date;
}

export default ApodDataFetcher;
