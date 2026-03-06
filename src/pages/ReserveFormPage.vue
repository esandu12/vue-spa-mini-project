<script setup lang="ts">
import { RouterLink } from "vue-router"
import { useReservationStore } from "../stores/reservationStore"

const store = useReservationStore()
store.loadFromLocalStorage()
</script>

<template>
  <div class="mx-auto max-w-5xl p-4 space-y-6">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-bold">Reserved Vehicles</h2>

      <RouterLink to="/" class="text-sm text-blue-600 hover:underline dark:text-blue-400">
        ← Back to vehicles
      </RouterLink>
    </div>

    <div
      v-if="store.reservations.length === 0"
      class="rounded-2xl border bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-800"
    >
      <p class="text-lg font-medium">No reservations yet</p>
      <p class="text-gray-500 dark:text-gray-300">
        Reserve a vehicle to schedule a test drive.
      </p>

      <RouterLink
        to="/"
        class="mt-4 inline-block rounded-lg bg-black px-4 py-2 text-white hover:opacity-90 dark:bg-white dark:text-black"
      >
        Browse Vehicles
      </RouterLink>
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="r in store.reservations"
        :key="r.vehicle.id"
        class="flex items-start gap-4 rounded-2xl border bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
      >
        <img
          :src="r.vehicle.thumbnail"
          :alt="r.vehicle.title"
          class="h-24 w-24 rounded-xl object-cover"
        />

        <div class="flex-1 space-y-1">
          <h3 class="text-lg font-semibold">{{ r.vehicle.title }}</h3>

          <p class="line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
            {{ r.vehicle.description }}
          </p>

          <p class="text-xs text-gray-500 dark:text-gray-400">
            Reserved: {{ new Date(r.reservedAt).toLocaleString() }}
          </p>

          <div
            v-if="r.customer"
            class="mt-3 space-y-1 rounded-xl border bg-gray-50 p-3 text-sm text-gray-700 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
          >
            <p><b>Name:</b> {{ r.customer.fullName }}</p>
            <p><b>Phone:</b> {{ r.customer.phone }}</p>
            <p><b>Email:</b> {{ r.customer.email }}</p>

            <p v-if="r.customer.preferredDate">
              <b>Date:</b> {{ r.customer.preferredDate }}
            </p>

            <p v-if="r.customer.preferredTime">
              <b>Time:</b> {{ r.customer.preferredTime }}
            </p>

            <p v-if="r.customer.message">
              <b>Message:</b> {{ r.customer.message }}
            </p>
          </div>

          <div class="pt-2 flex gap-4 text-sm">
            <RouterLink
              :to="`/vehicle/${r.vehicle.id}`"
              class="text-blue-600 hover:underline dark:text-blue-400"
            >
              View details
            </RouterLink>

            <button
              type="button"
              class="text-red-600 hover:underline"
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
        class="w-fit rounded-xl bg-red-600 px-4 py-2 text-white hover:opacity-90"
        @click="store.clear()"
      >
        Clear all
      </button>
    </div>
  </div>
</template>