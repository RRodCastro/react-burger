import React from 'react'
import classes from './Order.css'

const order = (props) => {
    const ingredients = []

    for (const ingredient in props.ingredients){
        ingredients.push({
            name: ingredient,
            amount: props.ingredients[ingredient]
        })
    }
    return (
        <div className={classes.Order}>
            Ingredients: {ingredients.map( (ingredient, key) => (
                <span style={{textTransform: 'capitalize', display: 'inline-block', margin: '0 8px', border: '1px solid #ccc', padding: '5px'}}
                    key={key}>
                    {ingredient.name}
                    ({ingredient.amount})
                </span>
            ))}
            <p> <strong> USD {props.price.toFixed(2)} </strong></p>
        </div>
    )
}

export default order