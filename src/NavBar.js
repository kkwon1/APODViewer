import React from 'react'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

const NameContainer = styled(Typography)`
  display: flex;
  padding-left: 35px;
`

// TODO: Add a drawer component that slides the menu
function NavBar() {
  return(
    <AppBar position="static" color="primary">
      <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon/>
          </IconButton>
          <NameContainer variant="h5" color="inherit">
            APOD Viewer
          </NameContainer>
        </Toolbar>
    </AppBar>
  )   
}

export default NavBar