import React from 'react';
import styled from 'styled-components'
import Container from '@material-ui/core/Container'
import IconButton from '@material-ui/core/IconButton'
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded'
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded'

const MainContainer = styled(Container)`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  margin-bottom: 100px;
`

const ImageContainerWrapper = styled(Container)`
  display: flex;
  justify-content: center;
  flex-direction: row;
`

const ButtonContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`

class ImageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: null
    }
  }

  // TODO: Temporary solution to hide API Key in github until backend service is ready
  componentDidMount() {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_API_KEY}`)
      .then(res => res.json())
      .then(
        (result) => {
        this.setState({imageUrl: result.url})
      })
  }

  render() {
    return (
      <MainContainer>
        <ButtonContainer>
          <IconButton>
            <ArrowBackIosRoundedIcon fontSize='large'/>
          </IconButton>
        </ButtonContainer>
        <ImageContainerWrapper maxWidth="lg">
          <img src={this.state.imageUrl}/>
        </ImageContainerWrapper>
        <ButtonContainer>
          <IconButton>
            <ArrowForwardIosRoundedIcon fontSize='large'/>
          </IconButton>
        </ButtonContainer>
      </MainContainer>
    )
  }
}

export default ImageContainer