<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import { login } from "../services/auth.api"
import { useAuthStore } from "../stores/authStore"

const router = useRouter()
const auth = useAuthStore()

const username = ref("emilys") // DummyJSON example users
const password = ref("emilyspass")

const loading = ref(false)
const error = ref<string | null>(null)

async function handleLogin() {
  loading.value = true
  error.value = null
  try {
    const user = await login(username.value, password.value)
    auth.setUser(user)
    router.push("/")
  } catch (e) {
    error.value = e instanceof Error ? e.message : "Login failed"
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="mx-auto max-w-md rounded-2xl border bg-white p-6 space-y-4">
    <h2 class="text-xl font-bold">Login</h2>
    <p class="text-sm text-gray-600">Required to reserve a test drive.</p>

    <div v-if="error" class="rounded-xl border border-red-200 bg-red-50 p-3 text-red-700">
      {{ error }}
    </div>

    <div class="space-y-2">
      <label class="text-sm font-medium">Username</label>
      <input v-model="username" class="w-full rounded-xl border px-3 py-2" type="text" />
    </div>

    <div class="space-y-2">
      <label class="text-sm font-medium">Password</label>
      <input v-model="password" class="w-full rounded-xl border px-3 py-2" type="password" />
    </div>

    <button
      class="w-full rounded-xl bg-black px-4 py-2 text-white hover:opacity-90 disabled:opacity-60"
      type="button"
      :disabled="loading"
      @click="handleLogin"
    >
      {{ loading ? "Logging in..." : "Login" }}
    </button>
  </div>
</template>