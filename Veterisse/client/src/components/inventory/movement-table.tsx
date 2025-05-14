"use client"

import { ArrowDown, ArrowUp, FileText, Package } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// Datos de ejemplo para movimientos
const movements = [
  {
    id: "1",
    type: "entry",
    date: "2023-05-10T14:30:00",
    product: {
      id: "1",
      name: "Laptop HP Pavilion",
      code: "PROD-001",
    },
    quantity: 10,
    reference: "OC-2023-001",
    supplier: "HP Inc.",
    user: "Admin",
    notes: "Compra inicial",
  },
  {
    id: "2",
    type: "exit",
    date: "2023-05-09T10:15:00",
    product: {
      id: "3",
      name: "Teclado Mecánico RGB",
      code: "PROD-003",
    },
    quantity: 2,
    reference: "FAC-2023-042",
    reason: "Venta",
    client: "Cliente A",
    user: "Admin",
    notes: "Venta a cliente",
  },
  {
    id: "3",
    type: "entry",
    date: "2023-05-08T16:45:00",
    product: {
      id: "5",
      name: "Disco SSD 1TB",
      code: "PROD-005",
    },
    quantity: 15,
    reference: "OC-2023-002",
    supplier: "Samsung",
    user: "Admin",
    notes: "Reposición de stock",
  },
  {
    id: "4",
    type: "exit",
    date: "2023-05-07T09:20:00",
    product: {
      id: "2",
      name: 'Monitor Dell 27"',
      code: "PROD-002",
    },
    quantity: 1,
    reference: "FAC-2023-043",
    reason: "Venta",
    client: "Cliente B",
    user: "Admin",
    notes: "Venta a cliente",
  },
  {
    id: "5",
    type: "adjustment",
    date: "2023-05-06T13:10:00",
    product: {
      id: "4",
      name: "Mouse Inalámbrico",
      code: "PROD-004",
    },
    quantity: -2,
    reference: "AJ-2023-001",
    reason: "Merma",
    user: "Admin",
    notes: "Productos dañados",
  },
  {
    id: "6",
    type: "exit",
    date: "2023-05-05T11:30:00",
    product: {
      id: "3",
      name: "Teclado Mecánico RGB",
      code: "PROD-003",
    },
    quantity: 3,
    reference: "FAC-2023-044",
    reason: "Venta",
    client: "Cliente C",
    user: "Admin",
    notes: "Venta a cliente",
  },
  {
    id: "7",
    type: "entry",
    date: "2023-05-04T15:20:00",
    product: {
      id: "4",
      name: "Mouse Inalámbrico",
      code: "PROD-004",
    },
    quantity: 20,
    reference: "OC-2023-003",
    supplier: "Logitech",
    user: "Admin",
    notes: "Compra a proveedor",
  },
  {
    id: "8",
    type: "exit",
    date: "2023-05-03T10:45:00",
    product: {
      id: "1",
      name: "Laptop HP Pavilion",
      code: "PROD-001",
    },
    quantity: 1,
    reference: "INT-2023-001",
    reason: "Uso interno",
    user: "Admin",
    notes: "Asignación a empleado",
  },
  {
    id: "9",
    type: "adjustment",
    date: "2023-05-02T09:15:00",
    product: {
      id: "5",
      name: "Disco SSD 1TB",
      code: "PROD-005",
    },
    quantity: -1,
    reference: "AJ-2023-002",
    reason: "Merma",
    user: "Admin",
    notes: "Producto defectuoso",
  },
  {
    id: "10",
    type: "entry",
    date: "2023-05-01T14:00:00",
    product: {
      id: "2",
      name: 'Monitor Dell 27"',
      code: "PROD-002",
    },
    quantity: 5,
    reference: "OC-2023-004",
    supplier: "Dell Technologies",
    user: "Admin",
    notes: "Compra a proveedor",
  },
]

// Función para formatear fecha
function formatDate(dateString: string) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("es", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

export function MovementTable() {
  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Producto</TableHead>
              <TableHead>Cantidad</TableHead>
              <TableHead className="hidden md:table-cell">Referencia</TableHead>
              <TableHead className="hidden md:table-cell">Usuario</TableHead>
              <TableHead className="hidden md:table-cell">Notas</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {movements.map((movement) => (
              <TableRow key={movement.id}>
                <TableCell>{formatDate(movement.date)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div
                      className={`rounded-full p-1 ${
                        movement.type === "entry"
                          ? "bg-emerald-100 text-emerald-700"
                          : movement.type === "exit"
                            ? "bg-rose-100 text-rose-700"
                            : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {movement.type === "entry" ? (
                        <ArrowDown className="h-3 w-3" />
                      ) : movement.type === "exit" ? (
                        <ArrowUp className="h-3 w-3" />
                      ) : (
                        <Package className="h-3 w-3" />
                      )}
                    </div>
                    <Badge
                      variant={
                        movement.type === "entry" ? "success" : movement.type === "exit" ? "destructive" : "outline"
                      }
                    >
                      {movement.type === "entry" ? "Entrada" : movement.type === "exit" ? "Salida" : "Ajuste"}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{movement.product.name}</div>
                    <div className="text-xs text-muted-foreground">{movement.product.code}</div>
                  </div>
                </TableCell>
                <TableCell className={movement.quantity < 0 ? "text-destructive" : ""}>
                  {movement.quantity > 0 ? `+${movement.quantity}` : movement.quantity}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div>
                    <div>{movement.reference}</div>
                    {movement.supplier && (
                      <div className="text-xs text-muted-foreground">Prov: {movement.supplier}</div>
                    )}
                    {movement.client && <div className="text-xs text-muted-foreground">Cliente: {movement.client}</div>}
                    {movement.reason && <div className="text-xs text-muted-foreground">Motivo: {movement.reason}</div>}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{movement.user}</TableCell>
                <TableCell className="hidden max-w-[200px] truncate md:table-cell">{movement.notes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" className="hidden md:flex">
          <FileText className="mr-2 h-4 w-4" />
          Exportar
        </Button>

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
      </div>
    </div>
  )
}
