import axios from 'axios';
import { Product, CreateProductData, UpdateProductData } from '../types/product';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productAPI = {
  // Obtener todos los productos
  getAll: async (): Promise<Product[]> => {
    const response = await api.get('/products');
    return response.data;
  },

  // Crear un producto
  create: async (data: CreateProductData): Promise<string> => {
    const response = await api.post('/products', data);
    return response.data;
  },

  // Actualizar un producto
  update: async (id: number, data: CreateProductData): Promise<string> => {
    const response = await api.put(`/products/${id}`, data);
    return response.data;
  },

  // Eliminar un producto
  delete: async (id: number): Promise<void> => {
    await api.delete(`/products/${id}`);
  },
};