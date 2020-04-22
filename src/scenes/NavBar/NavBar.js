import React from 'react'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import LoginSignupContainer from '../Login/LoginSignupContainer'

const NavbarContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`

const MainSection = styled.div`
  display: flex;
  width: 13%;
  align-items: center;
  justify-content: space-between;
`

const NameContainer = styled(Typography)`
  display: flex;
`

const ProfileContainer = styled.div`
  display: flex;
  align-items:  center;
`

// TODO: Add a drawer component that slides the menu
class NavBar extends React.Component {
  componentDidMount() {
    console.log(this.props)
  }

  render() {
    return(
      <AppBar position="static" color="primary">
        <Toolbar variant="dense">
          <NavbarContainer>
            <MainSection>
              <IconButton edge="start" color="inherit" aria-label="menu">
                  <MenuIcon/>
                </IconButton>
                <NameContainer variant="h5" color="inherit">
                  APOD Viewer
                </NameContainer>
            </MainSection>
            <ProfileContainer>
              { ProfileSection(this.props) }
            </ProfileContainer>
          </NavbarContainer>
          </Toolbar>
      </AppBar>
    )
  }
}

// TODO: Write some tests you rascal
function ProfileSection(props) {
  if (props.isLoggedIn) {
    return (
        <IconButton edge="start" color="inherit" aria-label="menu">
          <AccountCircle/>
        </IconButton>
    )
  } else {
    return(
      <LoginSignupContainer/>
    )
  }
}

export default NavBar