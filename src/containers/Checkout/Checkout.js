import React, { Component } from 'react'
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
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
        let summary = <Redirect to="/" />
        const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null
        if (this.props.ingredients) {
            summary = (
            <div>
                {purchasedRedirect}
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
        return (summary)
    }

}

export default connect(mapStateToProps)(Checkout)