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

const MediaContainerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 50px;
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
const appStorage = window.localStorage

// TODO: Refactor this huge component into smaller chunks. Pass data down as props from parent
class MediaContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apodData: [],
      currentIndex: 0,
      mediaUrl: null,
      mediaDateIsToday: false,
      currentImageDate: moment(),
      text: "",
      title: "",
      mediaType: ""
    }
  }

  componentDidMount() {
    // Index of image clicked by user in main view
    let redirectIndex = this.props.currentIndex;
    this.setState({currentIndex: redirectIndex})

    // Get data from cache
    let rawData = appStorage.getItem("apodData");
    let cachedData = JSON.parse(rawData);

    // Set state
    this.setState({apodData: cachedData})
    let currentApod = cachedData[redirectIndex];
    this.setApodData(currentApod)
  }

  // TODO: If user is viewing the last image we retrieved, make another call to backend for 30 new photos
  updateImageDate(event, numDaysToAdd) {
    this.setState({currentImageDate: this.state.currentImageDate.add(numDaysToAdd, "days")})
    let apodData = this.state.apodData;
    let newIndex = this.state.currentIndex - numDaysToAdd;
    this.setState({currentIndex: newIndex})
    let apod = apodData[newIndex]
    if (apod) {
      this.setApodData(apod)
    }
  }

  setApodData(apod) {
    this.setState({mediaUrl: apod.url})
    this.setState({mediaDateIsToday: dateIsToday(apod.date)})
    this.setState({text: apod.explanation})
    this.setState({title: apod.title})
    this.setState({mediaType: apod.media_type})
    this.setState({currentImageDate: moment(apod.date)})
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
            <Container maxWidth="lg">
              <MediaContainerWrapper>
                <MediaDisplayer mediaType={this.state.mediaType} url={this.state.mediaUrl}></MediaDisplayer>
              </MediaContainerWrapper>
            </Container>
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