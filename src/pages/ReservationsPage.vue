<script setup lang="ts">
import { useReservationStore } from "../stores/reservationStore"
import { RouterLink } from "vue-router"

const store = useReservationStore()
</script>

<template>
  <div class="mx-auto max-w-5xl space-y-4">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-bold">Reserved Vehicles</h2>
      <RouterLink class="text-sm text-blue-600 hover:underline" to="/">← Back to vehicles</RouterLink>
    </div>

    <p v-if="store.reservations.length === 0" class="text-gray-600">
      No reservations yet. Reserve a vehicle for a test drive.
    </p>

    <div v-else class="space-y-3">
      <div
        v-for="r in store.reservations"
        :key="r.vehicle.id"
        class="flex items-start gap-4 rounded-2xl border bg-white p-4"
      >
        <img
          :src="r.vehicle.thumbnail"
          :alt="r.vehicle.title"
          class="h-24 w-24 rounded-xl object-cover"
        />

        <div class="flex-1">
          <h3 class="font-semibold">{{ r.vehicle.title }}</h3>
          <p class="text-sm text-gray-600 line-clamp-2">{{ r.vehicle.description }}</p>
          <p class="text-xs text-gray-500 mt-2">Reserved: {{ new Date(r.reservedAt).toLocaleString() }}</p>

          <div class="mt-2 flex gap-3 text-sm">
            <RouterLink class="text-blue-600 hover:underline" :to="`/vehicle/${r.vehicle.id}`">
              View details
            </RouterLink>

            <button class="text-red-600 hover:underline" type="button" @click="store.remove(r.vehicle.id)">
              Cancel Reservation
            </button>
          </div>
        </div>

        <div class="text-right font-bold">$ {{ r.vehicle.price }}</div>
      </div>

      <button
        class="w-fit rounded-xl bg-red-600 px-4 py-2 text-white hover:opacity-90"
        type="button"
        @click="store.clear()"
      >
        Clear all
      </button>
    </div>
  </div>
</template>