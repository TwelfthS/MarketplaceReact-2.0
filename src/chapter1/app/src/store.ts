import { configureStore } from "@reduxjs/toolkit"
import auth from "./reducers/authSlice"
import message from "./reducers/message"
import user from "./reducers/user"

const store = configureStore({
    reducer: {
        auth,
        message,
        user
    },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store