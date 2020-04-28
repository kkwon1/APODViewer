import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import Main from './scenes/Main/Main'
import * as serviceWorker from './serviceWorker'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import NavBar from './scenes/NavBar/NavBar'
import Login from './scenes/Login/Login'

const routing = (
  <Router>
    <div>
      <NavBar/>
      <Route exact path="/" component={Main}/>
      <Route exact path="/apod" component={App}/>
      <Route exact path="/login" component={Login}/>
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
