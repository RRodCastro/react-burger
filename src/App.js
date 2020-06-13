import React, { Component } from 'react'
import Layout from './hoc/Layout/Layout'
import BurguerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import CheckoutContainer from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Authentication/Auth'
import Logout from './containers/Logout/Logout'
import { connect } from 'react-redux'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { authCheckState } from './stores/actions/index'

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignUp: () => dispatch(authCheckState())
  }
}

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignUp()
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurguerBuilder} />
        <Redirect to="/" />

      </Switch>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/" exact component={BurguerBuilder} />
          <Route path="/checkout" component={CheckoutContainer} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Redirect to="/" />
        </Switch>
      )
    }

    return (

      <Layout>
        {routes}
      </Layout>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))