import React, { useEffect, useState } from "react";
import TableItems from "./TableItems";
import { getProducts } from "@/api";
import Spinner from "./Spinner";
import useUpdateTableProductos from "@/hook/useUpdateTableProductos";

const Table = () => {
  const { productos, setProductos } = useUpdateTableProductos()
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  // TODO: Implementar la logica para obtener los productos y actualizar el estado de los productos

  useEffect(() => {
    getProducts()
      .then((res) => {
        setProductos(res)
      })
  }, [])


  // Cálculos para la paginación
  const totalPages = Math.ceil(productos.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productos.slice(indexOfFirstItem, indexOfLastItem);

  // Función para cambiar la página
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Función para cambiar items por página
  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Resetear a primera página cuando cambia items por página
  };

  const handleTable = currentItems.map((product) => (
    <TableItems key={product.nombre} product={product} />
  ));

  return (
    <div className="p-6 pt-0">
      <div className="relative w-full overflow-auto min-h-40 flex justify-center items-center">
        {productos.length > 0 ? (
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
              {handleTable}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={6} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-700">
                        Mostrar
                      </span>
                      <select
                        aria-label="Items per page"
                        value={itemsPerPage}
                        onChange={handleItemsPerPageChange}
                        className="h-8 w-16 rounded-md border border-input bg-background px-2"
                      >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-700 not-md:sr-only">
                        Página {currentPage} de {totalPages} | 
                        Mostrando {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, productos.length)} de {productos.length}
                      </span>
                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={() => handlePageChange(1)}
                          disabled={currentPage === 1}
                          className="h-8 w-8 rounded-md border border-input bg-background disabled:opacity-50"
                        >
                          {"<<"}
                        </button>
                        <button
                          type="button"
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="h-8 w-8 rounded-md border border-input bg-background disabled:opacity-50"
                        >
                          {"<"}
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                          .filter(page => 
                            page === 1 || 
                            page === totalPages || 
                            (page >= currentPage - 1 && page <= currentPage + 1)
                          )
                          .map((page, index, array) => (
                            <React.Fragment key={page}>
                              {index > 0 && array[index - 1] !== page - 1 && (
                                <span className="px-2">...</span>
                              )}
                              <button
                                type="button"
                                onClick={() => handlePageChange(page)}
                                className={`h-8 w-8 rounded-md border ${
                                  currentPage === page
                                    ? "bg-teal-600 text-white hover:bg-teal-700"
                                    : "border-input bg-background hover:bg-muted"
                                }`}
                              >
                                {page}
                              </button>
                            </React.Fragment>
                          ))}
                        <button
                          type="button"
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="h-8 w-8 rounded-md border border-input bg-background disabled:opacity-50"
                        >
                          {">"}
                        </button>
                        <button
                          type="button"
                          onClick={() => handlePageChange(totalPages)}
                          disabled={currentPage === totalPages}
                          className="h-8 w-8 rounded-md border border-input bg-background disabled:opacity-50"
                        >
                          {">>"}
                        </button>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default Table;