import React, { Component } from 'react'
import Layout from './hoc/Layout/Layout'
import BurguerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import CheckoutContainer from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Authentication/Auth'

import { Route, Switch } from 'react-router-dom';


class App extends Component {

  render() {
    return (

      <Layout>
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/" exact component={BurguerBuilder} />
          <Route path="/checkout" component={CheckoutContainer} />
          <Route path="/orders" component={Orders} />
        </Switch>

      </Layout>
    )
  }
}

export default App