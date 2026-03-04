import { httpGet } from "./http"
import type { Product, ProductsResponse } from "../types/product"

export async function fetchProducts(limit = 30, skip = 0): Promise<ProductsResponse> {
  return httpGet<ProductsResponse>(`/products?limit=${limit}&skip=${skip}`)
}

export async function fetchProductById(id: number): Promise<Product> {
  return httpGet<Product>(`/products/${id}`)
}