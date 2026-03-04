<script setup lang="ts">
import { onMounted } from "vue"
import { RouterView } from "vue-router"
import { useReservationStore } from "./stores/reservationStore"

const reservationStore = useReservationStore()

onMounted(() => {
  reservationStore.loadFromLocalStorage()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <header class="border-b bg-white">
      <div class="mx-auto max-w-6xl p-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-xl font-semibold">AutoReserve</h1>
            <p class="text-sm text-gray-600">Reserve a vehicle, book a test drive.</p>
          </div>
        </div>
      </div>
    </header>

    <main class="mx-auto max-w-6xl p-4">
      <RouterView />
    </main>
  </div>
</template>