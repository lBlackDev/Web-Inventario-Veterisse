"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Edit, MoreHorizontal, Package, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CategoryProps } from "@/type"
import { useStoreTableProductos } from "@/store"
import PaginationTable from "../PaginationTable"
import AlertDialogTable from "../AlertDialogTable"

// Datos de ejemplo para categorías

interface CategoryTableProps extends CategoryProps {
}

export function CategoryTable({categories}: CategoryTableProps) {
  const [tableCategories, setTableCategories] = useState<CategoryProps["categories"]>([])
  const [categoriesPagination, setCategoriesPagination] = useState<CategoryProps["categories"]>([])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null)
  const {setCategoryStore} = useStoreTableProductos()

  useEffect(() => {
    setTableCategories(categories)
  }, [categories])

  const handleDeleteClick = (categoryId: string) => {
    setCategoryToDelete(categoryId)
    setDeleteDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    // Aquí iría la lógica para eliminar la categoría
    // TODO Implementar la lógica para eliminar la categoría
    console.log(`Eliminando categoría con ID: ${categoryToDelete}`)
    setDeleteDialogOpen(false)
    setCategoryToDelete(null)
  }

  const handleViewProducts = (category:string) => {
    setCategoryStore(category)
  }

  const handleChangePage = (contentPage: any[]) => {
    setCategoriesPagination(contentPage)
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead className="hidden md:table-cell">Descripción</TableHead>
            <TableHead className="hidden md:table-cell">Productos</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categoriesPagination.map((category) => (
            <TableRow key={`${category.id}-${category.category}`}>
              <TableCell className="font-medium">{category.category}</TableCell>
              <TableCell className="hidden max-w-md truncate md:table-cell">No hay</TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge variant="outline">{category.quantity}</Badge>
              </TableCell>
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
                      <Link href={`/categories/${category.category}/edit`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/products`} onClick={() => handleViewProducts(category.category)}>
                        <Package className="mr-2 h-4 w-4" />
                        Ver Productos
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={() => handleDeleteClick(`${category.id}-${category.category}`)}
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

      <PaginationTable 
        changePage={handleChangePage}
        tableData={tableCategories}
      />

      <AlertDialogTable 
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        title="¿Estás seguro?"
        description=" Esta acción no se puede deshacer. Esto eliminará permanentemente la categoría y podría afectar a los productos asociados a ella."
        actionText="Eliminar"
        variant="destructive"
      />

    </>
  )
}
