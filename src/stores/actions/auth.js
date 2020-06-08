import * as actionTypes from './actionsTypes'
import axios from 'axios'
import { FIREBASE_KEY } from '../../utils/constants'

export const authStart = () => {
    return{
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: authData.idToken,
        userId: authData.localId

    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const auth = (email, pwd, isSignup ) => {
    return dispatch => {
        let url;
        if (isSignup) {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+FIREBASE_KEY
        }
        else {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+FIREBASE_KEY
        }
        dispatch(authStart())
        axios.post(url,
        {email: email, password: pwd, returnSecureToken: true})
        .then( (response) => dispatch(authSuccess(response.data)))
        .catch( (error) => dispatch(authFail(error.response.data.error)) )
    }
}