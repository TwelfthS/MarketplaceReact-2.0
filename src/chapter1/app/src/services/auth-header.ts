import { User } from "../types"

export default function authHeader() {
  const storage = localStorage.getItem("user")
  let user: User | null = null

  if (typeof storage === "string") {
      user = JSON.parse(storage)
  }
  
  if (user && user.accessToken) {
    return { 'x-access-token': user.accessToken }
  } else {
    return {}
  }
}