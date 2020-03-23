import React from 'react'
import styled from 'styled-components'
import MediaContainer from './MediaContainer'
import Grid from '@material-ui/core/Grid'
import NavBar from './NavBar'

const MainContainer = styled.div`
  display: flex;
`

function App() {
  return (
    <MainContainer>
      <Grid container>
        <Grid item xs={12}>
          <NavBar/>
        </Grid>
        <Grid item xs={12}>
          <MediaContainer/>
        </Grid>
      </Grid>
    </MainContainer>
  );
}

export default App;
