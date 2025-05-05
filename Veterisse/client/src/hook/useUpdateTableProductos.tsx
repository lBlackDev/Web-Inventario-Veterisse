import React, { useEffect, useState } from 'react'
import {useStoreTableProductos} from '@/store';
import type { ProductosType } from '@/type';

export default function useUpdateTableProductos() {
  const [categoriaActual, setCategoriaActual] = useState<string>('Todos');
  const { productos, setProductos, setTotalProductos, setStockAgotado, setStockBajo, setValorTotal, setAllProductos, allProductos } = useStoreTableProductos();

  const countStockAgotado = productos.filter((product) => product.cantidad <= 2).length
  const countStockBajo = productos.filter((product) => product.cantidad >= 3 && product.cantidad <= 10).length
  const valorTotal = productos.reduce((acc, product) => product.cantidad > 0 ? acc + product.cantidad * product.precio : 0, 0);

  useEffect(() => {
    if (!productos.length) return;
    setTotalProductos(productos.length);
    setStockAgotado(countStockAgotado);
    setStockBajo(countStockBajo);
    setValorTotal(valorTotal);
  }, [productos])

  const handleSetProductos = (products: ProductosType[]) => {
    setProductos(products);
    setAllProductos(products);
  } 

  const handleFilterCategoria = (categoria: string) => {
    if (categoria === 'Todos') {
      setProductos(productos);
      setCategoriaActual(categoria);
      return;
    }
    const filteredProductos = productos.filter((product) => product.categoria === categoria);
    console.log(filteredProductos)
    setProductos(filteredProductos);
    setCategoriaActual(categoria);
  }

  return { categoria: categoriaActual, productos, setProductos: handleSetProductos, handleFilterCategoria, allProductos }
}
