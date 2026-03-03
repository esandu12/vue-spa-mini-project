<script setup lang="ts">
import type { Product } from "../../types/product"
import VehicleCard from "./VehicleCard.vue"

defineProps<{
  vehicles: Product[]
}>()
</script>

<template>
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
    <VehicleCard v-for="v in vehicles" :key="v.id" :vehicle="v" />
  </div>
</template>