import React from 'react';
import BotonesCategoria from './BotonesCategoria';
import useStore from '@/store';

export const Categoria = () => {
  // TODO: implementar filtro de categorias
  const { productos } = useStore();

  const uniqueCategories = [...new Set(productos.map((producto) => producto.categoria))];

  return (
    <div className="flex items-center justify-between">
      <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
        <BotonesCategoria text="Todos" />
        {
          uniqueCategories.map((producto, i) => {
            return <BotonesCategoria key={`${i}-${producto}-boton`} text={producto} />
          })
        }
      </div>
    </div>
  );
};

export default Categoria;

