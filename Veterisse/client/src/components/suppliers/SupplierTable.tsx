"use client"

import { useState } from "react"
import Link from "next/link"
import { Edit, Mail, MoreHorizontal, Phone, Trash } from "lucide-react"
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
import PaginationTable from "../PaginationTable"
import AlertDialogTable from "../AlertDialogTable"

// TODO Cambiar por datos del backend
const suppliers = [
  {
    id: "1",
    name: "HP Inc.",
    contactName: "Carlos Rodríguez",
    address: "Av. Principal 123, Ciudad Tecnológica",
    phone: "+1 (555) 123-4567",
    email: "ventas@hp-example.com",
    productsCount: 15,
  },
  {
    id: "2",
    name: "Dell Technologies",
    contactName: "María González",
    address: "Calle Innovación 456, Parque Industrial",
    phone: "+1 (555) 234-5678",
    email: "ventas@dell-example.com",
    productsCount: 12,
  },
  {
    id: "3",
    name: "Logitech",
    contactName: "Juan Pérez",
    address: "Blvd. Periférico 789, Zona Comercial",
    phone: "+1 (555) 345-6789",
    email: "distribuidores@logitech-example.com",
    productsCount: 20,
  },
  {
    id: "4",
    name: "Samsung",
    contactName: "Ana Martínez",
    address: "Plaza Central 234, Distrito Financiero",
    phone: "+1 (555) 456-7890",
    email: "ventas@samsung-example.com",
    productsCount: 18,
  },
  {
    id: "5",
    name: "Corsair",
    contactName: "Roberto Sánchez",
    address: "Av. Tecnología 567, Parque Empresarial",
    phone: "+1 (555) 567-8901",
    email: "distribuidores@corsair-example.com",
    productsCount: 8,
  },
  {
    id: "6",
    name: "Sony",
    contactName: "Laura Díaz",
    address: "Calle Principal 890, Centro Corporativo",
    phone: "+1 (555) 678-9012",
    email: "ventas@sony-example.com",
    productsCount: 10,
  },
  {
    id: "7",
    name: "TP-Link",
    contactName: "Miguel Hernández",
    address: "Av. Conectividad 123, Zona Industrial",
    phone: "+1 (555) 789-0123",
    email: "distribuidores@tplink-example.com",
    productsCount: 6,
  },
]

export function SupplierTable() {
  const [supplierPagination, setSupplierPagination] = useState(suppliers)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [supplierToDelete, setSupplierToDelete] = useState<string | null>(null)

  const handleDeleteClick = (supplierId: string) => {
    setSupplierToDelete(supplierId)
    setDeleteDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    // Aquí iría la lógica para eliminar el proveedor
    console.log(`Eliminando proveedor con ID: ${supplierToDelete}`)
    setDeleteDialogOpen(false)
    setSupplierToDelete(null)
  }

  const handleChangePage = (contentPage: any[]) => {
    setSupplierPagination(contentPage)
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead className="hidden md:table-cell">Contacto</TableHead>
            <TableHead className="hidden md:table-cell">Teléfono / Email</TableHead>
            <TableHead className="hidden md:table-cell">Productos</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {supplierPagination.map((supplier) => (
            <TableRow key={supplier.id}>
              <TableCell className="font-medium">
                <div>
                  <div>{supplier.name}</div>
                  <div className="text-xs text-muted-foreground md:hidden">{supplier.contactName}</div>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <div>
                  <div>{supplier.contactName}</div>
                  <div className="text-xs text-muted-foreground truncate max-w-[250px]">{supplier.address}</div>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center">
                    <Phone className="mr-2 h-3 w-3 text-muted-foreground" />
                    <span>{supplier.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="mr-2 h-3 w-3 text-muted-foreground" />
                    <span>{supplier.email}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge variant="outline">{supplier.productsCount}</Badge>
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
                      <Link href={`/suppliers/${supplier.id}/edit`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={() => handleDeleteClick(supplier.id)}
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
        tableData={suppliers}
        changePage={handleChangePage}
      />

      <AlertDialogTable 
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="¿Estás seguro?"
        description="Esta acción no se puede deshacer. Esto eliminará permanentemente el proveedor y podría afectar a los productos asociados a él."
        actionText="Eliminar"
        variant="destructive"
        onConfirm={handleConfirmDelete}
      />

    </>
  )
}
