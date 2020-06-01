import { useEffect, useCallback, useRef } from "react";
import { BASE_URL, DATE_FORMAT } from "../../Constants";
import moment from "moment";

const appStorage = window.localStorage;
// make API calls and pass the returned data via dispatch
export const useFetch = (data, dispatch, pagerDispatch) => {
  useEffect(() => {
    let rawApodData = appStorage.getItem("apodData");
    let cachedData = JSON.parse(rawApodData);
    if ((cachedData && dataIsStale(cachedData[0])) || !cachedData) {
      cachedData = [];
      appStorage.setItem("apodData", JSON.stringify(cachedData));
      dispatch({ type: "CLEAN_CACHE" });
      pagerDispatch({ type: "RESET_PAGE" });
    }
    dispatch({ type: "FETCHING_IMAGES", fetching: true });
    if (data.page === 0 || data.page > Math.floor(cachedData.length / 30)) {
      fetch(`${BASE_URL}apod/batch/?count=30&page=${data.page}`)
        .then((data) => data.json())
        .then((images) => {
          let apodImages = images.reverse();

          // TODO: Maybe add a check not to add dupes?
          appStorage.setItem(
            "apodData",
            JSON.stringify(cachedData.concat(apodImages))
          );
          dispatch({ type: "STACK_IMAGES", apodImages });
          dispatch({ type: "FETCHING_IMAGES", fetching: false });
        })
        .catch((e) => {
          // handle error
          dispatch({ type: "FETCHING_IMAGES", fetching: false });
          return e;
        });
    }
  }, [dispatch, data.page, pagerDispatch]);
};

// infinite scrolling with intersection observer
export const useInfiniteScroll = (scrollRef, dispatch) => {
  const scrollObserver = useCallback(
    (node) => {
      new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          // If the div being observed is even slightly visible, fetch new page
          // But make sure it's below a certain point in the page or else we will fetch twice
          // in initial render
          if (
            en.intersectionRatio > 0 &&
            scrollRef.current.getBoundingClientRect().top > 500
          ) {
            dispatch({ type: "ADVANCE_PAGE" });
          }
        });
      }).observe(node);
    },
    [dispatch, scrollRef]
  );

  useEffect(() => {
    if (scrollRef.current) {
      scrollObserver(scrollRef.current);
    }
  }, [scrollObserver, scrollRef]);
};

// lazy load images with intersection observer
export const useLazyLoading = (imgSelector, items) => {
  const imgObserver = useCallback((node) => {
    const intObs = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.intersectionRatio > 0) {
          const currentImg = en.target;
          const newImgSrc = currentImg.dataset.src;

          // only swap out the image source if the new url exists
          if (!newImgSrc) {
            console.error("Image source is invalid");
          } else {
            currentImg.src = newImgSrc;
          }
          intObs.unobserve(node);
        }
      });
    });
    intObs.observe(node);
  }, []);

  const imagesRef = useRef(null);

  useEffect(() => {
    imagesRef.current = document.querySelectorAll(imgSelector);

    if (imagesRef.current) {
      imagesRef.current.forEach((img) => imgObserver(img));
    }
  }, [imgObserver, imagesRef, imgSelector, items]);
};

function dataIsStale(latestApod) {
  if (latestApod) {
    let now = moment().format(DATE_FORMAT);

    return now > latestApod.date;
  }
  return true;
}
