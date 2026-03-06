<script setup lang="ts">
import { RouterLink } from "vue-router"
</script>

<template>
  <div class="mx-auto max-w-2xl rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm dark:border-gray-700 dark:bg-gray-900">
    <h2 class="text-3xl font-bold">Reservation Submitted Successfully</h2>
    <p class="mt-4 text-gray-600 dark:text-gray-300">
      Thank you. Our team will contact you soon to confirm your test drive and continue the business process.
    </p>

    <div class="mt-8 flex justify-center gap-4">
      <RouterLink
        to="/"
        class="rounded-xl border px-5 py-2 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
      >
        Back to Vehicles
      </RouterLink>

      <RouterLink
        to="/reservations"
        class="rounded-xl bg-black px-5 py-2 text-white hover:opacity-90 dark:bg-white dark:text-black"
      >
        View Reservations
      </RouterLink>
    </div>
  </div>
</template>