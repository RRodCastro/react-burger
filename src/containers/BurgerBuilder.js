import React, { Component } from 'react'
import Aux from '../hoc/Hoc/Wrapper'
import Burger from '../components/Burger/Burger';
import BurguerControls from '../components/Burger/BuildControls/BuildControls'
import Modal from '../components/UI/Modal/Modal';
import OrderSummary from '../components/Burger/OrderSummary/OrderSummary';
import axios from '../axios-orders'
import Spinner from '../components/UI/Spinner/Spinner'
import withOrderHandler from '../hoc/withErrorHandler/WithOrderHandler'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};


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
                this.setState({
                    ingredients: response.data,
                    loading: false
                })
            })
            .catch(error => {
                this.setState({ error: true })
                console.log(error)
            })
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
        this.setState({ showOrderModal: false })
    }

    purchaseContinueHandler = () => {
        // store order
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Name',
                address: {
                    street: 'Street 1',
                    zipCode: '0000',
                    country: '???'
                },
                email: 'test@test.com',
            },
            delivery: 'Glovo'

        }
        this.setState({ loading: true })
        axios.post('/orders.json', order)
            .then((response) => {
                console.log(response)
                this.setState({ loading: false, showOrderModal: false })
            })
            .catch(error => {
                this.setState({ loading: false, showOrderModal: false });
                console.log(error)
            })


    }



    render() {
        const disabledIngredients = { ...this.state.ingredients }
        for (const key in disabledIngredients) { disabledIngredients[key] = disabledIngredients[key] <= 0 }

        return (
            <Aux>
                {this.state.error ? <p> There was an error</p>:
                    <Aux>
                        <Modal backdropHanlder={this.onHideOrderModal} show={this.state.showOrderModal}>
                            {this.state.loading ? <Spinner /> :
                                (
                                    <OrderSummary
                                        ingredients={this.state.ingredients ? this.state.ingredients : {}}
                                        onCancel={this.onHideOrderModal}
                                        onContinue={this.purchaseContinueHandler}
                                    />)}
                        </Modal>)
                {
                            this.state.ingredients ?
                                <Aux>
                                    <Burger ingredients={this.state.ingredients} />
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

export default withOrderHandler(BurguerBuilder, axios)