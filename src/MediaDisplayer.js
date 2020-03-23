import React from 'react';
import styled from 'styled-components'

const Image = styled.img`
  border-radius: 25px;
  width: 1000px;
`

const Video = styled.iframe`
  border-radius: 25px;
  width: 1000px;
`

class MediaDisplayer extends React.Component {
  render() {
    switch(this.props.mediaType) {
      case "video":
        return (
          <Video src={this.props.url}/>
        )
      // Capture image case
      default:
        return (
          <Image src={this.props.url}/>
        )
    }
  }
}

export default MediaDisplayer