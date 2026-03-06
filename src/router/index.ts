import { createRouter, createWebHistory } from "vue-router"

import HomePage from "../pages/HomePage.vue"
import VehicleDetailPage from "../pages/VehicleDetailPage.vue"
import ReservationsPage from "../pages/ReservationsPage.vue"
import LoginPage from "../pages/LoginPage.vue"
import ReserveFormPage from "../pages/ReserveFormPage.vue"
import ReservationSuccessPage from "../pages/ReservationSuccessPage.vue"

import { useAuthStore } from "../stores/authStore"

export const router = createRouter({
  history: createWebHistory(),

  routes: [
    { path: "/", name: "home", component: HomePage },

    { path: "/vehicle/:id", name: "vehicle-detail", component: VehicleDetailPage },

    {
      path: "/reservations",
      name: "reservations",
      component: ReservationsPage,
      meta: { requiresAuth: true },
    },

    {
      path: "/reserve/:id",
      name: "reserve-form",
      component: ReserveFormPage,
      meta: { requiresAuth: true },
    },

    {
      path: "/reservation-success",
      name: "reservation-success",
      component: ReservationSuccessPage,
      meta: { requiresAuth: true },
    },

    { path: "/login", name: "login", component: LoginPage },
  ],
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: "login" }
  }

  if (to.name === "login" && auth.isAuthenticated) {
    return { name: "home" }
  }
})