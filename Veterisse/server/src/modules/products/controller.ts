import * as productService from './service';
import type { ProductType } from '@/types';

export const getProducts = async () => productService.getAllProducts();

export const getProductsById = async (id: string) => productService.getProductById(id);

export const addProduct = async (product: ProductType): Promise<ProductType> => productService.createProduct(product);

export const updateProduct = async (product: ProductType) => productService.updateProductService(product);

export const deleteProduct = async (id: string) => productService.deleteProductService(id);


export const getIdProduct = () => {
  const products = productService.getAllProducts();
  return String(products.length + 1);
}

export const getCodeProduct = () => {
  const products = productService.getAllProducts();
  const code = String(products.length + 1).padStart(6, '0');
  return `PROD-${code}`;
}