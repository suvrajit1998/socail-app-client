import React from 'react'
import './App.css'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
//Redux
import { Provider } from 'react-redux'
import store from './redux/store'
import { SET_AUTHENTICATED } from './redux/types'
import { logoutUser, getUserData } from './redux/actions/users.actions'

//pages
import HomePage from './pages/Homepage/homepage.component'
import LoginPage from './pages/LoginPage/loginPage.component'
import SignupPage from './pages/SignUpPage/signupPage.component'
import UserHandle from './pages/UserHandle/UserHandle.component'

import AuthRouter from './util/AuthRouter'

//components
import Navbar from './components/Navbar/navbar.component'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#33c9dc',
      main: '#00bcd4',
      dark: '#008394',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff6333',
      main: '#ff3d00',
      dark: '#b22a00',
      contrastText: '#fff',
    },
  },
})

axios.defaults.baseURL =
  'https://us-central1-socailapp-d02a8.cloudfunctions.net/api'

const token = localStorage.FBIDToken
if (token) {
  const decodedToken = jwtDecode(token)
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser())
    window.location.href = '/login'
  } else {
    store.dispatch({ type: SET_AUTHENTICATED })
    axios.defaults.headers.common['Authorization'] = token
    store.dispatch(getUserData())
  }
}

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <AuthRouter exact path="/login" component={LoginPage} />
              <AuthRouter exact path="/signup" component={SignupPage} />
              <Route exact path="/user/:handle" component={UserHandle} />
              <Route
                exact
                path="/user/:handle/scream/:screamId"
                component={UserHandle}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  )
}

export default App
