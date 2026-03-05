<script setup lang="ts">
import { computed, ref } from "vue"
import { useRoute, useRouter, RouterLink } from "vue-router"
import { useReservationStore } from "../stores/reservationStore"
import { useAuthStore } from "../stores/authStore"

const route = useRoute()
const router = useRouter()
const store = useReservationStore()
const auth = useAuthStore()

auth.load()

const vehicleId = computed(() => Number(route.params.id))

const vehicle = computed(() => store.getVehicleById(vehicleId.value))

// If user refreshes, vehicle may not be inside store -> redirect to detail
if (!vehicle.value) {
  router.push(`/vehicle/${vehicleId.value}`)
}

const fullName = ref("")
const phone = ref("")
const email = ref("")
const preferredDate = ref("")
const preferredTime = ref("")
const message = ref("")

const error = ref<string | null>(null)

function submit() {
  error.value = null

  if (!auth.isAuthenticated) {
    router.push("/login")
    return
  }

  if (!fullName.value.trim() || !phone.value.trim() || !email.value.trim()) {
    error.value = "Please fill Name, Phone, and Email."
    return
  }

  if (!vehicle.value) return

  store.confirmReservation(vehicle.value.id, {
    fullName: fullName.value,
    phone: phone.value,
    email: email.value,
    preferredDate: preferredDate.value,
    preferredTime: preferredTime.value,
    message: message.value,
  })

  router.push("/reservation-success")
}
</script>

<template>
  <div class="mx-auto max-w-4xl space-y-6">
    <div class="flex items-center justify-between">
      <RouterLink
        :to="`/vehicle/${vehicleId}`"
        class="text-sm text-blue-600 hover:underline"
      >
        ← Back
      </RouterLink>

      <h2 class="text-xl font-bold">Reserve Test Drive</h2>
    </div>

    <div v-if="vehicle" class="rounded-2xl border bg-white p-4">
      <div class="flex items-center gap-4">
        <img
          :src="vehicle.thumbnail"
          :alt="vehicle.title"
          class="h-20 w-20 rounded-xl object-cover"
        />
        <div class="flex-1">
          <p class="font-semibold">{{ vehicle.title }}</p>
          <p class="text-sm text-gray-600 line-clamp-2">{{ vehicle.description }}</p>
        </div>
        <p class="text-lg font-bold">$ {{ vehicle.price }}</p>
      </div>
    </div>

    <div class="rounded-2xl border bg-white p-6">
      <h3 class="text-lg font-bold">Let’s Talk Business</h3>
      <p class="text-sm text-gray-600">
        Fill this form. Our team will call you to confirm the test drive.
      </p>

      <div v-if="error" class="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-red-700">
        {{ error }}
      </div>

      <div class="mt-6 grid gap-4 md:grid-cols-2">
        <div>
          <label class="text-sm font-medium">Full Name *</label>
          <input v-model="fullName" class="mt-1 w-full rounded-xl border px-3 py-2" />
        </div>

        <div>
          <label class="text-sm font-medium">Phone *</label>
          <input v-model="phone" class="mt-1 w-full rounded-xl border px-3 py-2" />
        </div>

        <div>
          <label class="text-sm font-medium">Email *</label>
          <input v-model="email" class="mt-1 w-full rounded-xl border px-3 py-2" />
        </div>

        <div>
          <label class="text-sm font-medium">Preferred Date</label>
          <input v-model="preferredDate" type="date" class="mt-1 w-full rounded-xl border px-3 py-2" />
        </div>

        <div>
          <label class="text-sm font-medium">Preferred Time</label>
          <input v-model="preferredTime" type="time" class="mt-1 w-full rounded-xl border px-3 py-2" />
        </div>

        <div class="md:col-span-2">
          <label class="text-sm font-medium">Message</label>
          <textarea v-model="message" rows="4" class="mt-1 w-full rounded-xl border px-3 py-2"></textarea>
        </div>
      </div>

      <button
        class="mt-6 w-full rounded-xl bg-black px-4 py-3 text-white hover:opacity-90"
        type="button"
        @click="submit"
      >
        Submit Reservation
      </button>
    </div>
  </div>
</template>