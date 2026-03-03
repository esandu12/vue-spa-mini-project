import { defineStore } from "pinia"
import type { Product } from "../types/product"

export type Reservation = {
  vehicle: Product
  reservedAt: string
}

const STORAGE_KEY = "autoreserve_reservations"

export const useReservationStore = defineStore("reservation", {
  state: () => ({
    reservations: [] as Reservation[],
  }),

  actions: {
    load() {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      try {
        this.reservations = JSON.parse(raw) as Reservation[]
      } catch {
        this.reservations = []
      }
    },

    save() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.reservations))
    },

    add(vehicle: Product) {
      const exists = this.reservations.some(r => r.vehicle.id === vehicle.id)
      if (exists) return

      this.reservations.push({
        vehicle,
        reservedAt: new Date().toISOString(),
      })
      this.save()
    },

    remove(vehicleId: number) {
      this.reservations = this.reservations.filter(r => r.vehicle.id !== vehicleId)
      this.save()
    },

    clear() {
      this.reservations = []
      this.save()
    },
  },
})