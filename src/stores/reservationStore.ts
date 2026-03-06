import { defineStore } from "pinia"
import type { Product } from "../types/product"

export type CustomerInfo = {
  fullName: string
  phone: string
  email: string
  preferredDate?: string
  preferredTime?: string
  message?: string
}

export type Reservation = {
  vehicle: Product
  reservedAt: string
  customer?: CustomerInfo
}

const STORAGE_KEY = "autoreserve_reservations"

export const useReservationStore = defineStore("reservation", {
  state: () => ({
    reservations: [] as Reservation[],
  }),

  getters: {
    count: (state) => state.reservations.length,

    has: (state) => (id: number) =>
      state.reservations.some((r) => r.vehicle.id === id),

    getVehicleById: (state) => (id: number) => {
      const found = state.reservations.find((r) => r.vehicle.id === id)
      return found ? found.vehicle : null
    },
  },

  actions: {
    add(vehicle: Product) {
      if (this.reservations.some((r) => r.vehicle.id === vehicle.id)) return

      this.reservations.unshift({
        vehicle,
        reservedAt: new Date().toISOString(),
      })

      this.saveToLocalStorage()
    },

    confirmReservation(vehicleId: number, customer: CustomerInfo) {
      const reservation = this.reservations.find((r) => r.vehicle.id === vehicleId)
      if (!reservation) return

      reservation.customer = customer
      this.saveToLocalStorage()
    },

    remove(vehicleId: number) {
      this.reservations = this.reservations.filter(
        (r) => r.vehicle.id !== vehicleId
      )
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
        this.reservations = JSON.parse(raw) as Reservation[]
      } catch {
        this.reservations = []
      }
    },
  },
})