<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { useRoute, RouterLink } from "vue-router"
import type { Product } from "../types/product"
import { fetchProductById } from "../services/products.api"
import { getVehicleBrand, getVehicleCondition, getVehicleType } from "../utils/vehicle"

const route = useRoute()
const id = computed(() => Number(route.params.id))

const vehicle = ref<Product | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

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

onMounted(() => {
  void load()
})
</script>

<template>
  <div class="space-y-4">
    <RouterLink to="/" class="text-sm text-blue-600 hover:underline">
      ← Back to vehicles
    </RouterLink>

    <p v-if="loading" class="text-gray-600">Loading vehicle details...</p>

    <div
      v-else-if="error"
      class="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700"
    >
      {{ error }}
    </div>

    <div v-else-if="vehicle" class="grid gap-6 lg:grid-cols-2">
      <img
        :src="vehicle.thumbnail"
        :alt="vehicle.title"
        class="w-full rounded-2xl object-cover"
      />

      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-sm font-semibold text-gray-500">
            {{ getVehicleBrand(vehicle) }} • {{ getVehicleType(vehicle) }}
          </span>

          <span
            class="rounded-full px-2 py-1 text-xs font-semibold"
            :class="
              getVehicleCondition(vehicle) === 'Used'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-green-100 text-green-800'
            "
          >
            {{ getVehicleCondition(vehicle) }}
          </span>
        </div>

        <h2 class="text-2xl font-bold">{{ vehicle.title }}</h2>
        <p class="text-gray-700">{{ vehicle.description }}</p>

        <div class="flex items-center justify-between">
          <p class="text-2xl font-bold">$ {{ vehicle.price }}</p>
          <p class="text-gray-600">⭐ {{ vehicle.rating }} • Stock {{ vehicle.stock }}</p>
        </div>

        <button
          class="w-full rounded-xl bg-black px-4 py-3 text-white hover:opacity-90"
          type="button"
        >
          Explore More / Reserve Test Drive
        </button>

        <p class="text-xs text-gray-500">
          After reserving, our team will contact you to confirm a test drive time.
        </p>
      </div>
    </div>
  </div>
</template>