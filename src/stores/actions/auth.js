import * as actionTypes from './actionsTypes'
import axios from 'axios'
import { FIREBASE_KEY } from '../../utils/constants'

export const authStart = () => {
    return {
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
export const logOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeOut = (expirationTime) => {
    return dispatch => {
        setTimeout( () => {
            dispatch(logOut())
        } , expirationTime * 1000)
    }
}

export const auth = (email, pwd, isSignup) => {
    return dispatch => {
        let url;
        if (isSignup) {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + FIREBASE_KEY
        }
        else {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + FIREBASE_KEY
        }
        dispatch(authStart())
        axios.post(url,
            { email: email, password: pwd, returnSecureToken: true })
            .then((response) => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
                localStorage.setItem('token', response.data.idToken)
                localStorage.setItem('expirationDate', expirationDate)
                localStorage.setItem('userId', response.data.localId)
                dispatch(authSuccess(response.data))
                dispatch(checkAuthTimeOut(response.data.expiresIn))
            }
            )
            .catch((error) => dispatch(authFail(error.response.data.error)))
    }
}

export const setAuthRedirect = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem("token")
        if (!token) {
            dispatch(logOut())
        }
        else {
        const expirationDate = new Date(localStorage.getItem("expirationDate"))
        if (expirationDate <= new Date()) {
            dispatch(logOut())
        }
        else {
            const userId = localStorage.getItem("userId")
            dispatch(authSuccess({idToken: token, localId: userId}))
            dispatch(checkAuthTimeOut( (expirationDate.getTime() - new Date ().getTime()) / 1000))
        }
    }
    }
}