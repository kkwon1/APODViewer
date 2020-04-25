import React from 'react';
import styled from 'styled-components'
import Container from '@material-ui/core/Container'
import MediaDisplayer from '../../APODViewer/components/MediaDisplayer'

const MediaContainerWrapper = styled(Container)`
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin-top: 50px;
  margin-bottom: 20px;
  width: 150px;
  height: 150px;
`

class ApodThumbnail extends React.Component {
  render() {
    return (
      <MediaContainerWrapper maxWidth="lg">
        <MediaDisplayer mediaType={"image"} url={"https://apod.nasa.gov/apod/image/2004/ISS002-E-7377_1024c.jpg"}></MediaDisplayer>
      </MediaContainerWrapper>
    )
  }
}

export default ApodThumbnail