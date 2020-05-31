const initialState = {
    ingredients: {
        bacon: 0,
        cheese: 0,
        meat: 0,
        salad: 0
    }
}
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'UPDATE_INGRED':
            return {
                ...state,
                ingredients: action.value
        }

        default:
            return state
    }
    
}
export default reducer