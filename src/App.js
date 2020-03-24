import React from 'react'
import styled from 'styled-components'
import MediaContainer from './MediaContainer'
import Grid from '@material-ui/core/Grid'
import NavBar from './NavBar'

const MainContainer = styled.div`
  display: flex;
`

const appStorage = window.localStorage

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    }
  }

  componentDidMount() {
    let isLoggedIn = this.isUserLoggedIn()
    this.setState({isLoggedIn: isLoggedIn})
    console.log(isLoggedIn)
  }

  isUserLoggedIn() {
    let token = appStorage.getItem('jwt')
    return !!token
  }

  isTokenValid() {
    // TODO: Call backend and refresh the token if invalid.
  }

  render() {
    return (
      <MainContainer>
        <Grid container>
          <Grid item xs={12}>
            <NavBar isLoggedIn={this.state.isLoggedIn}/>
          </Grid>
          <Grid item xs={12}>
            <MediaContainer/>
          </Grid>
        </Grid>
      </MainContainer>
    );
  }
}

export default App;
