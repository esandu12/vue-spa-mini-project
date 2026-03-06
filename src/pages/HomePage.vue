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

  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter((v) => v.title.toLowerCase().includes(q))
  }

  if (selectedBrand.value !== "all") {
    result = result.filter((v) => getVehicleBrand(v) === selectedBrand.value)
  }

  if (selectedCondition.value !== "all") {
    result = result.filter(
      (v) => getVehicleCondition(v) === selectedCondition.value
    )
  }

  if (sortOption.value === "price-asc") {
    result.sort((a, b) => a.price - b.price)
  } else if (sortOption.value === "price-desc") {
    result.sort((a, b) => b.price - a.price)
  }

  return result
})
</script>

<template>
  <div class="mx-auto max-w-7xl space-y-8">
    <section class="rounded-3xl bg-gradient-to-r from-slate-900 to-slate-700 p-8 text-white shadow-lg">
      <div class="max-w-3xl space-y-4">
        <p class="text-sm uppercase tracking-[0.2em] text-gray-300">
          Premium vehicle reservations
        </p>
        <h1 class="text-4xl font-bold md:text-5xl">
          Find your next vehicle and book a test drive
        </h1>
        <p class="max-w-2xl text-gray-200">
          Browse available models, compare options, and reserve your preferred vehicle with a simple booking flow.
        </p>
      </div>
    </section>

    <section class="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div class="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 class="text-2xl font-bold">Available Vehicles</h2>
          <p class="text-sm text-gray-600 dark:text-gray-300">
            Search, filter, and reserve your preferred model.
          </p>
        </div>

        <div class="text-sm text-gray-600 dark:text-gray-300">
          Showing <span class="font-semibold">{{ filteredVehicles.length }}</span> vehicles
        </div>
      </div>

      <FilterBar
        v-model:search="search"
        v-model:brand="selectedBrand"
        v-model:condition="selectedCondition"
        v-model:sort="sortOption"
      />

      <div v-if="loading" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div
          v-for="n in 8"
          :key="n"
          class="animate-pulse rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
        >
          <div class="h-40 rounded-xl bg-gray-300 dark:bg-gray-700"></div>
          <div class="mt-4 h-5 rounded bg-gray-300 dark:bg-gray-700"></div>
          <div class="mt-2 h-4 rounded bg-gray-300 dark:bg-gray-700"></div>
          <div class="mt-4 h-10 rounded bg-gray-300 dark:bg-gray-700"></div>
        </div>
      </div>

      <div
        v-else-if="error"
        class="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700"
      >
        {{ error }}
      </div>

      <div
        v-else-if="filteredVehicles.length === 0"
        class="rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-600 dark:border-gray-600 dark:text-gray-300"
      >
        No vehicles match your search or filters.
      </div>

      <VehicleGrid v-else :vehicles="filteredVehicles" />
    </section>
  </div>
</template>