import * as actionTypes from './actionsTypes'
import axios from '../../axios-orders'

export const addIngredient = (ingredientName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingredientName
    }
}

export const removeIngredient = (ingredientName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingredientName
    }
}
export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngredientsFail = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAIL
    }
}

// redux-thunk working
export const fetchIngredients = () => {
    return dispatch => {
        axios.get("https://testing-9511d.firebaseio.com/ingredients.json")
        .then((response) => {
            dispatch(setIngredients(response.data ))
        })
        .catch(() => {
            dispatch(fetchIngredientsFail())
        })

    }
}
