import React from 'react';
import styled from 'styled-components'

const Image = styled.img`
  display: flex;
  border-radius: 25px;
  height: 750px;
`

const Video = styled.iframe`
  display: flex;
  border-radius: 25px;
  height: 750px;
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