import React, { useState } from 'react'
import { useStoreTableProductos } from '@/store'

export default function Header() {
  const [searchProduct, setSearchProduct] = useState<string>('');
  const { setSearch } = useStoreTableProductos()

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchProduct(query)
    setSearch(query)
    console.log('Hay cambio en la busqueda')
  };


  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-white px-4 sm:px-6">
      <div className="w-full flex-1">
          <div className="relative">
            <input className="flex h-10 rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full bg-white pl-8 md:w-2/3 lg:w-1/3" placeholder="Buscar productos..." type="text" value={searchProduct} onChange={handleSearch}/>
          </div>
      </div>
    </header>
  )
}
