import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/WithOrderHandler'
import { connect } from 'react-redux'
import { fetchOrders } from '../../stores/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startFetchOrders: (token) => dispatch(fetchOrders(token))

    }
}
class Orders extends Component {

    // TODO: Delete Orders

    componentWillMount() {
        this.props.startFetchOrders(this.props.token)
    }

    render() {
        let orders = <Spinner />
        if (!this.props.loading) {
            orders = this.props.orders.map((order) => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={+order.price}
                />
            ))

        }
        return (
            <div>
                {orders}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))