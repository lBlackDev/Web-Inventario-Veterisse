import BotonesCategoria from './BotonesCategoria';
import { useStoreTableProductos } from '@/store';
import useUpdateTableProductos from '@/hook/useUpdateTableProductos';

export const Categoria = () => {
  // TODO: implementar filtro de categorias
  const { handleFilterCategoria, categoria, allProductos } = useUpdateTableProductos();

  const uniqueCategories = ["Todos", ...new Set(allProductos.map((producto) => producto.categoria))];

  const handleCategoria = (categoria: string) => {
    handleFilterCategoria(categoria)
  }
  return (
    <div className="flex items-center justify-between w-full overflow-hidden overflow-x-auto scroll-delgado ">
      <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground bg-gray-100 gap-1">
        {
          uniqueCategories.map((text, i) => {
            return <BotonesCategoria 
                    key={`${i}-${text}-boton`} 
                    text={text} 
                    isActive={text === categoria}
                    handleCategoria={handleCategoria}
                    />
          })
        }
      </div>
    </div>
  );
};

export default Categoria;

