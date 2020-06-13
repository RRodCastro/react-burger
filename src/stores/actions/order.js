import * as actionTypes from './actionsTypes';
import axios from '../../axios-orders'

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrderFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = (token, userdId) => {
    return dispatch => {
        dispatch(fetchOrderStart())
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userdId + '"'
        axios.get("/orders.json" + queryParams)
        .then ( (res) => {
            const orders = Object.keys(res.data).map((key) => { return { id: key, ...res.data[key] } })
            dispatch(fetchOrderSuccess(orders))
        })
        .catch(error => {
            dispatch(fetchOrderFail(error))
        })
    }
}


export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axios.post('/orders.json?auth=' + token, orderData)
        .then( (response) => {
            dispatch(purchaseBurgerSuccess(response.data.name, orderData))
        })
        .catch( (error) => {
            dispatch(purchaseBurgerFail(error))
        })
    }
}

