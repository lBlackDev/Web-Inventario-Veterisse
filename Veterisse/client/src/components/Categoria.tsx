import BotonesCategoria from './BotonesCategoria';
import { useStoreTableProductos } from '@/store';
import type { ProductosType } from '@/type';

interface CategoriaProps {
  inicialProductos: ProductosType[];
}

export const Categoria = ({inicialProductos}:CategoriaProps) => {
  // TODO: implementar filtro de categorias
  const { categoria, setCategoria } = useStoreTableProductos();

  const uniqueCategories = inicialProductos.length > 0 && ["Todos", ...new Set(inicialProductos.map((producto) => producto.categoria))];

  const handleCategoria = (categoria: string) => {
    setCategoria(categoria)
  }
  return (
    <div className="flex items-center justify-between w-full overflow-hidden overflow-x-auto scroll-delgado ">
      <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground bg-gray-100 gap-1">
        {
          uniqueCategories ?
          uniqueCategories.map((text, i) => {
            return <BotonesCategoria 
                    key={`${i}-${text}-boton`} 
                    text={text} 
                    isActive={text === categoria}
                    handleCategoria={handleCategoria}
                    />
          })
          : <div className="text-gray-500">No hay categorias</div>
        }
      </div>
    </div>
  );
};

export default Categoria;

