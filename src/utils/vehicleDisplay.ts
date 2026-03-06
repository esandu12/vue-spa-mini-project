import type { Product } from "../types/product"
import { getVehicleBrand, getVehicleType } from "./vehicle"

const VEHICLE_MODELS = [
  "Falcon X",
  "Urban Cruiser",
  "RoadMaster",
  "Velocity Pro",
  "Highland Touring",
  "Ranger Elite",
  "Titan Sport",
  "Executive LX",
  "Apex Drive",
  "Summit GT",
]

const VEHICLE_IMAGES = [
  "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80",
]

export function getVehicleDisplayName(product: Product): string {
  const brand = getVehicleBrand(product)
  const model = VEHICLE_MODELS[product.id % VEHICLE_MODELS.length]
  const type = getVehicleType(product)
  return `${brand} ${model} ${type}`
}

export function getVehicleDisplayImage(product: Product): string {
  return VEHICLE_IMAGES[product.id % VEHICLE_IMAGES.length]
}

export function getVehicleGallery(product: Product): string[] {
  const start = product.id % VEHICLE_IMAGES.length
  return [
    VEHICLE_IMAGES[start % VEHICLE_IMAGES.length],
    VEHICLE_IMAGES[(start + 1) % VEHICLE_IMAGES.length],
    VEHICLE_IMAGES[(start + 2) % VEHICLE_IMAGES.length],
    VEHICLE_IMAGES[(start + 3) % VEHICLE_IMAGES.length],
  ]
}