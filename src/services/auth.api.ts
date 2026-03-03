import type { LoginRequest, LoginResponse } from "../types/auth"

export async function login(body: LoginRequest): Promise<LoginResponse> {
  const res = await fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    throw new Error("Login failed")
  }

  return (await res.json()) as LoginResponse
}