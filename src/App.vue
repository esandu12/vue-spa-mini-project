<script setup lang="ts">
import { onMounted } from "vue"
import { RouterLink, RouterView } from "vue-router"
import { useReservationStore } from "./stores/reservationStore"
import { useAuthStore } from "./stores/authStore"

const reservationStore = useReservationStore()
const auth = useAuthStore()

onMounted(() => {
  reservationStore.loadFromLocalStorage()
  auth.load()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <header class="border-b bg-white">
      <div class="mx-auto max-w-6xl p-4 flex items-center justify-between">
        <div>
          <h1 class="text-xl font-semibold">AutoReserve</h1>
          <p class="text-sm text-gray-600">Reserve a vehicle, book a test drive.</p>
        </div>

        <nav class="flex items-center gap-4 text-sm">
          <RouterLink to="/" class="hover:underline">Vehicles</RouterLink>
          <RouterLink to="/reservations" class="hover:underline">Reservations</RouterLink>

          <button
            v-if="auth.isAuthenticated"
            @click="auth.logout()"
            class="rounded-lg border px-3 py-1 hover:bg-gray-50"
            type="button"
          >
            Logout
          </button>

          <RouterLink
            v-else
            to="/login"
            class="rounded-lg bg-black px-3 py-1 text-white hover:opacity-90"
          >
            Login
          </RouterLink>
        </nav>
      </div>
    </header>

    <main class="mx-auto max-w-6xl p-4">
      <RouterView />
    </main>
  </div>
</template>