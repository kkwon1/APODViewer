import React from "react";
import styled from "styled-components";
import MediaContainer from "./components/MediaContainer";
import Grid from "@material-ui/core/Grid";

const MainContainer = styled.div`
  display: flex;
`;

class App extends React.Component {
  render() {
    return (
      <MainContainer>
        <Grid container>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}>
            <MediaContainer
              currentIndex={
                this.props.location.state
                  ? this.props.location.state.currentIndex
                  : 0
              }
            />
          </Grid>
        </Grid>
      </MainContainer>
    );
  }
}

export default App;
