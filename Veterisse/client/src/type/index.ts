export type ProductsType = {
  id: string;
  code: string;
  name: string;
  description: string;
  category: string;
  stock: number;
  minStock: number;
  price: number;
  costPrice: number;
  supplier: string;
}


export interface ProductsProps {
  products: ProductsType[]
}


export type MovementsType = {
  id: number,
  type: string,
  description: string,
  date: string,
  quantity: number,
  products: string[],
  reference: string,
}

export interface MovementsProps {
  movements: MovementsType[]
}

export type CategoriesType = {
  id: number,
  category: string,
  quantity: number,
}
export interface CategoryProps {
  categories: CategoriesType[] 
}