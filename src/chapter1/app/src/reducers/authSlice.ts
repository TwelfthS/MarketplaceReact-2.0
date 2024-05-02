import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import authService from "../services/auth.service"
import { AxiosErrorResponseData, User } from "../types"
  
let user: User | null = null
const storage = localStorage.getItem("user")

if (typeof storage === "string") {
    user = JSON.parse(storage)
}


export type AuthState = {
    isLoggedIn: boolean,
    user: User | null
}

const initialState: AuthState = user
? { isLoggedIn: true, user }
: { isLoggedIn: false, user: null }

interface Credentials {
    username: string,
    password: string
}

export const signup = createAsyncThunk<
    {user: User},
    Credentials,
    {
        rejectValue: AxiosErrorResponseData
    }
>(
    'auth/signup',
    async ({username, password}, { rejectWithValue }) => {
        try {
           const data = await authService.register(username, password)
            return { user: data }
        } catch(err) {
            if (err.response.data) {
                return rejectWithValue(err.response.data)
            } else {
                return rejectWithValue({message: "Unknown error"})
            }
        }
    }
)

export const signin = createAsyncThunk<
    {user: User},
    Credentials,
    {
        rejectValue: AxiosErrorResponseData
    }
>(
    'auth/signin',
    async ({username, password}, { rejectWithValue }) => {
        try {
            const data = await authService.login(username, password)
            return { user: data }
        } catch(err) {
            if (err.response.data) {
                return rejectWithValue(err.response.data)
            } else {
                return rejectWithValue({message: "Unknown error"})
            }
        }
    }
)



const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loggedOut(state, action: PayloadAction<void>) {
            authService.logout()
            return {
                isLoggedIn: false,
                user: null
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signup.pending, (state) => {
                state.isLoggedIn = false
                state.user = null
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.isLoggedIn = true
                state.user = action.payload.user
            })
            .addCase(signup.rejected, (state, action) => {
                state.isLoggedIn = false
                state.user = null
            })
            .addCase(signin.pending, (state) => {
                state.isLoggedIn = false
                state.user = null
            })
            .addCase(signin.fulfilled, (state, action) => {
                state.isLoggedIn = true
                state.user = action.payload.user
            })
            .addCase(signin.rejected, (state, action) => {
                state.isLoggedIn = false
                state.user = null
            })
      }
})

export const { loggedOut } = authSlice.actions

export default authSlice.reducer