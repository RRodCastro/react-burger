import React, { Component } from 'react'
import Layout from './hoc/Layout/Layout'
import BurguerBuilder from './containers/BurgerBuilder'


class App extends Component {

  render(){
    return (

      <Layout>
          <BurguerBuilder/>
      </Layout>
    )
  }
}

export default App