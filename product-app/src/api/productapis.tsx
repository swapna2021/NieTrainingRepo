import axios from "axios";
import type Product from "../model/product";

const API_BASE_URL = 'http://localhost:8080';
export default function   fetchProducts() {
    return axios.get(`${API_BASE_URL}/products`);
}
export function addProduct(product: Product) {
    return axios.post(`${API_BASE_URL}/products`, product);
}
export function updateProduct(product: Product) {
    return axios.put(`${API_BASE_URL}/products/${product.id}`, product);
}
export function deleteProduct(productId: number) {
    return axios.delete(`${API_BASE_URL}/products/${productId}`);
}
export function fetchProductById(productId: number|string) {
    return axios.get(`${API_BASE_URL}/products/${productId}`);
}
