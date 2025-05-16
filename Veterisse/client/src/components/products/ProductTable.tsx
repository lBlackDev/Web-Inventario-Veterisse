"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ProductsProps } from "@/type"
import { useStoreTableProductos } from "@/store"
import PaginationTable from "../PaginationTable"
import AlertDialogTable from "../AlertDialogTable"

interface ProductTableProps extends ProductsProps {
  filteredProducts: string;
}

export function ProductTable({products, filteredProducts}: ProductTableProps) {
  const [tableProducts, setTableProducts] = useState<ProductsProps["products"]>([])
  const [productsPagination, setProductsPagination] = useState<ProductsProps["products"]>([])

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<string | null>(null)
  const {categoryStore}  = useStoreTableProductos()

  useEffect(() => {
    setTableProducts(products)
  }, [products])

  useEffect(() => {
    filterProductTable()
  }, [categoryStore, filteredProducts])

  const filterProductTable = () => {
    let tableFilterCategory = categoryStore.toLowerCase() != "todos"
    // Solo va ser este filtro cuando cambie de "Todos"
     ? products.filter((product) => 
        product.category.toLowerCase().includes(categoryStore.toLowerCase())
      )
    : products

    tableFilterCategory = tableFilterCategory.filter((product) => {
      const {category, name} = product

      return (
        name.toLowerCase().startsWith(filteredProducts.toLowerCase()) 
        || categoryStore === "Todos" 
        && category.toLowerCase().startsWith(filteredProducts.toLocaleLowerCase())
      )
    })

    console.log(tableFilterCategory)
    setTableProducts(tableFilterCategory)
  }


  const handleDeleteClick = (productId: string) => {
    setProductToDelete(productId)
    setDeleteDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    // TODO Implementar: lógica para eliminar el producto
    console.log(`Eliminando producto con ID: ${productToDelete}`)
    setDeleteDialogOpen(false)
    setProductToDelete(null)
  }

  const handleChangePage = (contentTable: any[]) => {
    setProductsPagination(contentTable)
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead className="hidden md:table-cell">Categoría</TableHead>
              <TableHead className="hidden md:table-cell">Stock</TableHead>
              <TableHead className="hidden md:table-cell">Precio</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productsPagination.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.id}</TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{product.name}</div>
                    <div className="hidden text-sm text-muted-foreground md:block">
                      {product.description.length > 50
                        ? `${product.description.substring(0, 50)}...`
                        : product.description}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant="outline">{product.category}</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex items-center gap-2">
                    <span>{product.stock}</span>
                    {product.stock <= product.minStock && (
                      <Badge variant="destructive" className="text-xs">
                        Bajo
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">${product.price.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Abrir menú</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/products/${product.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver detalles
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/products/${product.id}/edit`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => handleDeleteClick(product.id)}
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <PaginationTable 
        tableData={tableProducts}
        changePage={handleChangePage}
      />

      <AlertDialogTable 
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        description={"Esta acción no se puede deshacer. Esto eliminará permanentemente el producto y todos los datos asociados a él."}
        title={"¿Estás seguro?"}
        cancelText={"Cancelar"}
        actionText={"Eliminar"}
        variant={"destructive"}
      />

    </div>
  )
}
