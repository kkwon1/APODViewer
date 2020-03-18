import React from 'react';
import styled from 'styled-components'
import Container from '@material-ui/core/Container'
import IconButton from '@material-ui/core/IconButton'
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded'
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded'
import moment from 'moment'
import Typography from '@material-ui/core/Typography'
import ActionsContainer from './ActionsContainer'

const MainContainer = styled(Container)`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  flex-direction: column;
`

const ImageSection = styled.div`
  display:flex;
  height: 800px;
`

const ImageContainerWrapper = styled(Container)`
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

const Image = styled.img`
  border-radius: 25px;
`

const dateFormat = "YYYY-MM-DD"
// TODO: make the url config. This is dev env but once service is deployed we want to call diff endpoint
const baseUrl = "http://localhost:8081/api/v1/"

// TODO: Come up with a way to cache the data. As user goes through images, pre-fetch more images to make loading times shorter
let apodData = []
let currentIndex = 0

// TODO: Refactor this huge component into smaller chunks. Pass data down as props from parent
class ImageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: null,
      imageDateIsToday: false,
      currentImageDate: moment(),
      text: "",
      title: ""
    }
  }

  componentDidMount() {
    this.getImageData(this.state.currentImageDate)
  }

  // TODO: If user is viewing the last image we retrieved, make another call to backend for 30 new photos
  updateImageDate(event, numDaysToAdd) {
    this.setState({currentImageDate: this.state.currentImageDate.add(numDaysToAdd, "days")})
    currentIndex -= numDaysToAdd
    let apod = apodData[currentIndex]
    if (apod) {
      this.setState({imageUrl: apod.url})
      this.setState({imageDateIsToday: dateIsToday(apod.date)})
      this.setState({text: apod.explanation})
      this.setState({title: apod.title})
    }
  }

  getImageData(date) {
    fetch(`${baseUrl}apod/batch/?count=30`)
    .then(res => res.json())
    .then(
      (result) => {
        // Decode from base64 to string, and then parse the object
        apodData = JSON.parse(atob(result))
        apodData = apodData.reverse()
        console.log(apodData)
        let latestApod = apodData[currentIndex]
        this.setState({imageUrl: latestApod.url})
        this.setState({imageDateIsToday: dateIsToday(latestApod.date)})
        this.setState({text: latestApod.explanation})
        this.setState({title: latestApod.title})
    })
  }

  render() {
    return (
      <MainContainer>
        <HeaderContainer maxWidth="md">
          <Typography variant="h3">
            {this.state.title}
          </Typography>
        </HeaderContainer>
        <ImageSection>
          <ButtonContainer>
            <IconButton onClick={e => this.updateImageDate(e, -1)}>
              <ArrowBackIosRoundedIcon fontSize='large'/>
            </IconButton>
          </ButtonContainer>
          <ImageContainerWrapper maxWidth="lg">
            <Image src={this.state.imageUrl}/>
          </ImageContainerWrapper>
          <ButtonContainer>
            <IconButton disabled={this.state.imageDateIsToday} onClick={e => this.updateImageDate(e, 1)}>
              <ArrowForwardIosRoundedIcon fontSize='large'/>
            </IconButton>
          </ButtonContainer>
        </ImageSection>
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

export default ImageContainer