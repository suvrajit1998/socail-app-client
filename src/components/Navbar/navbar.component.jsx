import React, { Fragment } from 'react'

import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { MyButton } from '../../util/MyButton'

import PostScream from '../PostScream/PostScream.component'
import Notifications from '../Notifications/Notifications.component'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

//Icons
import HomeIcon from '@material-ui/icons/Home'

const Navbar = ({ authenticated }) => {
  return (
    <AppBar color="primary">
      <Toolbar className="nav-container">
        {authenticated ? (
          <Fragment>
            <PostScream />
            <Link to="/">
              <MyButton tip="Home">
                <HomeIcon />
              </MyButton>
            </Link>
            <Notifications />
          </Fragment>
        ) : (
          <Fragment>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              SignUp
            </Button>
          </Fragment>
        )}
      </Toolbar>
    </AppBar>
  )
}

const mapStateToProps = ({ user }) => ({
  authenticated: user.authenticated,
})

export default connect(mapStateToProps)(Navbar)
