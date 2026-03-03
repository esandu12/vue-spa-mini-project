<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import type { Product } from "../types/product"
import { fetchProducts } from "../services/products.api"

import VehicleGrid from "../components/vehicle/VehicleGrid.vue"
import FilterBar from "../components/vehicle/FilterBar.vue"
import { getVehicleBrand, getVehicleCondition } from "../utils/vehicle"

const vehicles = ref<Product[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

// Day 3 filter states
const search = ref("")
const selectedBrand = ref("all")
const selectedCondition = ref("all")
const sortOption = ref("none")

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

const filteredVehicles = computed(() => {
  let result = [...vehicles.value]

  // Search
  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter((v) => v.title.toLowerCase().includes(q))
  }

  // Brand
  if (selectedBrand.value !== "all") {
    result = result.filter((v) => getVehicleBrand(v) === selectedBrand.value)
  }

  // Condition
  if (selectedCondition.value !== "all") {
    result = result.filter(
      (v) => getVehicleCondition(v) === selectedCondition.value
    )
  }

  // Sorting
  if (sortOption.value === "price-asc") {
    result.sort((a, b) => a.price - b.price)
  } else if (sortOption.value === "price-desc") {
    result.sort((a, b) => b.price - a.price)
  }

  return result
})
</script>

<template>
  <div class="mx-auto max-w-6xl p-4">
    <header class="mb-4">
      <h1 class="text-2xl font-bold">AutoReserve</h1>
      <p class="text-sm text-gray-600">Day 3 ✅ Search + Filters + Sorting</p>
    </header>

    <p v-if="loading" class="text-gray-600">Loading vehicles...</p>

    <div
      v-else-if="error"
      class="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700"
    >
      Error: {{ error }}
      <button
        class="ml-3 rounded-lg bg-black px-3 py-1 text-white hover:opacity-90"
        @click="load"
      >
        Retry
      </button>
    </div>

    <div v-else>
      <FilterBar
        v-model:search="search"
        v-model:brand="selectedBrand"
        v-model:condition="selectedCondition"
        v-model:sort="sortOption"
      />

      <div class="mb-3 text-sm text-gray-600">
        Showing <span class="font-semibold">{{ filteredVehicles.length }}</span>
        vehicles
      </div>

      <VehicleGrid :vehicles="filteredVehicles" />

      <div
        v-if="filteredVehicles.length === 0"
        class="mt-6 rounded-xl border p-6 text-gray-600"
      >
        No vehicles match your filters.
      </div>
    </div>
  </div>
</template>