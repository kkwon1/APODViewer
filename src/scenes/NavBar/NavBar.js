import React from 'react'
import styled from 'styled-components'
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
  align-items: center;
`

const NameContainer = styled.div`
  display: flex;
  font-size: 2.5rem;
  padding: 0.5rem;
`

// TODO: Add a drawer component that slides the menu
// TODO: Fix the login/signup container. In fact, only show login. If user clicks it, they can see sign up after.
class NavBar extends React.Component {
  componentDidMount() {
    console.log(this.props)
  }

  render() {
    return(
      <AppBar position="static" color="primary">
        <Toolbar variant="dense">
          <NavbarContainer>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon/>
            </IconButton>
            <NameContainer fontSize='3rem'>APOD Viewer</NameContainer>
            <div>Login</div>
            {/* <MainSection>
              <IconButton edge="start" color="inherit" aria-label="menu">
                  <MenuIcon/>
                </IconButton>
                <NameContainer variant="h5" color="inherit">
                  APOD Viewer
                </NameContainer>
            </MainSection>
            <ProfileContainer>
              { ProfileSection(this.props) }
            </ProfileContainer> */}
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