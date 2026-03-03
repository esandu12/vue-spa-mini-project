<script setup lang="ts">
import type { Product } from "../../types/product"

defineProps<{
  vehicle: Product
}>()
</script>

<template>
  <article class="overflow-hidden rounded-2xl border bg-white shadow-sm">
    <img
      :src="vehicle.thumbnail"
      :alt="vehicle.title"
      class="h-44 w-full object-cover"
      loading="lazy"
    />

    <div class="p-4">
      <h3 class="line-clamp-1 text-base font-semibold">{{ vehicle.title }}</h3>

      <p class="mt-1 text-sm text-gray-600">
        {{ vehicle.brand }} • ⭐ {{ vehicle.rating }}
      </p>

      <div class="mt-3 flex items-center justify-between">
        <span class="text-lg font-bold">${{ vehicle.price }}</span>

        <button
          class="rounded-xl bg-black px-3 py-2 text-sm font-medium text-white hover:opacity-90"
          type="button"
        >
          Explore More
        </button>
      </div>
    </div>
  </article>
</template>