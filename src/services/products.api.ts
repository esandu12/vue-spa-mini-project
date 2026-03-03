import type { Product, ProductsResponse } from "../types/product"
import { getJson } from "./http"

const BASE_URL = "https://dummyjson.com"

export function fetchProducts() {
  return getJson<ProductsResponse>(`${BASE_URL}/products?limit=30`)
}

export function fetchProductById(id: number) {
  return getJson<Product>(`${BASE_URL}/products/${id}`)
}