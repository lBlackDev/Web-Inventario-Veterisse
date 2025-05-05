interface Product {
  nombre: string;
  categoria: string;
  stock: number;
  precio: number;
}

interface TableItemsProps {
  product: Product;
}

const TableItems: React.FC<TableItemsProps> = ({ product }) => {
  const { nombre, categoria, stock, precio } = product;

  const cantidad = 
    stock <= 2 ? "text-red-500 border-red-500" 
    : stock > 2 && stock <= 10 ? "text-amber-500 border-amber-500" 
    : stock > 10 ? "text-green-500 border-green-500" 
    : "text-black";

  return (
    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium">{nombre}</td>
      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">{categoria}</td>
      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">{stock}</td>
      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">${precio}</td>
      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
        <div 
          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold 
          transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${cantidad}`}>
          En stock
        </div>
      </td>
      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-right">
        <div className="flex justify-end gap-2">
          <button
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-10 w-10"
            type="button"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="radix-«r9»"
            data-state="closed">
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
              className="lucide lucide-square-pen h-4 w-4">
              <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"></path>
            </svg>
            <span className="sr-only">Editar</span>
          </button>
          <button
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-10 w-10">
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
              className="lucide lucide-trash2 h-4 w-4 text-red-500">
              <path d="M3 6h18"></path>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              <line x1="10" x2="10" y1="11" y2="17"></line>
              <line x1="14" x2="14" y1="11" y2="17"></line>
            </svg>
            <span className="sr-only">Eliminar</span>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TableItems;