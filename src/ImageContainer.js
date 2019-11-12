import React from 'react';
import styled from 'styled-components'
import Container from '@material-ui/core/Container'

const ImageContainerWrapper = styled(Container)`
  display: flex;
  justify-content: center;
  border: 2px black solid;
  height: 500px;
`

function ImageContainer() {
  return (
    <ImageContainerWrapper maxWidth="md">
      <p>Image</p>
    </ImageContainerWrapper>
  )
}

export default ImageContainer