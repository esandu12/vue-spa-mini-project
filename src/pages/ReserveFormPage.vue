<script setup lang="ts">
import { computed, ref } from "vue"
import { RouterLink, useRoute, useRouter } from "vue-router"
import { useReservationStore } from "../stores/reservationStore"
import {
  getVehicleDisplayImage,
  getVehicleDisplayName,
} from "../utils/vehicleDisplay"

const route = useRoute()
const router = useRouter()
const store = useReservationStore()

store.loadFromLocalStorage()

const vehicleId = computed(() => Number(route.params.id))

const reservation = computed(() =>
  store.reservations.find((r) => r.vehicle.id === vehicleId.value)
)

const fullName = ref("")
const phone = ref("")
const email = ref("")
const subject = ref("Test Drive Reservation")
const preferredDate = ref("")
const preferredTime = ref("")
const message = ref("")

const error = ref<string | null>(null)

function submitForm() {
  error.value = null

  if (!fullName.value.trim() || !phone.value.trim() || !email.value.trim()) {
    error.value = "Please fill Full Name, Contact Number, and Email."
    return
  }

  if (!reservation.value) {
    error.value = "Vehicle reservation not found."
    return
  }

  store.confirmReservation(vehicleId.value, {
    fullName: fullName.value,
    phone: phone.value,
    email: email.value,
    preferredDate: preferredDate.value,
    preferredTime: preferredTime.value,
    message: `${subject.value}${message.value ? " - " + message.value : ""}`,
  })

  router.push("/reservation-success")
}
</script>

<template>
  <div class="mx-auto max-w-5xl space-y-6">
    <RouterLink
      :to="`/vehicle/${vehicleId}`"
      class="text-sm text-blue-600 hover:underline dark:text-blue-400"
    >
      ← Back to vehicle
    </RouterLink>

    <div
      v-if="reservation"
      class="grid gap-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:grid-cols-[220px_1fr] dark:border-gray-700 dark:bg-gray-900"
    >
      <img
        :src="getVehicleDisplayImage(reservation.vehicle)"
        :alt="getVehicleDisplayName(reservation.vehicle)"
        class="h-52 w-full rounded-2xl object-cover"
      />

      <div class="space-y-2">
        <p class="text-sm uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
          Reserved vehicle
        </p>
        <h2 class="text-3xl font-bold">
          {{ getVehicleDisplayName(reservation.vehicle) }}
        </h2>
        <p class="text-gray-600 dark:text-gray-300">
          Complete the form below and our team will contact you to confirm your test drive and continue the business discussion.
        </p>
        <p class="text-xl font-bold">$ {{ reservation.vehicle.price }}</p>
      </div>
    </div>

    <div class="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div class="mb-8 text-center">
        <h1 class="text-4xl font-bold tracking-tight">Let’s Talk Business</h1>
        <p class="mt-2 text-gray-600 dark:text-gray-300">
          Fill your details and we will contact you regarding the selected vehicle.
        </p>
      </div>

      <div
        v-if="error"
        class="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700"
      >
        {{ error }}
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        <div class="space-y-2">
          <label class="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
            Full Name
          </label>
          <input
            v-model="fullName"
            type="text"
            placeholder="Enter your full name"
            class="w-full border-0 border-b border-gray-300 bg-transparent px-0 py-3 text-lg text-gray-900 outline-none placeholder:text-gray-400 focus:border-black dark:border-gray-600 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-white"
          />
        </div>

        <div class="space-y-2">
          <label class="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
            Contact Number
          </label>
          <input
            v-model="phone"
            type="text"
            placeholder="Enter your contact number"
            class="w-full border-0 border-b border-gray-300 bg-transparent px-0 py-3 text-lg text-gray-900 outline-none placeholder:text-gray-400 focus:border-black dark:border-gray-600 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-white"
          />
        </div>

        <div class="space-y-2">
          <label class="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
            Email
          </label>
          <input
            v-model="email"
            type="email"
            placeholder="Enter your email address"
            class="w-full border-0 border-b border-gray-300 bg-transparent px-0 py-3 text-lg text-gray-900 outline-none placeholder:text-gray-400 focus:border-black dark:border-gray-600 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-white"
          />
        </div>

        <div class="space-y-2">
          <label class="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
            Subject
          </label>
          <input
            v-model="subject"
            type="text"
            placeholder="What is this regarding?"
            class="w-full border-0 border-b border-gray-300 bg-transparent px-0 py-3 text-lg text-gray-900 outline-none placeholder:text-gray-400 focus:border-black dark:border-gray-600 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-white"
          />
        </div>

        <div class="space-y-2">
          <label class="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
            Preferred Date
          </label>
          <input
            v-model="preferredDate"
            type="date"
            class="w-full border-0 border-b border-gray-300 bg-transparent px-0 py-3 text-lg text-gray-900 outline-none focus:border-black dark:border-gray-600 dark:text-white dark:focus:border-white"
          />
        </div>

        <div class="space-y-2">
          <label class="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
            Preferred Time
          </label>
          <input
            v-model="preferredTime"
            type="time"
            class="w-full border-0 border-b border-gray-300 bg-transparent px-0 py-3 text-lg text-gray-900 outline-none focus:border-black dark:border-gray-600 dark:text-white dark:focus:border-white"
          />
        </div>

        <div class="space-y-2 md:col-span-2">
          <label class="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
            Message
          </label>
          <textarea
            v-model="message"
            rows="4"
            placeholder="Write your message here..."
            class="w-full border-0 border-b border-gray-300 bg-transparent px-0 py-3 text-lg text-gray-900 outline-none placeholder:text-gray-400 focus:border-black dark:border-gray-600 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-white"
          ></textarea>
        </div>
      </div>

      <div class="mt-8 flex justify-center">
        <button
          type="button"
          class="rounded-xl bg-gray-700 px-8 py-3 text-white hover:bg-black dark:bg-white dark:text-black dark:hover:bg-gray-200"
          @click="submitForm"
        >
          Apply Now
        </button>
      </div>
    </div>
  </div>
</template>