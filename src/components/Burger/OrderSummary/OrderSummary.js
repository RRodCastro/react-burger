import React from 'react'
import Wrapper from '../../../hoc/Hoc/Wrapper'
import Button from '../../UI/Button/Button'

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
            <Button clicked={props.onCancel} btnType="Danger">  CANCEL </Button>
            <Button clicked={props.onContinue} btnType="Success">  CONTINUE </Button>
        </Wrapper>
    )
}

export default orderSummary