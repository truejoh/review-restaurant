import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'

import Login from 'pages/Login'
import Register from 'pages/Register'
import Main from 'pages/Main'

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      )
    }
  />
)

const Routes = ({ history, isLoggedIn }) => {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <PrivateRoute
          path="/home"
          exact
          component={Main}
          isLoggedIn={isLoggedIn}
        />
        <Route path="*" exact render={() => <Redirect to="/home" />} />
      </Switch>
    </ConnectedRouter>
  )
}

const mapStateToProps = state => ({
  isLoggedIn: state.Auth.user !== null,
})

export default connect(mapStateToProps)(Routes)
