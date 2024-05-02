import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { ItemCart as Item } from "../types"
import userService from "../services/user.service"

let cart: Item[] = []
const storage = localStorage.getItem("cart")

if (typeof storage === "string") {
    cart = JSON.parse(storage)
}


const initialState: userState = cart
? {data: cart}
: {data: []}

export type userState = {
    data: Item[]
}

export const updateCart = createAsyncThunk(
    'user/updateCart',
    async () => {
        const data = await userService.getCart()
        localStorage.setItem("cart", JSON.stringify(data))
        return { data }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
          .addCase(updateCart.fulfilled, (state, action) => {
            state.data = action.payload.data
          })
    }
})

export default userSlice.reducer
