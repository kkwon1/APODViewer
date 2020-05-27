import React, { useReducer, useRef, useState, useEffect } from "react";
import styled from "styled-components";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Container from "@material-ui/core/Container";
import ApodThumbnail from "./components/ApodThumbnail";
import CircularProgress from "@material-ui/core/CircularProgress";
import { BASE_URL } from "../../Constants";
import UserDataFetcher from "../../hooks/UserDataFetcher";
import { useFetch, useInfiniteScroll, useLazyLoading } from "./customHooks";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 10px;
`;

const DescriptionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 2rem;
  padding: 2rem;
`;

const BrowseContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const GridContainer = styled(Container)`
  display: flex;
  text-align: center;
  justify-content: center;
  flex-direction: row;
`;

const LoadingContainer = styled(CircularProgress)`
  padding: 5rem;
`;

const apodReducer = (state, action) => {
  switch (action.type) {
    case "STACK_IMAGES":
      return { ...state, apods: state.apods.concat(action.apodImages) };
    case "FETCHING_IMAGES":
      return { ...state, fetching: action.fetching };
    case "CLEAN_CACHE":
      return { ...state, apods: [] };
    default:
      return state;
  }
};

const pageReducer = (state, action) => {
  switch (action.type) {
    case "ADVANCE_PAGE":
      return { ...state, page: state.page + 1 };
    default:
      return state;
  }
};

const appStorage = window.localStorage;

function Main() {
  let rawApodData = appStorage.getItem("apodData");
  let cachedData = JSON.parse(rawApodData);
  if (!cachedData) cachedData = [];

  const [userDataState] = UserDataFetcher(`${BASE_URL}users/data/`);
  const [pager, pagerDispatch] = useReducer(pageReducer, {
    page: Math.floor(cachedData.length / 30),
  });
  const [apodData, apodDispatch] = useReducer(apodReducer, {
    apods: cachedData,
    fetching: true,
  });
  const [modalApod, setModalApod] = useState({
    apod: null,
    isLiked: false,
    isSaved: false,
  });
  const [currentIndex, setCurrentIndex] = useState(-1);

  const [likeDates, setLikeDates] = useState([]);
  const [saveDates, setSaveDates] = useState([]);

  let bottomBoundaryRef = useRef(null);
  useFetch(pager, apodDispatch);
  useLazyLoading(".apod-tile", apodData.apods);
  useInfiniteScroll(bottomBoundaryRef, pagerDispatch);

  const setApod = (index) => {
    setCurrentIndex(index);
    let apod = apodData.apods[index];
    setModalApod({
      apod: apod,
      isLiked: apodIsLiked(apod),
      isSaved: apodIsSaved(apod),
    });
  };

  const prevApod = () => {
    if (currentIndex > 0) {
      let newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);

      let apod = apodData.apods[newIndex];
      setModalApod({
        apod: apod,
        isLiked: apodIsLiked(apod),
        isSaved: apodIsSaved(apod),
      });
    }
  };

  const nextApod = () => {
    if (currentIndex + 1 < apodData.apods.length) {
      let newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      let apod = apodData.apods[newIndex];
      setModalApod({
        apod: apod,
        isLiked: apodIsLiked(apod),
        isSaved: apodIsSaved(apod),
      });
    }
  };

  const updateLikeSave = (action, apodDate) => {
    let currentLikeDates = likeDates;
    let currentSaveDates = saveDates;
    switch (action) {
      case "like":
        // append to likeDates
        currentLikeDates.push(apodDate);
        setLikeDates(currentLikeDates);
        setModalApod({
          ...modalApod,
          isLiked: true,
        });
        break;
      case "unlike":
        // remove from likeDates
        removeItem(currentLikeDates, apodDate);
        setLikeDates(currentLikeDates);
        setModalApod({
          ...modalApod,
          isLiked: false,
        });
        break;
      case "save":
        // append to saveDates
        currentSaveDates.push(apodDate);
        setSaveDates(currentSaveDates);
        setModalApod({
          ...modalApod,
          isSaved: true,
        });
        break;
      case "unsave":
        // remove from saveDates
        removeItem(currentSaveDates, apodDate);
        setSaveDates(currentLikeDates);
        setModalApod({
          ...modalApod,
          isSaved: false,
        });
        break;
      default:
        break;
    }
  };

  const apodIsLiked = (apod) => {
    return likeDates.includes(apod.date);
  };

  const apodIsSaved = (apod) => {
    return saveDates.includes(apod.date);
  };

  useEffect(() => {
    setLikeDates(getLikeDates(userDataState.userData));
    setSaveDates(getSaveDates(userDataState.userData));
  }, [userDataState.userData]);

  return (
    <MainContainer>
      <DescriptionContainer>
        {/* Browse, save and share your favourite Astronomy Picture of the Day! */}
      </DescriptionContainer>
      <BrowseContainer />
      <GridContainer>
        <GridList spacing={10} cellHeight={300} cols={3}>
          {apodData.apods.map((apodTile, index) => (
            <GridListTile key={apodTile.date} cols={1}>
              <ApodThumbnail
                className="apod-tile"
                mediaType={apodTile.media_type}
                title={apodTile.title}
                url={apodTile.url}
                description={apodTile.explanation}
                currentIndex={index}
                setApod={setApod}
                prevApod={prevApod}
                nextApod={nextApod}
                action={updateLikeSave}
                currentApod={modalApod}
              />
            </GridListTile>
          ))}
        </GridList>
        {(apodData.fetching || userDataState.isFetching) && (
          <LoadingContainer />
        )}
      </GridContainer>
      <div ref={bottomBoundaryRef} />
    </MainContainer>
  );
}

function getLikeDates(parsedUserData) {
  return parsedUserData && parsedUserData.UserLikes
    ? parsedUserData.UserLikes.map((s) => s.ApodDate)
    : [];
}

function getSaveDates(parsedUserData) {
  return parsedUserData && parsedUserData.UserSaves
    ? parsedUserData.UserSaves.map((s) => s.ApodDate)
    : [];
}

function removeItem(array, key) {
  let index = array.indexOf(key);
  if (index > -1) {
    array.splice(index, 1);
  }
  return array;
}

export default Main;
