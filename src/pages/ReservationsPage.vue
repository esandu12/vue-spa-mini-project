<script setup lang="ts">
import { useReservationStore } from "../stores/reservationStore"
import { RouterLink } from "vue-router"

const store = useReservationStore()
</script>

<template>
  <div class="mx-auto max-w-5xl p-4 space-y-4">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold">Reserved Vehicles</h1>

      <RouterLink to="/" class="text-sm text-blue-600 hover:underline">
        ← Back to vehicles
      </RouterLink>
    </div>

    <div
      v-if="store.reservations.length === 0"
      class="rounded-xl border bg-white p-6 text-gray-700"
    >
      No reservations yet. Go reserve a vehicle for a test drive.
    </div>

    <div v-else class="space-y-3">
      <div
        v-for="r in store.reservations"
        :key="r.vehicle.id"
        class="rounded-2xl border bg-white p-4 flex gap-4 items-start"
      >
        <img
          :src="r.vehicle.thumbnail"
          :alt="r.vehicle.title"
          class="h-24 w-24 rounded-xl object-cover"
        />

        <div class="flex-1">
          <h2 class="font-semibold">{{ r.vehicle.title }}</h2>

          <p class="text-sm text-gray-600">
            {{ r.vehicle.description }}
          </p>

          <div class="mt-2 text-sm text-gray-500">
            Reserved: {{ new Date(r.reservedAt).toLocaleString() }}
          </div>

          <div class="mt-3 flex items-center gap-3">
            <RouterLink
              :to="`/vehicle/${r.vehicle.id}`"
              class="text-sm text-blue-600 hover:underline"
            >
              View details
            </RouterLink>

            <button
              class="text-sm text-red-600 hover:underline"
              type="button"
              @click="store.remove(r.vehicle.id)"
            >
              Cancel Reservation
            </button>
          </div>
        </div>

        <div class="text-right font-bold">$ {{ r.vehicle.price }}</div>
      </div>

      <button
        type="button"
        class="rounded-xl bg-red-600 px-4 py-2 text-white hover:opacity-90"
        @click="store.clear()"
      >
        Clear all
      </button>
    </div>
  </div>
</template>