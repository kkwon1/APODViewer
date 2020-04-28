import React from 'react'
import styled from 'styled-components'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { Link } from 'react-router-dom'

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

const LinkContainer = styled(Link)`
  color: white;
  text-decoration: none;
`

const appStorage = window.localStorage

// TODO: Add a drawer component that slides the menu
// TODO: Fix the login/signup container. In fact, only show login. If user clicks it, they can see sign up after.
class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    }
  }

  componentDidMount() {
    let user = appStorage.getItem("user")
    if (user) {
      this.setState({loggedIn: true})
    } else {
      this.setState({loggedIn: false})
    }
  }

  render() {
    return(
      <AppBar position="static" color="primary">
        <Toolbar variant="dense">
          <NavbarContainer>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon/>
            </IconButton>
            <NameContainer fontSize='3rem'>
              <LinkContainer to="/">
                APOD Viewer
              </LinkContainer>
            </NameContainer>
            { ProfileSection(this.state) }
          </NavbarContainer>
          </Toolbar>
      </AppBar>
    )
  }
}

// TODO: Write some tests you rascal
function ProfileSection(state) {
  if (state.loggedIn) {
    return (
        <IconButton edge="start" color="inherit" aria-label="menu">
          <AccountCircle/>
        </IconButton>
    )
  } else {
    return(
      <LinkContainer to="/login">
        Login
      </LinkContainer>
    )
  }
}

export default NavBar