import React from 'react';
import styled from 'styled-components'
import Container from '@material-ui/core/Container'
import IconButton from '@material-ui/core/IconButton'
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded'
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded'
import moment from 'moment'
import Typography from '@material-ui/core/Typography'
import ActionsContainer from './ActionsContainer'
import MediaDisplayer from './MediaDisplayer';

const MainContainer = styled(Container)`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  flex-direction: column;
`

const MediaSection = styled.div`
  display:flex;
  height: 800px;
`

const MediaContainerWrapper = styled(Container)`
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin-top: 50px;
  margin-bottom: 20px;
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`

const TextContainer = styled.div`
  display:flex;
  align-items:center;
  margin-bottom: 100px;
`

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: 50px;
`

const dateFormat = "YYYY-MM-DD"
// TODO: make the url config. This is dev env but once service is deployed we want to call diff endpoint
const baseUrl = "http://localhost:8081/api/v1/"

// TODO: Come up with a way to cache the data. As user goes through images, pre-fetch more images to make loading times shorter
let apodData = []
let currentIndex = 0

// TODO: Refactor this huge component into smaller chunks. Pass data down as props from parent
class MediaContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mediaUrl: null,
      mediaDateIsToday: false,
      currentImageDate: moment(),
      text: "",
      title: "",
      mediaType: ""
    }
  }

  componentDidMount() {
    this.getApodData()
  }

  // TODO: If user is viewing the last image we retrieved, make another call to backend for 30 new photos
  updateImageDate(event, numDaysToAdd) {
    this.setState({currentImageDate: this.state.currentImageDate.add(numDaysToAdd, "days")})
    currentIndex -= numDaysToAdd
    let apod = apodData[currentIndex]
    if (apod) {
      this.setApodData(apod)
    }
  }

  getApodData() {
    fetch(`${baseUrl}apod/batch/?count=30`)
    .then(res => res.json())
    .then(
      (result) => {
        // Decode from base64 to string, and then parse the object
        apodData = JSON.parse(atob(result))
        apodData = apodData.reverse()
        console.log(apodData)
        let latestApod = apodData[currentIndex]
        this.setApodData(latestApod)
    })
  }

  setApodData(apod) {
    this.setState({mediaUrl: apod.url})
    this.setState({mediaDateIsToday: dateIsToday(apod.date)})
    this.setState({text: apod.explanation})
    this.setState({title: apod.title})
    this.setState({mediaType: apod.media_type})
  }

  render() {
    return (
      <MainContainer>
        <HeaderContainer maxWidth="md">
          <Typography variant="h3">
            {this.state.title}
          </Typography>
        </HeaderContainer>
        <MediaSection>
          <ButtonContainer>
            <IconButton onClick={e => this.updateImageDate(e, -1)}>
              <ArrowBackIosRoundedIcon fontSize='large'/>
            </IconButton>
          </ButtonContainer>
          <MediaContainerWrapper maxWidth="lg">
            <MediaDisplayer mediaType={this.state.mediaType} url={this.state.mediaUrl}></MediaDisplayer>
          </MediaContainerWrapper>
          <ButtonContainer>
            <IconButton disabled={this.state.mediaDateIsToday} onClick={e => this.updateImageDate(e, 1)}>
              <ArrowForwardIosRoundedIcon fontSize='large'/>
            </IconButton>
          </ButtonContainer>
        </MediaSection>
        <ActionsContainer/>
        <TextContainer>
          <Typography variant="subtitle1">
            {this.state.text}
          </Typography>
        </TextContainer>
      </MainContainer>
    )
  }
}

function dateIsToday(apodDate) {
  let now = moment().format(dateFormat)
  
  // apodDate is today or future date
  return now <= apodDate
}

export default MediaContainer