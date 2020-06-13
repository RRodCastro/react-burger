import React, { Component } from 'react'
import Aux from '../../hoc/Hoc/Wrapper'
import Burger from '../../components/Burger/Burger';
import BurguerControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner'
import withOrderHandler from '../../hoc/withErrorHandler/WithOrderHandler'
import { connect } from 'react-redux'
import * as actions from '../../stores/actions/index'
import axios from '../../axios-orders'

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        token: state.auth.token
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        onIngredientAdd: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        onIngredientRemove: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        onFetchIngredients: () => dispatch(actions.fetchIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirect(path))
    }
}

class BurguerBuilder extends Component {

    state = {
        showOrderModal: false
    }

    componentDidMount(){
        this.props.onFetchIngredients()
    }
    

    getIngredientsAmount = (type) => this.props.ingredients[type] ? this.props.ingredients[type] : 0

    isPurchasable = () =>  Object.values(this.props.ingredients).reduce((curr, next) => curr + next, 0) > 0

    onRemoveHandler = (type) => {
        this.props.onIngredientRemove(type)
    }

    onAddHanlder = (type) => {
        this.props.onIngredientAdd(type)
    }
    onOrderHandler = () => {
        if (this.props.token) {
            this.setState({ showOrderModal: true })
        }
        else {
            this.props.onSetAuthRedirectPath("/checkout")
            this.props.history.push({ pathname: "/auth" })
        }
    }

    onHideOrderModal = () => {
        this.setState({ showOrderModal: false })
    }

    purchaseContinueHandler = () => {        
        this.props.onInitPurchase()
        // Push a new page in stack of pages

        this.props.history.push({ pathname: "/checkout"})
    }

    render() {
        const disabledIngredients = { ...this.props.ingredients }
        for (const key in disabledIngredients) { disabledIngredients[key] = disabledIngredients[key] <= 0 }
        return (
            <Aux>
                {this.props.error ? <p> There was an error</p>:
                    <Aux>
                        <Modal backdropHanlder={this.onHideOrderModal} show={this.state.showOrderModal}>
                            {!this.props.ingredients ? <Spinner /> :
                                (
                                    <OrderSummary
                                        ingredients={this.props.ingredients ? this.props.ingredients : {}}
                                        onCancel={this.onHideOrderModal}
                                        onContinue={this.purchaseContinueHandler}
                                    />)}
                        </Modal>
                {
                            this.props.ingredients ?
                                <Aux>
                                    <Burger ingredients={this.props.ingredients} />
                                    <BurguerControls
                                        added={this.onAddHanlder}
                                        removed={this.onRemoveHandler}
                                        price={this.props.totalPrice}
                                        disabled={disabledIngredients}
                                        purchasable={this.isPurchasable()}
                                        onOrderHandler={() => this.onOrderHandler()}
                                        isAuth={ this.props.token !== null }
                                    />
                                </Aux> :
                                <Spinner />
                        }
                    </Aux>
                }
            </Aux>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withOrderHandler(BurguerBuilder, axios))