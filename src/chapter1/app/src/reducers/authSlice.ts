import { createAsyncThunk, createSlice, PayloadAction, PrepareAction } from "@reduxjs/toolkit"
import authService from "../services/auth.service"

interface User {
    id: number,
    username: string,
    accessToken: string
}
  
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

export const signup = createAsyncThunk(
    'auth/signup',
    async ({username, password}: Credentials) => {
        const data = await authService.register(username, password)
        return { user: data }
    }
)

export const signin = createAsyncThunk(
    'auth/signin',
    async ({username, password}: Credentials) => {
        const data = await authService.login(username, password)
        return { user: data }
    }
)



const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loggedOut(state, action: PayloadAction<void>) {
            authService.logout()
            state = {
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
                state.message = ''
            })
            .addCase(signup.rejected, (state, action) => {
                state.isLoggedIn = false
                state.user = null
                state.message = action.error.message || 'Signup failed'
            })
            .addCase(signin.pending, (state) => {
                state.isLoggedIn = false
                state.user = null
            })
            .addCase(signin.fulfilled, (state, action) => {
                state.isLoggedIn = true
                state.user = action.payload.user
                state.message = ''
            })
            .addCase(signin.rejected, (state, action) => {
                state.isLoggedIn = false
                state.user = null
                state.message = action.error.message || 'Signin failed'
            })
      }
})

// function authReducer(state = initialState, action) {
//     const { type, payload } = action

//     switch (type) {
//         case 'REGISTER_SUCCESS':
//         return 
//         case 'REGISTER_FAIL':
//         return {
//             ...state,
//             isLoggedIn: false,
//         }
//         case 'LOGIN_SUCCESS':
//         return {
//             ...state,
//             isLoggedIn: true,
//             user: payload.user,
//         }
//         case 'LOGIN_FAIL':
//         return {
//             ...state,
//             isLoggedIn: false,
//             user: null,
//         }
//         case 'LOGOUT':
//         return {
//             ...state,
//             isLoggedIn: false,
//             user: null,
//         }
//         default:
//         return state
//     }
// }

export const { loggedOut } = authSlice.actions

export default authSlice.reducer