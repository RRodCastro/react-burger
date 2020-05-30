import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/WithOrderHandler'

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentWillMount() {
        axios.get("/orders.json")
            .then((res) => {
                const orders = Object.keys(res.data)
                    .map((key) => { return { id: key, ...res.data[key] } })
                this.setState({ loading: false, orders })
            })
            .catch(err => {
                this.setState({ loading: false })
            })

    }

    render() {
        return (
            <div>
                {this.state.orders.map((order) => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={+order.price}
                    />
                ))}
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios)