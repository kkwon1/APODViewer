import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Container from '@material-ui/core/Container'

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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

const Image = styled.img`
  display: flex;
  height: 300px;
  width: 405px;
  border-radius: 0.5rem;
`

class Main extends React.Component {
  render() {
    return (
      <MainContainer>
        <DescriptionContainer>
          Browse, save and share your favourite Astronomy Picture of the Day!
        </DescriptionContainer>
        <BrowseContainer>
        </BrowseContainer>
        <GridContainer>
          <GridList cellHeight={300} cols={3}>
            <GridListTile>
              <Link to="/apod">
                <Image alt="test" src={"https://apod.nasa.gov/apod/image/2004/ISS002-E-7377_1024c.jpg"}/>
              </Link>
            </GridListTile>
            <GridListTile>
              <Link to="/apod">
                <Image alt="test" src={"https://apod.nasa.gov/apod/image/2004/ISS002-E-7377_1024c.jpg"}/>
              </Link>
            </GridListTile>
            <GridListTile>
              <Image alt="test" src={"https://apod.nasa.gov/apod/image/2004/ISS002-E-7377_1024c.jpg"}/>
            </GridListTile>
            <GridListTile>
              <Image alt="test" src={"https://apod.nasa.gov/apod/image/2004/ISS002-E-7377_1024c.jpg"}/>
            </GridListTile>
            <GridListTile>
              <Image alt="test" src={"https://apod.nasa.gov/apod/image/2004/ISS002-E-7377_1024c.jpg"}/>
            </GridListTile>
            <GridListTile>
              <Image alt="test" src={"https://apod.nasa.gov/apod/image/2004/ISS002-E-7377_1024c.jpg"}/>
            </GridListTile>
            {/* {tileData.map((tile) => (
              <GridListTile key={tile.img} cols={tile.cols || 1}>
                <img src={tile.img} alt={tile.title} />
              </GridListTile>
            ))} */}
          </GridList>
        </GridContainer>
      </MainContainer>
    );
  }
}

export default Main;
