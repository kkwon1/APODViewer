import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Container from "@material-ui/core/Container";
import ApodThumbnail from "./components/ApodThumbnail";
import ApodDataFetcher from "../../hooks/ApodDataFetcher";
import CircularProgress from "@material-ui/core/CircularProgress";
import { BASE_URL } from "../../Constants";
import UserDataFetcher from "../../hooks/UserDataFetcher";

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

function Main() {
  const [apodState] = ApodDataFetcher(`${BASE_URL}apod/batch/?count=30`);
  UserDataFetcher(`${BASE_URL}users/data/`);

  return (
    <MainContainer>
      <DescriptionContainer>
        Browse, save and share your favourite Astronomy Picture of the Day!
      </DescriptionContainer>
      <BrowseContainer></BrowseContainer>
      <GridContainer>
        {apodState.isFetching ? (
          <LoadingContainer />
        ) : (
          <GridList spacing={10} cellHeight={300} cols={3}>
            {apodState.apodData.map((apodTile, index) => (
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
                    mediaType={apodTile.media_type}
                    title={apodTile.title}
                    url={apodTile.url}
                  />
                </Link>
              </GridListTile>
            ))}
          </GridList>
        )}
      </GridContainer>
    </MainContainer>
  );
}

export default Main;
