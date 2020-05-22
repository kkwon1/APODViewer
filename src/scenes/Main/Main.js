import React, { useReducer, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
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

  let bottomBoundaryRef = useRef(null);
  useFetch(pager, apodDispatch);
  useLazyLoading(".apod-tile", apodData.apods);
  useInfiniteScroll(bottomBoundaryRef, pagerDispatch);

  return (
    <MainContainer>
      <DescriptionContainer>
        Browse, save and share your favourite Astronomy Picture of the Day!
      </DescriptionContainer>
      <BrowseContainer />
      <GridContainer>
        <GridList spacing={10} cellHeight={300} cols={3}>
          {apodData.apods.map((apodTile, index) => (
            <GridListTile key={apodTile.date} cols={1}>
              <Link
                to={{
                  pathname: "/apod",
                  state: {
                    currentIndex: index,
                  },
                }}
              >
                <ApodThumbnail
                  className="apod-tile"
                  mediaType={apodTile.media_type}
                  title={apodTile.title}
                  url={apodTile.url}
                />
              </Link>
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

export default Main;
