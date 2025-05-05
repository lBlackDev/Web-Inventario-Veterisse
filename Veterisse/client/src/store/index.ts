import { create } from 'Zustand';
import type { ProductosType } from '@/type';

interface useStoreTableProductosProps {
  allProductos: ProductosType[],
  productos: ProductosType[],
  totalProductos: number,
  stockBajo: number,
  stockAgotado: number,
  valorTotal: number,

  setTotalProductos: (num: number) => void,
  setStockBajo: (num: number) => void,
  setStockAgotado: (num: number) => void,
  setValorTotal: (num: number) => void,
  setProductos: (productos: ProductosType[]) => void,
  setAllProductos: (productos: ProductosType[]) => void
}

const useStoreTableProductos = create<useStoreTableProductosProps>((set) => ({
  allProductos: [],
  productos: [],
  totalProductos: 0,
  stockBajo: 0,
  stockAgotado: 0,
  valorTotal: 0,

  setTotalProductos: (num) => set(() => ({ totalProductos: num })),
  setStockBajo: (num) => set(() => ({ stockBajo: num })),
  setStockAgotado: (num) => set(() => ({ stockAgotado: num })),
  setValorTotal: (num) => set(() => ({ valorTotal: num })),
  setProductos: (productos) => set(() => ({ productos })),
  setAllProductos: (productos) => set(() => ({ productos }))
}));

export {
  useStoreTableProductos
}