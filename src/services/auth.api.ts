import { httpPost } from "./http"

export type LoginResponse = {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  token: string
}

export async function login(username: string, password: string) {
  return httpPost<LoginResponse>("/auth/login", { username, password })
}