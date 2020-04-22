import React from 'react'
import styled from 'styled-components'

const MainContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-content: center;
`


// TODO: Add a drawer component that slides the menu
class LoginSignupContainer extends React.Component {
  componentDidMount() {
    console.log(this.props)
  }

  render() {
    return(
      <MainContainer>
        <div>Login</div>
        <div>Sign up</div>
      </MainContainer>
    )
  }
}

export default LoginSignupContainer