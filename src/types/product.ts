export interface Product {
  id: number;
  sku: string;
  name: string;
  quantity: number;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductData {
  sku: string;
  name: string;
  quantity: number;
  price: number;
}

export interface UpdateProductData extends CreateProductData {
  id: number;
}