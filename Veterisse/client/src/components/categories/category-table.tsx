"use client"

import { useState } from "react"
import Link from "next/link"
import { Edit, MoreHorizontal, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"

// Datos de ejemplo para categorías
const categories = [
  {
    id: "1",
    name: "Electrónicos",
    description: "Productos electrónicos como laptops, tablets y smartphones",
    productsCount: 15,
  },
  {
    id: "2",
    name: "Periféricos",
    description: "Accesorios para computadoras como teclados, mouse y monitores",
    productsCount: 12,
  },
  {
    id: "3",
    name: "Componentes",
    description: "Componentes internos para computadoras como discos duros, memorias y procesadores",
    productsCount: 8,
  },
  {
    id: "4",
    name: "Accesorios",
    description: "Accesorios varios como cables, adaptadores y fundas",
    productsCount: 20,
  },
  {
    id: "5",
    name: "Oficina",
    description: "Productos para oficina como impresoras, escáneres y proyectores",
    productsCount: 6,
  },
  {
    id: "6",
    name: "Redes",
    description: "Equipos de redes como routers, switches y access points",
    productsCount: 5,
  },
  {
    id: "7",
    name: "Audio",
    description: "Equipos de audio como auriculares, parlantes y micrófonos",
    productsCount: 10,
  },
]

export function CategoryTable() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null)

  const handleDeleteClick = (categoryId: string) => {
    setCategoryToDelete(categoryId)
    setDeleteDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    // Aquí iría la lógica para eliminar la categoría
    console.log(`Eliminando categoría con ID: ${categoryToDelete}`)
    setDeleteDialogOpen(false)
    setCategoryToDelete(null)
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
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell className="hidden max-w-md truncate md:table-cell">{category.description}</TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge variant="outline">{category.productsCount}</Badge>
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
                      <Link href={`/dashboard/categories/${category.id}/edit`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={() => handleDeleteClick(category.id)}
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

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente la categoría y podría afectar a los
              productos asociados a ella.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
