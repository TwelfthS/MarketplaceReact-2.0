import axios from "axios"

const API_URL = "http://localhost:8000/"

class AuthService {
  async login(username, password) {
    const response = await axios.post(API_URL + "signin", { username, password })
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data))
    }
    return response.data
  }

  logout() {
    localStorage.removeItem("user")
    localStorage.removeItem("cart")
  }

  async register(username, password) {
    const response = await axios.post(API_URL + "signup", {
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