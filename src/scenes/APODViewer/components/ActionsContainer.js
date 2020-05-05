import React from 'react'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import StarBorderIcon from '@material-ui/icons/StarBorder'

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 100px;
  margin-right: 100px;
  margin-bottom: 50px;
`

function ActionsContainer() {
  return(
    <Actions>
      <IconButton disableRipple={true} disableFocusRipple={true}>
        <FavoriteBorderIcon onClick={() => likeButtonPressed()} fontSize='large'/>
      </IconButton>
      <IconButton disableRipple={true} disableFocusRipple={true}>
        <StarBorderIcon fontSize='large'/>
      </IconButton>
    </Actions>
  )
}

function likeButtonPressed() {
  console.log("You pressed Like")
}

export default ActionsContainer
