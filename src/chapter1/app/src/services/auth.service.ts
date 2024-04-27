import axios, { AxiosResponse } from "axios"
import { User } from "../types"

const API_URL = "http://localhost:8000/"

class AuthService {
  async login(username: string, password: string) {
    const response: AxiosResponse<User> = await axios.post(API_URL + "signin", { username, password })
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data))
    }
    return response.data
  }

  logout() {
    localStorage.removeItem("user")
    localStorage.removeItem("cart")
  }

  async register(username: string, password: string) {
    const response: AxiosResponse<User> = await axios.post(API_URL + "signup", {
      username,
      password
    })
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data))
    }
    return response.data
  }
}

const authService = new AuthService()

export default authService