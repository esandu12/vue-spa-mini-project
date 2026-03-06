<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue"
import { RouterLink, useRoute, useRouter } from "vue-router"

import type { Product } from "../types/product"
import { fetchProductById } from "../services/products.api"
import { useReservationStore } from "../stores/reservationStore"
import { useAuthStore } from "../stores/authStore"
import {
  getVehicleBrand,
  getVehicleCondition,
  getVehicleType,
} from "../utils/vehicle"
import {
  getVehicleDisplayImage,
  getVehicleDisplayName,
  getVehicleGallery,
} from "../utils/vehicleDisplay"

const route = useRoute()
const router = useRouter()

const reservationStore = useReservationStore()
const auth = useAuthStore()

const id = computed(() => Number(route.params.id))

const vehicle = ref<Product | null>(null)
const selectedImage = ref<string>("")
const loading = ref(true)
const error = ref<string | null>(null)

const alreadyReserved = computed(() =>
  vehicle.value ? reservationStore.has(vehicle.value.id) : false
)

async function load() {
  loading.value = true
  error.value = null

  try {
    vehicle.value = await fetchProductById(id.value)
  } catch (e) {
    error.value = e instanceof Error ? e.message : "Failed to load vehicle"
  } finally {
    loading.value = false
  }
}

function handleReserve() {
  if (!auth.isAuthenticated) {
    router.push("/login")
    return
  }

  if (!vehicle.value || alreadyReserved.value) return

  reservationStore.add(vehicle.value)
  router.push(`/reserve/${vehicle.value.id}`)
}

watch(vehicle, (newVehicle) => {
  if (newVehicle) {
    selectedImage.value = getVehicleDisplayImage(newVehicle)
  }
})

onMounted(() => {
  auth.load()
  void load()
})
</script>

<template>
  <div class="space-y-4">
    <RouterLink to="/" class="text-sm text-blue-600 hover:underline dark:text-blue-400">
      ← Back to vehicles
    </RouterLink>

    <div v-if="loading" class="animate-pulse space-y-3">
      <div class="h-8 rounded bg-gray-300 dark:bg-gray-700"></div>
      <div class="h-64 rounded bg-gray-300 dark:bg-gray-700"></div>
      <div class="h-6 rounded bg-gray-300 dark:bg-gray-700"></div>
    </div>

    <div
      v-else-if="error"
      class="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700"
    >
      {{ error }}
    </div>

    <div v-else-if="vehicle" class="grid gap-6 lg:grid-cols-2">
      <div class="space-y-3">
        <img
          :src="selectedImage"
          :alt="getVehicleDisplayName(vehicle)"
          class="h-[420px] w-full rounded-2xl object-cover"
        />

        <div class="flex gap-2 overflow-x-auto">
          <img
            v-for="img in getVehicleGallery(vehicle)"
            :key="img"
            :src="img"
            :alt="getVehicleDisplayName(vehicle)"
            class="h-20 w-24 cursor-pointer rounded-lg border object-cover hover:border-black dark:hover:border-white"
            @click="selectedImage = img"
          />
        </div>
      </div>

      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <span class="text-sm font-semibold text-gray-500 dark:text-gray-300">
            {{ getVehicleBrand(vehicle) }} • {{ getVehicleType(vehicle) }}
          </span>

          <span
            class="rounded-full px-3 py-1 text-xs font-semibold"
            :class="
              getVehicleCondition(vehicle) === 'Used'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-green-100 text-green-800'
            "
          >
            {{ getVehicleCondition(vehicle) }}
          </span>
        </div>

        <h2 class="text-3xl font-bold">{{ getVehicleDisplayName(vehicle) }}</h2>

        <p class="text-gray-700 dark:text-gray-300">
          Premium vehicle available for reservation and test drive booking.
        </p>

        <div class="grid grid-cols-2 gap-3 rounded-2xl border border-gray-200 p-4 dark:border-gray-700">
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Price</p>
            <p class="text-xl font-bold">$ {{ vehicle.price }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Rating</p>
            <p class="text-xl font-bold">⭐ {{ vehicle.rating }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Stock</p>
            <p class="text-xl font-bold">{{ vehicle.stock }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Condition</p>
            <p class="text-xl font-bold">{{ getVehicleCondition(vehicle) }}</p>
          </div>
        </div>

        <button
          type="button"
          class="w-full rounded-xl bg-black px-4 py-3 text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black"
          :disabled="alreadyReserved"
          @click="handleReserve"
        >
          {{ alreadyReserved ? "Already Reserved" : "Reserve Test Drive" }}
        </button>

        <p class="text-xs text-gray-500 dark:text-gray-400">
          After reserving, our team will contact you to confirm your preferred test drive time.
        </p>
      </div>
    </div>
  </div>
</template>