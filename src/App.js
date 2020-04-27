import React from 'react'
import styled from 'styled-components'
import MediaContainer from './scenes/APODViewer/components/MediaContainer'
import Grid from '@material-ui/core/Grid'

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
          </Grid>
          <Grid item xs={12}>
            <MediaContainer currentIndex={this.props.location.state ? this.props.location.state.currentIndex : 0}/>
          </Grid>
        </Grid>
      </MainContainer>
    );
  }
}

export default App;
