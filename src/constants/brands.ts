export const VEHICLE_BRANDS = [
  "Toyota",
  "Honda",
  "BMW",
  "Audi",
  "Rolls Royce",
  "Bentley",
  "Mercedes-Benz",
] as const

export type VehicleBrand = (typeof VEHICLE_BRANDS)[number]