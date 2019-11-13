import React from 'react';
import styled from 'styled-components'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'

const ImageContainerWrapper = styled(Container)`
  display: flex;
  justify-content: center;
  flex-direction: row;
  height:100%;
  margin-bottom: 100px;
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
      <ImageContainerWrapper maxWidth="lg">
        <Button>previous button</Button>
        <img src={this.state.imageUrl}/>
        <Button>forward button</Button>
      </ImageContainerWrapper>
    )
  }
}

export default ImageContainer