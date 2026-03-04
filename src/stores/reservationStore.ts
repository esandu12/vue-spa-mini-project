import { defineStore } from "pinia"
import type { Product } from "../types/product"

export type Reservation = {
  vehicle: Product
  reservedAt: string // ISO
}

type State = {
  reservations: Reservation[]
}

const STORAGE_KEY = "autoreserve_reservations_v1"

export const useReservationStore = defineStore("reservation", {
  state: (): State => ({
    reservations: [],
  }),

  getters: {
    count: (state) => state.reservations.length,
    has: (state) => (id: number) => state.reservations.some(r => r.vehicle.id === id),
  },

  actions: {
    add(vehicle: Product) {
      if (this.reservations.some(r => r.vehicle.id === vehicle.id)) return
      this.reservations.unshift({ vehicle, reservedAt: new Date().toISOString() })
      this.saveToLocalStorage()
    },

    remove(vehicleId: number) {
      this.reservations = this.reservations.filter(r => r.vehicle.id !== vehicleId)
      this.saveToLocalStorage()
    },

    clear() {
      this.reservations = []
      this.saveToLocalStorage()
    },

    saveToLocalStorage() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.reservations))
    },

    loadFromLocalStorage() {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      try {
        const parsed = JSON.parse(raw) as Reservation[]
        // basic validation
        if (Array.isArray(parsed)) this.reservations = parsed
      } catch {
        // ignore corrupted storage
      }
    },
  },
})