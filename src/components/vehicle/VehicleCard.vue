<script setup lang="ts">
import type { Product } from "../../types/product"
import { getVehicleBrand, getVehicleCondition, getVehicleType } from "../../utils/vehicle"

defineProps<{
  vehicle: Product
}>()
</script>

<template>
  <article
    class="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md"
  >
    <img
      :src="vehicle.thumbnail"
      :alt="vehicle.title"
      class="h-44 w-full object-cover"
      loading="lazy"
    />

    <div class="space-y-2 p-4">
      <div class="flex items-center justify-between">
        <span class="text-xs font-semibold text-gray-500">
          {{ getVehicleBrand(vehicle) }}
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

      <h3 class="line-clamp-1 text-base font-semibold">
        {{ vehicle.title }}
      </h3>

      <p class="text-sm text-gray-600">
        Type: <span class="font-medium">{{ getVehicleType(vehicle) }}</span>
      </p>

      <div class="flex items-center justify-between">
        <p class="text-lg font-bold">$ {{ vehicle.price }}</p>
        <p class="text-sm text-gray-600">⭐ {{ vehicle.rating }}</p>
      </div>

      <button
        class="w-full rounded-xl bg-black px-4 py-2 text-white hover:opacity-90"
        type="button"
      >
        Reserve Test Drive
      </button>
    </div>
  </article>
</template>