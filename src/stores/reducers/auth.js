import * as actionTypes from '../actions/actionsTypes'

const initialState = {
    loading: false,
    error: null,
    token: null,
    userId: null
}


const reducer = (state=initialState, action) => {

    switch(action.type){
        case (actionTypes.AUTH_START):
            return {
                ...state,
                loading: true
            }
        case (actionTypes.AUTH_SUCCESS):
            return {
                ...state,
                token: action.token,
                userId: action.userId,
                loading: false
            }
        case (actionTypes.AUTH_FAIL):
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state
    }

}

export default reducer