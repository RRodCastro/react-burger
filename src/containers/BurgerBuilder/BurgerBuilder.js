import React, { Component } from 'react'
import Aux from '../../hoc/Hoc/Wrapper'
import Burger from '../../components/Burger/Burger';
import BurguerControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withOrderHandler from '../../hoc/withErrorHandler/WithOrderHandler'
import { connect } from 'react-redux'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        onIngredientChange: (ingredients) => dispatch({type: 'UPDATE_INGRED', value: ingredients })
    }
}


class BurguerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        showOrderModal: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        this.setState({ loading: true })
        // Fetch ingredients
        axios.get("https://testing-9511d.firebaseio.com/ingredients.json")
            .then((response) => {
                this.props.onIngredientChange(response.data)
                this.setState({
                    loading: false
                })
            })
            .catch(error => {
                this.setState({ error: true })
            })
    }

    getIngredientsAmount = (type) => this.props.ingredients[type] ? this.props.ingredients[type] : 0

    updatePurchaseState(ingredients) {
        const purchasable = Object.values(ingredients).reduce((curr, next) => curr + next, 0) > 0
        this.setState({ purchasable })

    }

    onRemoveHandler = (type) => {
        const currentQty = this.getIngredientsAmount(type)
        if (currentQty <= 0) {
            return;
        }
        const ingredients = { ...this.props.ingredients }
        ingredients[type] = currentQty - 1

        this.props.onIngredientChange(ingredients)
        const currentPrice = this.state.totalPrice
        const totalPrice = currentPrice - INGREDIENT_PRICES[type]
        this.setState({ totalPrice })
        this.updatePurchaseState(ingredients)
    }

    onAddHanlder = (type) => {
        const currentQty = this.getIngredientsAmount(type)
        const ingredients = { ...this.props.ingredients }
        ingredients[type] = currentQty + 1
        const currentPrice = this.state.totalPrice
        const totalPrice = currentPrice + INGREDIENT_PRICES[type]
        this.props.onIngredientChange(ingredients)
        this.setState({ totalPrice })
        this.updatePurchaseState(ingredients)
    }
    onOrderHandler = () => {
        this.setState({ showOrderModal: true })
    }

    onHideOrderModal = () => {
        this.setState({ showOrderModal: false })
    }

    purchaseContinueHandler = () => {        
        // Push a new page in stack of pages

        this.props.history.push(
            { pathname: "/checkout",
            ingredients: this.props.ingredients,
            totalPrice: this.state.totalPrice.toFixed(2) })
    }

    render() {
        const disabledIngredients = { ...this.props.ingredients }
        for (const key in disabledIngredients) { disabledIngredients[key] = disabledIngredients[key] <= 0 }
        return (
            <Aux>
                {this.state.error ? <p> There was an error</p>:
                    <Aux>
                        <Modal backdropHanlder={this.onHideOrderModal} show={this.state.showOrderModal}>
                            {this.state.loading ? <Spinner /> :
                                (
                                    <OrderSummary
                                        ingredients={this.props.ingredients ? this.props.ingredients : {}}
                                        onCancel={this.onHideOrderModal}
                                        onContinue={this.purchaseContinueHandler}
                                    />)}
                        </Modal>
                {
                            !this.state.loading ?
                                <Aux>
                                    <Burger ingredients={this.props.ingredients} />
                                    <BurguerControls
                                        added={this.onAddHanlder}
                                        removed={this.onRemoveHandler}
                                        price={this.state.totalPrice}
                                        disabled={disabledIngredients}
                                        purchasable={this.state.purchasable}
                                        onOrderHandler={() => this.onOrderHandler()}
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