<script setup lang="ts">
import { VEHICLE_BRANDS } from "../../constants/brands"

defineProps<{
  search: string
  brand: string
  condition: string
  sort: string
}>()

const emit = defineEmits<{
  (e: "update:search", value: string): void
  (e: "update:brand", value: string): void
  (e: "update:condition", value: string): void
  (e: "update:sort", value: string): void
}>()
</script>

<template>
  <div class="mb-6 grid gap-4 md:grid-cols-4">
    <input
      type="text"
      :value="search"
      @input="emit('update:search', ($event.target as HTMLInputElement).value)"
      placeholder="Search vehicles..."
      class="rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400 dark:focus:ring-white"
    />

    <select
      :value="brand"
      @change="emit('update:brand', ($event.target as HTMLSelectElement).value)"
      class="rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-white"
    >
      <option value="all">All Brands</option>
      <option v-for="b in VEHICLE_BRANDS" :key="b" :value="b">
        {{ b }}
      </option>
    </select>

    <select
      :value="condition"
      @change="emit('update:condition', ($event.target as HTMLSelectElement).value)"
      class="rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-white"
    >
      <option value="all">All Conditions</option>
      <option value="Brand New">Brand New</option>
      <option value="Used">Used</option>
    </select>

    <select
      :value="sort"
      @change="emit('update:sort', ($event.target as HTMLSelectElement).value)"
      class="rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-white"
    >
      <option value="none">Sort By</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
    </select>
  </div>
</template>