import {create} from 'zustand'

interface useStoreTableProductosProps {
  categoryStore: string,
  setCategoryStore: (categoria: string) => void,
 
  search: string,
  setSearch: (search: string) => void 
}

const useStoreTableProductos = create<useStoreTableProductosProps>((set) => ({
  categoryStore: 'Todos',
  setCategoryStore: (categoryStore: string) => set({ categoryStore }),

  search: '',
  setSearch: (search) => set({ search })
}));

export {
  useStoreTableProductos
}