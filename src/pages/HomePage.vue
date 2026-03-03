<script setup lang="ts">
import { onMounted, ref } from "vue"
import type { Product } from "../types/product"
import { fetchProducts } from "../services/products.api"
import VehicleGrid from "../components/vehicle/VehicleGrid.vue"

const vehicles = ref<Product[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

async function load() {
  loading.value = true
  error.value = null
  try {
    const data = await fetchProducts()
    vehicles.value = data.products
  } catch (e) {
    error.value = e instanceof Error ? e.message : "Failed to load vehicles"
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  void load()
})
</script>

<template>
  <section class="space-y-4">
    <div>
      <h2 class="text-2xl font-bold">Vehicles</h2>
      <p class="text-gray-600">Browse and reserve a test drive.</p>
    </div>

    <div v-if="loading" class="text-gray-600">Loading vehicles...</div>

    <div v-else-if="error" class="space-y-2">
      <p class="text-red-600">Error: {{ error }}</p>
      <button
        class="rounded-lg bg-black px-4 py-2 text-white hover:opacity-90"
        @click="load"
      >
        Retry
      </button>
    </div>

    <VehicleGrid v-else :vehicles="vehicles" />
  </section>
</template>