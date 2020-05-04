import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import Container from '@material-ui/core/Container'
import ApodThumbnail from './components/ApodThumbnail'
import ApodDataFetcher from '../../hooks/ApodDataFetcher'

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 10px;
`

const DescriptionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 2rem;
  padding: 2rem;
`

const BrowseContainer = styled.div`
  display: flex;
  justify-content: center;
`

const GridContainer = styled(Container)`
  display: flex;
  flex-direction: row;
`

// TODO: make the url config. This is dev env but once service is deployed we want to call diff endpoint
const baseUrl = "http://localhost:8081/api/v1/"

function Main() {
  const [apodState] = ApodDataFetcher(`${baseUrl}apod/batch/?count=30`)

  return (
    <MainContainer>
      <DescriptionContainer>
        Browse, save and share your favourite Astronomy Picture of the Day!
      </DescriptionContainer>
      <BrowseContainer>
      </BrowseContainer>
      <GridContainer>
        {apodState.isFetching ? <div>Loading...</div> :
          <GridList spacing={10} cellHeight={300} cols={3}>
          {apodState.apodData.map((apodTile, index) => (
            <GridListTile key={apodTile.date} cols={1}>
              <Link to={{
                pathname: "/apod",
                state: {
                  currentIndex: index
                }
              }}>
                <ApodThumbnail mediaType={apodTile.media_type} title={apodTile.title} url={apodTile.url}/>
              </Link>
            </GridListTile>
          ))}
          </GridList>
        }
      </GridContainer>
    </MainContainer>
  );
}

export default Main;
