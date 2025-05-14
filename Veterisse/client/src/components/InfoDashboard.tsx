import type { ProductosType } from '@/type';
import React, { useEffect, useState } from 'react';

interface InfoDashboardProps {
  productos: ProductosType[];
}

interface useStateProps {
  totalProductos: {
    stockAgotado: number;
    stockBajo: number;
    stockTotal: number;
    valorTotal: number;
  }
}

const InfoDashboard = ({
  productos
}: InfoDashboardProps) => {
  const [totalProductos, setTotalProductos] = useState<useStateProps["totalProductos"]>();
  const {stockAgotado, stockBajo, stockTotal, valorTotal} = totalProductos || {};

  useEffect(() => {
    if (!productos.length) return;
    setTotalProductos({
      stockAgotado: productos.filter((product: { stock: number }) => product.stock <= 2).length,
      stockBajo: productos.filter((product: { stock: number }) => product.stock >= 3 && product.stock <= 10).length,
      stockTotal: productos.length,
      valorTotal: productos.reduce((acc: number, product: { stock: number; precio: number }) =>
        product.stock > 0 ? acc + product.stock * product.precio : 0, 0
      )
    })
  },[productos]) 

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div
        className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="space-y-1.5 p-6 flex flex-row items-center justify-between pb-2">
          <h3 className="tracking-tight text-sm font-medium">
            Total Productos
          </h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-package h-4 w-4 text-gray-500"
          >
            <path d="m7.5 4.27 9 5.15"></path>
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
            <path d="m3.3 7 8.7 5 8.7-5"></path>
            <path d="M12 22V12"></path>
          </svg>
        </div>
        <div className="p-6 pt-0">
          <div className="text-2xl font-bold">{stockTotal}</div>
          <p className="text-xs text-gray-500">Productos en inventario</p>
        </div>
      </div>

      <div
        className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="space-y-1.5 p-6 flex flex-row items-center justify-between pb-2">
          <h3 className="tracking-tight text-sm font-medium">Bajo Stock</h3>
          <div
            className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors
             focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-amber-500 border-amber-500">
            2
          </div>
        </div>
        <div className="p-6 pt-0">
          <div className="text-2xl font-bold text-amber-500">{stockBajo}</div>
          <p className="text-xs text-gray-500">Productos con stock bajo</p>
        </div>
      </div>

      <div
        className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="space-y-1.5 p-6 flex flex-row items-center justify-between pb-2">
          <h3 className="tracking-tight text-sm font-medium">Sin Stock</h3>
          <div
            className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-red-500 border-red-500">
            1
          </div>
        </div>
        <div className="p-6 pt-0">
          <div className="text-2xl font-bold text-red-500">{stockAgotado}</div>
          <p className="text-xs text-gray-500">Productos agotados</p>
        </div>
      </div>

      <div
        className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="space-y-1.5 p-6 flex flex-row items-center justify-between pb-2">
          <h3 className="tracking-tight text-sm font-medium">Valor Total</h3>
          <div
            className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-teal-600 border-teal-600">
            $
          </div>
        </div>
        <div className="p-6 pt-0">
          <div className="text-2xl font-bold text-teal-600">${valorTotal}</div>
          <p className="text-xs text-gray-500">Valor del inventario</p>
        </div>
      </div>
    </div>
  );
};

export default InfoDashboard;