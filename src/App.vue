<script setup lang="ts">
import { onMounted, ref } from "vue"
import { RouterLink, RouterView } from "vue-router"

import { useReservationStore } from "./stores/reservationStore"
import { useAuthStore } from "./stores/authStore"

const reservationStore = useReservationStore()
const auth = useAuthStore()

const dark = ref(false)

onMounted(() => {
  reservationStore.loadFromLocalStorage()
  auth.load()

  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "dark") {
    dark.value = true
    document.documentElement.classList.add("dark")
  }
})

function toggleTheme() {
  dark.value = !dark.value

  if (dark.value) {
    document.documentElement.classList.add("dark")
    localStorage.setItem("theme", "dark")
  } else {
    document.documentElement.classList.remove("dark")
    localStorage.setItem("theme", "light")
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white">
    <header class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
      <div class="mx-auto flex max-w-6xl items-center justify-between p-4">
        <div>
          <h1 class="text-xl font-semibold">AutoReserve</h1>
          <p class="text-sm text-gray-600 dark:text-gray-300">
            Reserve a vehicle, book a test drive.
          </p>
        </div>

        <nav class="flex items-center gap-4 text-sm">
          <RouterLink to="/" class="font-medium hover:underline">
            Vehicles
          </RouterLink>

          <RouterLink to="/reservations" class="font-medium hover:underline">
            Reservations ({{ reservationStore.count }})
          </RouterLink>

          <button
            type="button"
            class="rounded-lg border px-3 py-1 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
            @click="toggleTheme"
          >
            {{ dark ? "☀️" : "🌙" }}
          </button>

          <button
            v-if="auth.isAuthenticated"
            type="button"
            class="rounded-lg border px-3 py-1 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
            @click="auth.logout()"
          >
            Logout
          </button>

          <RouterLink
            v-else
            to="/login"
            class="rounded-lg bg-black px-3 py-1 text-white hover:opacity-90 dark:bg-white dark:text-black"
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