import userService from "../services/user.service"

export const updateCart = () => async (dispatch) => {
    try {
        const response = await userService.getCart()
        const data = response.data
        dispatch({
            type: 'UPDATE_CART',
            payload: data
        })
        localStorage.setItem("cart", JSON.stringify(data))
        return Promise.resolve()
    } catch (error) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()

        dispatch({
            type: 'SET_MESSAGE',
            payload: message,
        })
        return Promise.reject()
    }
}