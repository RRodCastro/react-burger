import React, { Component } from 'react'
import Aux from '../hoc/Wrapper'
import Burger from '../components/Burger/Burger';

class BurguerBuilder extends Component {

    state = {
        ingredients: {
        }
    }

    render(){
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <div>Burguer controller ...</div>
            </Aux>
        )
    }
}

export default BurguerBuilder