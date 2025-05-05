import { create } from 'Zustand';
import type { ProductosType } from '@/type';

interface useStoreTableProductosProps {
  categoria: string,
  setCategoria: (categoria: string) => void,
 
  search: string,
  setSearch: (search: string) => void 
}

const useStoreTableProductos = create<useStoreTableProductosProps>((set) => ({
  categoria: 'Todos',
  setCategoria: (categoria: string) => set({ categoria }),

  search: '',
  setSearch: (search) => set({ search })
}));

export {
  useStoreTableProductos
}