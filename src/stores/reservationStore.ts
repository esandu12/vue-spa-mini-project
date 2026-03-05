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

type State = {
  reservations: Reservation[]
}

const STORAGE_KEY = "autoreserve_reservations_v2"

export const useReservationStore = defineStore("reservation", {
  state: (): State => ({
    reservations: [],
  }),

  getters: {
    count: (state) => state.reservations.length,

    getVehicleById: (state) => (id: number) => {
      const r = state.reservations.find(x => x.vehicle.id === id)
      return r?.vehicle ?? null
    },

    has: (state) => (id: number) => state.reservations.some(r => r.vehicle.id === id),
  },

  actions: {
    add(vehicle: Product) {
      if (this.reservations.some(r => r.vehicle.id === vehicle.id)) return
      this.reservations.unshift({
        vehicle,
        reservedAt: new Date().toISOString(),
      })
      this.saveToLocalStorage()
    },

    confirmReservation(vehicleId: number, customer: CustomerInfo) {
      const r = this.reservations.find(x => x.vehicle.id === vehicleId)
      if (!r) return
      r.customer = customer
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
        if (Array.isArray(parsed)) this.reservations = parsed
      } catch {
        // ignore
      }
    },
  },
})