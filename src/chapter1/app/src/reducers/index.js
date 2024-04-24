import { combineReducers } from "redux"
import auth from "./authSlice"
import message from "./message"
import user from "./user"

export default {
  auth,
  message,
  user
}