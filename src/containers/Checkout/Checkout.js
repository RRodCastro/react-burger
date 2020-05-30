import React, { Component } from 'react'
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
import { Route } from 'react-router-dom'

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 0,
            meat: 0,
            cheese: 0,
            bacon: 0
        },
        totalPrice: 0
    }

    componentDidMount() {
        if (this.props.location.ingredients && this.props.location.totalPrice ) {
            this.setState({ ingredients: this.props.location.ingredients, totalPrice: this.props.location.totalPrice })
        }
    }

    checkoutCancel = () => {
        this.props.history.goBack();
    }

    checkoutContinue = () => {
        this.props.history.replace( '/checkout/contact-data' );
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancel={this.checkoutCancel}
                    checkoutContinue={this.checkoutContinue}
                />
                <Route
                    path={this.props.match.path + '/contact-data'} 
                    render={(props) => <ContactData {...props} totalPrice={this.state.totalPrice} ingredients={this.state.ingredients} />}
                />
            </div>
        )
    }

}

export default Checkout