import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'

const AuthRouter = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authenticated === true ? <Redirect to="/" /> : <Component {...props} />
    }
  />
)

const mapStateToProps = ({ user }) => ({
  authenticated: user.authenticated,
})

export default connect(mapStateToProps)(AuthRouter)
