import React, { useEffect } from "react";
import TableItems from "./TableItems";
import { getProducts } from "@/api";
import useStore from "@/store";
import type { ProductosType } from "@/type";

const Table = () => {
  // TODO: Implementar la logica para obtener los productos y actualizar el estado de los productos
  const products = getProducts() as ProductosType[]

  const { setProductos, setTotalProductos, setStockAgotado, setStockBajo, setValorTotal } = useStore();

  const countStockAgotado = products.filter((product) => product.cantidad <= 2).length
  const countStockBajo = products.filter((product) => product.cantidad >= 3 && product.cantidad <= 10).length
  const valorTotal = products.reduce((acc, product) => product.cantidad > 0 ? acc + product.cantidad * product.precio : 0, 0);

  useEffect(() => {
    if(!products.length) return;
    setProductos(products);
    setTotalProductos(products.length);
    setStockAgotado(countStockAgotado);
    setStockBajo(countStockBajo);
    setValorTotal(valorTotal);
  }, [])

  return (
    <div className="p-6 pt-0">
      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                Nombre
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                Categoría
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                Cantidad
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                Precio
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                Estado
              </th>
              <th className="h-12 px-4 align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 text-right">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {products.map((product) => (
              <TableItems key={product.nombre} product={product} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;