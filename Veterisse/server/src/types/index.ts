export type ProductType = {
  id: string;
  code: string;
  name: string;
  img: string;
  description: string;
  category: string;
  stock: number;
  minStock: number;
  price: number;
  costPrice: number;
  supplier: string;
  active: boolean;
}


export type MovementsType = {
  id: string,
  type: string,
  description: string,
  date: string,
  quantity: number,
  products: string[],
  reference: string,
}