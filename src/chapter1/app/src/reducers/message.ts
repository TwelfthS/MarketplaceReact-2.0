import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { signin, signup } from "./authSlice"
import { AxiosError } from "axios"
import { AxiosErrorResponseData } from "../types"
import { updateCart } from "./user"

export type messageState = {
  message: string
}

const initialState: messageState = {message: ''}

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage: {
      reducer: (state, action: PayloadAction<{message: string}>) => {
        state.message = action.payload.message
      },
      prepare: (error: AxiosError<AxiosErrorResponseData> | string) => {
        let message: string = ''
        if (typeof error !== "string") {
          message = (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        } else {
          message = error
        }
        return {
          payload: {message: message}
        }
      }
    },
    messageCleared(state, action: PayloadAction<void>) {
      state.message = ''
    }
  },
  extraReducers: builder => {
    builder
      .addCase(signin.fulfilled, (state, action) => {
        state.message = ''
      })
      .addCase(signin.rejected, (state, action) => {
        state.message = action.error.message || 'Login failed'
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.message = ''
      })
      .addCase(signup.rejected, (state, action) => {
        state.message = action.error.message || 'Registration failed'
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.message = ''
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.message = action.error.message || 'Failed loading cart'
      })
  }
})

export const {setMessage, messageCleared} = messageSlice.actions

export default messageSlice.reducer