import React from 'react'
import styled from 'styled-components'
import ImageContainer from './ImageContainer'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import NavBar from './NavBar'

const MainContainer = styled.div`
  display: flex;
`

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  margin: 50px;
`

function App() {
  return (
    <MainContainer>
      <Grid container>
        <Grid item xs={12}>
          <NavBar/>
        </Grid>
        <Grid item xs={12}>
          <HeaderContainer maxWidth="md">
            <Typography variant="h2">
              Welcome to APOD Viewer!
            </Typography>
          </HeaderContainer>
        </Grid>
        <Grid item xs={12}>
          <ImageContainer/>
        </Grid>
      </Grid>
    </MainContainer>
  );
}

export default App;
