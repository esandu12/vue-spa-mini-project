<script setup lang="ts">
import { RouterLink } from "vue-router"
</script>

<template>
  <div class="mx-auto max-w-xl rounded-2xl border bg-white p-8 text-center space-y-3">
    <h2 class="text-2xl font-bold">✅ Reservation Submitted!</h2>
    <p class="text-gray-600">
      Thank you. Our team will call you soon to confirm your test drive time.
    </p>

    <div class="pt-4 flex justify-center gap-3">
      <RouterLink to="/" class="rounded-xl border px-4 py-2 hover:bg-gray-50">
        Back to Vehicles
      </RouterLink>

      <RouterLink to="/reservations" class="rounded-xl bg-black px-4 py-2 text-white hover:opacity-90">
        View Reservations
      </RouterLink>
    </div>
  </div>
</template>