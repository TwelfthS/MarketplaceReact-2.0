

const cart = JSON.parse(localStorage.getItem("cart"))

const initialState = cart
? {data: cart}
: {data: []}

function userReducer(state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case 'UPDATE_CART':
            return {data: payload}
        default:
            return state
    }
}

export default userReducer
