<script setup lang="ts">
import { onMounted, ref } from "vue"
import type { Product } from "../types/product"
import { fetchProducts } from "../services/products.api"
import VehicleGrid from "../components/vehicle/VehicleGrid.vue"

const vehicles = ref<Product[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const data = await fetchProducts()
    vehicles.value = data.products
  } catch (e) {
    error.value = e instanceof Error ? e.message : "Failed to load"
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="mx-auto max-w-6xl p-4">
    <header class="mb-4">
      <h1 class="text-2xl font-bold">AutoReserve</h1>
      <p class="text-sm text-gray-600">
        Day 2 ✅ Components + responsive grid
      </p>
    </header>

    <p v-if="loading" class="text-gray-600">Loading vehicles...</p>

    <div v-else-if="error" class="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
      {{ error }}
    </div>

    <div v-else-if="vehicles.length === 0" class="rounded-xl border p-6 text-gray-600">
      No vehicles found.
    </div>

    <VehicleGrid v-else :vehicles="vehicles" />
  </div>
</template>