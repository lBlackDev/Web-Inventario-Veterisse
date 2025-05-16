"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

// Datos de ejemplo para el reporte de bajo stock
const lowStockData = [
  {
    id: "1",
    code: "PROD-007",
    name: "Impresora Láser",
    category: "Oficina",
    stock: 5,
    minStock: 10,
    location: "Almacén B",
    supplier: "HP Inc.",
    lastOrder: "2023-04-15",
    stockPercentage: 50,
  },
  {
    id: "2",
    code: "PROD-002",
    name: 'Monitor Dell 27"',
    category: "Periféricos",
    stock: 3,
    minStock: 8,
    location: "Almacén B",
    supplier: "Dell Technologies",
    lastOrder: "2023-03-22",
    stockPercentage: 37.5,
  },
  {
    id: "3",
    code: "PROD-010",
    name: "Router WiFi",
    category: "Electrónicos",
    stock: 2,
    minStock: 5,
    location: "Almacén A",
    supplier: "TP-Link",
    lastOrder: "2023-05-01",
    stockPercentage: 40,
  },
  {
    id: "4",
    code: "PROD-015",
    name: "Cartucho de Tinta",
    category: "Oficina",
    stock: 4,
    minStock: 15,
    location: "Almacén B",
    supplier: "HP Inc.",
    lastOrder: "2023-04-10",
    stockPercentage: 26.7,
  },
  {
    id: "5",
    code: "PROD-022",
    name: "Cable HDMI 2m",
    category: "Accesorios",
    stock: 6,
    minStock: 20,
    location: "Estantería 1",
    supplier: "Genérico",
    lastOrder: "2023-02-15",
    stockPercentage: 30,
  },
]

export function LowStockReportTable() {
  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Producto</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Stock / Mínimo</TableHead>
              <TableHead>Nivel</TableHead>
              <TableHead>Proveedor</TableHead>
              <TableHead>Última Orden</TableHead>
              <TableHead className="text-right">Acción</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lowStockData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.code}</TableCell>
                <TableCell>
                  <div>
                    <div>{item.name}</div>
                    <div className="text-xs text-muted-foreground">{item.location}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{item.category}</Badge>
                </TableCell>
                <TableCell>
                  <div className="font-medium">
                    {item.stock} / {item.minStock}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="w-[100px]">
                    <Progress
                      value={item.stockPercentage}
                      className="h-2"
                      indicatorClassName={
                        item.stockPercentage < 30
                          ? "bg-destructive"
                          : item.stockPercentage < 50
                            ? "bg-amber-500"
                            : "bg-amber-400"
                      }
                    />
                  </div>
                </TableCell>
                <TableCell>{item.supplier}</TableCell>
                <TableCell>{new Date(item.lastOrder).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="outline">
                    Ordenar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          Mostrando {lowStockData.length} productos con bajo stock de un total de 50 productos.
        </div>
        <Button>Generar Orden de Compra</Button>
      </div>
    </div>
  )
}
