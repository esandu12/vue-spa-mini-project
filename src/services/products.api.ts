import type { Product, ProductsResponse } from "../types/product"
import { getJSON } from "./http"

export function fetchProducts(): Promise<ProductsResponse> {
  return getJSON<ProductsResponse>("/products")
}

export function fetchProductById(id: number): Promise<Product> {
  return getJSON<Product>(`/products/${id}`)
}

export function fetchCategories(): Promise<string[]> {
  return getJSON<string[]>("/products/categories")
}