import { HandleData } from '@/utils/handleJSON';
import type { ProductType } from '@/types';

const dataHandler = new HandleData('../store/products.json');

export const getAllProducts = () => dataHandler.readData();

export const getProductById = (id: string) => {
  const products = dataHandler.readData();
  return products.find((p: ProductType) => p.id === id) || null;
};

export const createProduct = (product: ProductType) => {
  dataHandler.addData(product);
  return product;
};

export const updateProductService = (product: ProductType) => {
  const products = dataHandler.readData();
  const idx = products.findIndex((p: ProductType) => p.id === product.id);
  if (idx === -1) return null;
  products[idx] = product;
  dataHandler.saveData(products);
  return product;
};

export const deleteProductService = (id: string) => {
  const products = dataHandler.readData();
  const idx = products.findIndex((p: ProductType) => p.id === id);
  if (idx === -1) return false;
  products.splice(idx, 1);
  dataHandler.saveData(products);
  return true;
};