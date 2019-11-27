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

const baseUrl = "https://api.nasa.gov/planetary/apod"
const apiKey = process.env.REACT_APP_NASA_API_KEY
const dateFormat = "YYYY-MM-DD"

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

  // TODO: Temporary solution to hide API Key in github until backend service is ready
  componentDidMount() {
    this.getImageData(this.state.currentImageDate)
  }

  updateImageDate(event, numDaysToAdd) {
    this.setState({currentImageDate: this.state.currentImageDate.add(numDaysToAdd, "days")})
    this.getImageData(this.state.currentImageDate)
  }

  getImageData(date) {
    fetch(`${baseUrl}?api_key=${apiKey}&date=${date.format(dateFormat)}`)
    .then(res => res.json())
    .then(
      (result) => {
      this.setState({imageUrl: result.url})
      this.setState({imageDateIsToday: dateIsToday(result.date)})
      this.setState({text: result.explanation})
      this.setState({title: result.title})
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
  let now = moment()
  // apodDate is today or future date
  return now <= moment(apodDate)
}

export default ImageContainer