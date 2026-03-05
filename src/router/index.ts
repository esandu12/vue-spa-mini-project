import { createRouter, createWebHistory } from "vue-router"
import HomePage from "../pages/HomePage.vue"
import VehicleDetailPage from "../pages/VehicleDetailPage.vue"
import ReservationsPage from "../pages/ReservationsPage.vue"
import LoginPage from "../pages/LoginPage.vue"
import ReserveFormPage from "../pages/ReserveFormPage.vue"
import ReservationSuccessPage from "../pages/ReservationSuccessPage.vue"

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: HomePage },
    { path: "/vehicle/:id", name: "vehicle-detail", component: VehicleDetailPage },
    { path: "/reservations", name: "reservations", component: ReservationsPage },
    { path: "/login", name: "login", component: LoginPage },
    { path: "/reserve/:id", name: "reserve-form", component: ReserveFormPage },
    { path: "/reservation-success", name: "reservation-success", component: ReservationSuccessPage },
  ],
})