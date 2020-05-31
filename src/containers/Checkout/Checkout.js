import React, { Component } from 'react'
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients
    }
}

class Checkout extends Component {

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
                    ingredients={this.props.ingredients}
                    checkoutCancel={this.checkoutCancel}
                    checkoutContinue={this.checkoutContinue}
                />
                <Route
                    path={this.props.match.path + '/contact-data'} 
                    component={ContactData}
                />
            </div>
        )
    }

}

export default connect(mapStateToProps)(Checkout)