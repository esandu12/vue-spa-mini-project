import { defineStore } from "pinia"
import type { LoginResponse } from "../services/auth.api"

type State = {
  user: LoginResponse | null
}

const AUTH_KEY = "autoreserve_auth_v1"

export const useAuthStore = defineStore("auth", {
  state: (): State => ({
    user: null,
  }),

  getters: {
    isAuthenticated: (s) => s.user !== null,
  },

  actions: {
    setUser(user: LoginResponse) {
      this.user = user
      localStorage.setItem(AUTH_KEY, JSON.stringify(user))
    },

    load() {
      const raw = localStorage.getItem(AUTH_KEY)
      if (!raw) return
      try {
        this.user = JSON.parse(raw) as LoginResponse
      } catch {
        this.user = null
      }
    },

    logout() {
      this.user = null
      localStorage.removeItem(AUTH_KEY)
    },
  },
})