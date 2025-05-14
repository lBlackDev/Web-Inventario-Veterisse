import Link from "next/link"
import { ArrowDown, ArrowUp, Package, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"

// Datos de ejemplo para movimientos recientes
const recentMovements = [
  {
    id: 1,
    type: "entrada",
    description: "Compra de productos",
    date: "2023-05-10T14:30:00",
    quantity: 50,
    products: ["Laptop HP Pavilion", 'Monitor Dell 27"'],
    reference: "OC-2023-001",
  },
  {
    id: 2,
    type: "salida",
    description: "Venta a cliente",
    date: "2023-05-09T10:15:00",
    quantity: 3,
    products: ["Teclado Mecánico RGB", "Mouse Inalámbrico"],
    reference: "FAC-2023-042",
  },
  {
    id: 3,
    type: "ajuste",
    description: "Ajuste de inventario",
    date: "2023-05-08T16:45:00",
    quantity: -2,
    products: ["Disco SSD 1TB"],
    reference: "AJ-2023-007",
  },
  {
    id: 4,
    type: "entrada",
    description: "Devolución de cliente",
    date: "2023-05-07T09:20:00",
    quantity: 1,
    products: ['Monitor Dell 27"'],
    reference: "DEV-2023-003",
  },
  {
    id: 5,
    type: "salida",
    description: "Venta a cliente",
    date: "2023-05-06T13:10:00",
    quantity: 5,
    products: ["Disco SSD 1TB", "Memoria RAM 16GB"],
    reference: "FAC-2023-041",
  },
]

// Función para formatear fecha


export function RecentMovements() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-1">
          <CardTitle>Movimientos Recientes</CardTitle>
          <CardDescription>Últimos movimientos de inventario registrados</CardDescription>
        </div>
        <Link href="/dashboard/inventory" className="ml-auto">
          <Button variant="outline" size="sm" className="ml-auto">
            <FileText className="mr-2 h-4 w-4" />
            Ver todos
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentMovements.map((movement) => (
            <div key={movement.id} className="flex items-start gap-4">
              <div
                className={`rounded-full p-2 ${
                  movement.type === "entrada"
                    ? "bg-emerald-100 text-emerald-700"
                    : movement.type === "salida"
                      ? "bg-rose-100 text-rose-700"
                      : "bg-amber-100 text-amber-700"
                }`}
              >
                {movement.type === "entrada" ? (
                  <ArrowDown className="h-4 w-4" />
                ) : movement.type === "salida" ? (
                  <ArrowUp className="h-4 w-4" />
                ) : (
                  <Package className="h-4 w-4" />
                )}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{movement.description}</p>
                  <Badge
                    variant={
                      movement.type === "entrada" ? "default" : movement.type === "salida" ? "destructive" : "outline"
                    }
                  >
                    {movement.type === "entrada" ? "Entrada" : movement.type === "salida" ? "Salida" : "Ajuste"}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  <span>Ref: {movement.reference}</span>
                  <span className="mx-2">•</span>
                  <span>Cantidad: {movement.quantity}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  <span>Productos: {movement.products.join(", ")}</span>
                </div>
                <div className="text-xs text-muted-foreground">{formatDate(movement.date)}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
