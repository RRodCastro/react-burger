import React from 'react'
import classes from './Burger.css'
import BurgerIngredient from './Ingrendients/BurgerIngredient'

const burguer = (props) => {
    const transformedIngredients = Object.keys(props.ingredients)
        .map((ingredient) => {
            const _ = Array(props.ingredients[ingredient])
            // spread the prev array => [undefined,...]
            return [..._].map((_, index) => {
                return <BurgerIngredient key={ingredient + index} type={ingredient} />
            })
        }).reduce((curr, next) => { return curr.concat(next) }, [])
    return (
        <div className={classes.Burger} >
            <BurgerIngredient type="bread-top" />
            {
                transformedIngredients.length > 0 ? transformedIngredients :
                    (<p>Add ingredients!</p>)
            }
            <BurgerIngredient type="bread-bottom" />

        </div>
    )
}

export default burguer