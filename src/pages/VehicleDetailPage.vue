<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { useRoute, useRouter, RouterLink } from "vue-router"
import type { Product } from "../types/product"
import { fetchProductById } from "../services/products.api"
import { useReservationStore } from "../stores/reservationStore"

const route = useRoute()
const router = useRouter()
const store = useReservationStore()

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

function reserve() {
  if (!vehicle.value) return
  store.add(vehicle.value)
  void router.push("/reservations")
}

onMounted(() => void load())
</script>

<template>
  <RouterLink to="/" class="text-sm text-blue-600 hover:underline">← Back</RouterLink>

  <p v-if="loading">Loading...</p>
  <p v-else-if="error" class="text-red-600">{{ error }}</p>

  <div v-else-if="vehicle">
    <!-- details... -->

    <button
      type="button"
      class="w-full rounded-xl bg-black px-4 py-3 text-white hover:opacity-90"
      @click="reserve"
    >
      Explore More / Reserve Test Drive
    </button>
  </div>
</template>