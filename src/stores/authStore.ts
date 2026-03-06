import { defineStore } from "pinia"
import type { LoginResponse } from "../services/auth.api"

const STORAGE_KEY = "autoreserve_user"

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as LoginResponse | null,
  }),

  getters: {
    isAuthenticated: (state) => state.user !== null,
  },

  actions: {
    setUser(user: LoginResponse) {
      this.user = user
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    },

    load() {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return

      try {
        this.user = JSON.parse(raw)
      } catch {
        this.user = null
      }
    },

    logout() {
      this.user = null
      localStorage.removeItem(STORAGE_KEY)
    },
  },
})