"use client"

import { useState } from "react"
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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// Datos de ejemplo para productos
const products = [
  {
    id: "1",
    code: "PROD-001",
    name: "Laptop HP Pavilion",
    description: "Laptop HP Pavilion 15.6 pulgadas, 8GB RAM, 512GB SSD",
    category: "Electrónicos",
    stock: 15,
    minStock: 5,
    price: 899.99,
    costPrice: 750.0,
    unit: "Unidad",
    location: "Almacén A",
    supplier: "HP Inc.",
  },
  {
    id: "2",
    code: "PROD-002",
    name: 'Monitor Dell 27"',
    description: "Monitor Dell 27 pulgadas, Full HD, IPS",
    category: "Periféricos",
    stock: 8,
    minStock: 3,
    price: 249.99,
    costPrice: 180.0,
    unit: "Unidad",
    location: "Almacén B",
    supplier: "Dell Technologies",
  },
  {
    id: "3",
    code: "PROD-003",
    name: "Teclado Mecánico RGB",
    description: "Teclado mecánico con retroiluminación RGB",
    category: "Periféricos",
    stock: 20,
    minStock: 5,
    price: 89.99,
    costPrice: 60.0,
    unit: "Unidad",
    location: "Almacén A",
    supplier: "Logitech",
  },
  {
    id: "4",
    code: "PROD-004",
    name: "Mouse Inalámbrico",
    description: "Mouse inalámbrico ergonómico",
    category: "Periféricos",
    stock: 25,
    minStock: 10,
    price: 39.99,
    costPrice: 25.0,
    unit: "Unidad",
    location: "Almacén A",
    supplier: "Logitech",
  },
  {
    id: "5",
    code: "PROD-005",
    name: "Disco SSD 1TB",
    description: "Disco de estado sólido 1TB SATA",
    category: "Componentes",
    stock: 12,
    minStock: 5,
    price: 129.99,
    costPrice: 95.0,
    unit: "Unidad",
    location: "Almacén C",
    supplier: "Samsung",
  },
  {
    id: "6",
    code: "PROD-006",
    name: "Memoria RAM 16GB",
    description: "Memoria RAM DDR4 16GB 3200MHz",
    category: "Componentes",
    stock: 18,
    minStock: 8,
    price: 79.99,
    costPrice: 60.0,
    unit: "Unidad",
    location: "Almacén C",
    supplier: "Corsair",
  },
  {
    id: "7",
    code: "PROD-007",
    name: "Impresora Láser",
    description: "Impresora láser monocromática",
    category: "Oficina",
    stock: 5,
    minStock: 2,
    price: 199.99,
    costPrice: 150.0,
    unit: "Unidad",
    location: "Almacén B",
    supplier: "HP Inc.",
  },
  {
    id: "8",
    code: "PROD-008",
    name: "Webcam HD",
    description: "Webcam HD 1080p con micrófono",
    category: "Periféricos",
    stock: 10,
    minStock: 5,
    price: 59.99,
    costPrice: 40.0,
    unit: "Unidad",
    location: "Almacén A",
    supplier: "Logitech",
  },
  {
    id: "9",
    code: "PROD-009",
    name: "Auriculares Bluetooth",
    description: "Auriculares Bluetooth con cancelación de ruido",
    category: "Accesorios",
    stock: 15,
    minStock: 5,
    price: 149.99,
    costPrice: 100.0,
    unit: "Unidad",
    location: "Almacén B",
    supplier: "Sony",
  },
  {
    id: "10",
    code: "PROD-010",
    name: "Router WiFi",
    description: "Router WiFi de doble banda",
    category: "Electrónicos",
    stock: 7,
    minStock: 3,
    price: 89.99,
    costPrice: 65.0,
    unit: "Unidad",
    location: "Almacén A",
    supplier: "TP-Link",
  },
]

export function ProductTable() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<string | null>(null)

  const handleDeleteClick = (productId: string) => {
    setProductToDelete(productId)
    setDeleteDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    // Aquí iría la lógica para eliminar el producto
    console.log(`Eliminando producto con ID: ${productToDelete}`)
    setDeleteDialogOpen(false)
    setProductToDelete(null)
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
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.code}</TableCell>
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
                        <Link href={`/dashboard/products/${product.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver detalles
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/products/${product.id}/edit`}>
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

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente el producto y todos los datos asociados a
              él.
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
    </div>
  )
}
