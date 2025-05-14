export type ProductosType = {
  id: string,
  name: string,
  price: number,
  stock: number,
  img: string,
  category: string,
  provider?: string,
}


export interface ProductosProps {
  products: ProductosType[]
}