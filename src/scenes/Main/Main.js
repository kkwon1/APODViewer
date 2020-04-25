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

const appStorage = window.localStorage

// TODO: make the url config. This is dev env but once service is deployed we want to call diff endpoint
const baseUrl = "http://localhost:8081/api/v1/"

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apodData: []
    }
  }

  componentDidMount() {
    let rawData = appStorage.getItem("apodData");
    let cachedData = JSON.parse(rawData);
    if (!cachedData || cachedData.length === 0) {
      this.getApodData()
    } else {
      this.setState({apodData: cachedData});
    }
  }

  getApodData() {
    fetch(`${baseUrl}apod/batch/?count=30`)
    .then(res => res.json())
    .then(
      (result) => {
        // Decode from base64 to string, and then parse the object
        let parsedData = JSON.parse(atob(result));
        this.setState({apodData: parsedData.reverse()});
        console.log(parsedData[0])
        appStorage.setItem("apodData", JSON.stringify(this.state.apodData));
    })
  }

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
            {this.state.apodData.map((apodTile) => (
              <GridListTile key={apodTile.date} cols={1}>
                <Link to="/apod">
                  <Image alt={apodTile.title} src={apodTile.url}/>
                </Link>
              </GridListTile>
            ))}
          </GridList>
        </GridContainer>
      </MainContainer>
    );
  }
}

export default Main;
