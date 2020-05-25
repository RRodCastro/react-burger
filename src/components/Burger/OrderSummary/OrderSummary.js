import React from 'react'
import Wrapper from '../../../hoc/Wrapper'

const orderSummary = (props) => {

    const ingredients = Object.keys(props.ingredients).map((ingredientKey) => (
        <li key={ingredientKey}>
            <span style={{ textTransform: 'capitalize' }}>{ingredientKey} </span> : {props.ingredients[ingredientKey]}
        </li>
    ))
    return (
        <Wrapper>
            <h3>Your order</h3>
            <ul>
                {ingredients}
            </ul>
            <p>Continue to checkout</p>
        </Wrapper>
    )
}

export default orderSummary