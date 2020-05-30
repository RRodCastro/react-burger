import React, { Component } from 'react'
import Layout from './hoc/Layout/Layout'
import BurguerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import CheckoutContainer from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'

import { Route } from 'react-router-dom';


class App extends Component {

  render(){
    return (

      <Layout>
        <Route path="/" exact component={BurguerBuilder} />
        <Route path="/checkout" component={CheckoutContainer} />
        <Route path="/orders" component={Orders} />
        
      </Layout>
    )
  }
}

export default App