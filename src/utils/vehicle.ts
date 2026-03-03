import type { Product } from "../types/product"
import { VEHICLE_BRANDS, type VehicleBrand } from "../constants/brands"

export type VehicleCondition = "Brand New" | "Used"

/**
 * Deterministic brand mapping:
 * Same product always gets same vehicle brand.
 */
export function getVehicleBrand(p: Product): VehicleBrand {
  const idx = p.id % VEHICLE_BRANDS.length
  return VEHICLE_BRANDS[idx] as VehicleBrand
}

/**
 * Deterministic condition:
 * You can change the rule later, but keep it stable.
 */
export function getVehicleCondition(p: Product): VehicleCondition {
  // Example rule: low stock => used (just for demo domain mapping)
  return p.stock < 50 ? "Used" : "Brand New"
}

/**
 * Optional: map API category names into vehicle types.
 * Keeps UI more “vehicle store”.
 */
export function getVehicleType(p: Product): string {
  const c = p.category.toLowerCase()
  if (c.includes("motor")) return "Motorbike"
  if (c.includes("laptop") || c.includes("smartphone")) return "Sedan"
  if (c.includes("fragrance") || c.includes("skincare")) return "SUV"
  return "Hatchback"
}