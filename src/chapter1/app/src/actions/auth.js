import AuthService from "../services/auth.service"
import userService from "../services/user.service"

export const signup = (username, password) => async (dispatch) => {
    try {
        const data = await AuthService.register(username, password)
        dispatch({
            type: 'REGISTER_SUCCESS',
            payload: { user: data }
        })
        
        return Promise.resolve()
    } catch (error) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()

        dispatch({
            type: 'REGISTER_FAIL',
        })

        dispatch({
            type: 'SET_MESSAGE',
            payload: message,
        })
        return Promise.reject()
    }
}

export const login = (username, password) => async (dispatch) => {
    try {
        const data = await AuthService.login(username, password)
        dispatch({
            type: 'LOGIN_SUCCESS',
            payload: { user: data },
        })
        const cartResponse = await userService.getCart()
        const cart = cartResponse.data
        dispatch({
            type: 'UPDATE_CART',
            payload: cart
        })
        return Promise.resolve()
    } catch (error) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()

        dispatch({
            type: 'LOGIN_FAIL',
        })

        dispatch({
            type: 'SET_MESSAGE',
            payload: message,
        })
        return Promise.reject()
    }
}

export const logout = () => (dispatch) => {
    AuthService.logout()

    dispatch({
        type: 'LOGOUT',
    })
}