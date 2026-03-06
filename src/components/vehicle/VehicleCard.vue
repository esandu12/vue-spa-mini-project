<script setup lang="ts">
import { RouterLink } from "vue-router"
import type { Product } from "../../types/product"
import { getVehicleBrand } from "../../utils/vehicle"
import {
  getVehicleDisplayImage,
  getVehicleDisplayName,
} from "../../utils/vehicleDisplay"

defineProps<{
  vehicle: Product
}>()
</script>

<template>
  <article class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 dark:bg-gray-900">
    <img
      :src="getVehicleDisplayImage(vehicle)"
      :alt="getVehicleDisplayName(vehicle)"
      class="h-52 w-full object-cover"
      loading="lazy"
    />

    <div class="p-4">
      <h3 class="line-clamp-1 text-lg font-semibold">
        {{ getVehicleDisplayName(vehicle) }}
      </h3>

      <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">
        {{ getVehicleBrand(vehicle) }} • ⭐ {{ vehicle.rating }}
      </p>

      <div class="mt-4 flex items-center justify-between">
        <span class="text-xl font-bold">$ {{ vehicle.price }}</span>

        <RouterLink
          :to="`/vehicle/${vehicle.id}`"
          class="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90 dark:bg-white dark:text-black"
        >
          Explore More
        </RouterLink>
      </div>
    </div>
  </article>
</template>