import React, { Component } from 'react'
import Aux from '../hoc/Wrapper'
import Burger from '../components/Burger/Burger';
import BurguerControls from '../components/Burger/BuildControls/BuildControls'
import Modal from '../components/UI/Modal/Modal';
import OrderSummary from '../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};


class BurguerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        showOrderModal: false
    }

    getIngredientsAmount = (type) => this.state.ingredients[type] ? this.state.ingredients[type] : 0

    updatePurchaseState(ingredients) {
        const purchasable = Object.values(ingredients).reduce((curr, next) => curr + next, 0) > 0
        this.setState({ purchasable })

    }

    onRemoveHandler = (type) => {
        const currentQty = this.getIngredientsAmount(type)
        if (currentQty <= 0) {
            return;
        }
        const ingredients = { ...this.state.ingredients }
        ingredients[type] = currentQty - 1

        const currentPrice = this.state.totalPrice
        const totalPrice = currentPrice - INGREDIENT_PRICES[type]
        this.setState({ ingredients, totalPrice })
        this.updatePurchaseState(ingredients)
    }

    onAddHanlder = (type) => {
        const currentQty = this.getIngredientsAmount(type)
        const ingredients = { ...this.state.ingredients }
        ingredients[type] = currentQty + 1
        const currentPrice = this.state.totalPrice
        const totalPrice = currentPrice + INGREDIENT_PRICES[type]
        this.setState({ ingredients, totalPrice })
        this.updatePurchaseState(ingredients)
    }
    onOrderHandler = () => {
        this.setState({ showOrderModal: true })
    }

    onHideOrderModal = () => {
        this.setState({showOrderModal: false})
    }

    

    render() {
        const disabledIngredients = { ...this.state.ingredients }
        for (const key in disabledIngredients) { disabledIngredients[key] = disabledIngredients[key] <= 0 }
        return (
            <Aux>
                <Modal backdropHanlder={this.onHideOrderModal} show={this.state.showOrderModal}>
                    <OrderSummary ingredients={this.state.ingredients} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BurguerControls
                    added={this.onAddHanlder}
                    removed={this.onRemoveHandler}
                    price={this.state.totalPrice}
                    disabled={disabledIngredients}
                    purchasable={this.state.purchasable}
                    onOrderHandler={() => this.onOrderHandler()}
                />
            </Aux>
        )
    }
}

export default BurguerBuilder