"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Datos de ejemplo para el reporte de stock
const stockData = [
  {
    id: "1",
    code: "PROD-001",
    name: "Laptop HP Pavilion",
    category: "Electrónicos",
    stock: 15,
    minStock: 5,
    location: "Almacén A",
    costPrice: 750.0,
    sellingPrice: 899.99,
    value: 11250.0,
  },
  {
    id: "2",
    code: "PROD-002",
    name: 'Monitor Dell 27"',
    category: "Periféricos",
    stock: 8,
    minStock: 3,
    location: "Almacén B",
    costPrice: 180.0,
    sellingPrice: 249.99,
    value: 1440.0,
  },
  {
    id: "3",
    code: "PROD-003",
    name: "Teclado Mecánico RGB",
    category: "Periféricos",
    stock: 20,
    minStock: 5,
    location: "Almacén A",
    costPrice: 60.0,
    sellingPrice: 89.99,
    value: 1200.0,
  },
  {
    id: "4",
    code: "PROD-004",
    name: "Mouse Inalámbrico",
    category: "Periféricos",
    stock: 25,
    minStock: 10,
    location: "Almacén A",
    costPrice: 25.0,
    sellingPrice: 39.99,
    value: 625.0,
  },
  {
    id: "5",
    code: "PROD-005",
    name: "Disco SSD 1TB",
    category: "Componentes",
    stock: 12,
    minStock: 5,
    location: "Almacén C",
    costPrice: 95.0,
    sellingPrice: 129.99,
    value: 1140.0,
  },
  {
    id: "6",
    code: "PROD-006",
    name: "Memoria RAM 16GB",
    category: "Componentes",
    stock: 18,
    minStock: 8,
    location: "Almacén C",
    costPrice: 60.0,
    sellingPrice: 79.99,
    value: 1080.0,
  },
  {
    id: "7",
    code: "PROD-007",
    name: "Impresora Láser",
    category: "Oficina",
    stock: 5,
    minStock: 2,
    location: "Almacén B",
    costPrice: 150.0,
    sellingPrice: 199.99,
    value: 750.0,
  },
  {
    id: "8",
    code: "PROD-008",
    name: "Webcam HD",
    category: "Periféricos",
    stock: 10,
    minStock: 5,
    location: "Almacén A",
    costPrice: 40.0,
    sellingPrice: 59.99,
    value: 400.0,
  },
]

export function StockReportTable() {
  // Calcular el valor total del inventario
  const totalValue = stockData.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Producto</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead>Ubicación</TableHead>
              <TableHead className="text-right">Precio Costo</TableHead>
              <TableHead className="text-right">Precio Venta</TableHead>
              <TableHead className="text-right">Valor Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stockData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.code}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{item.category}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <span>{item.stock}</span>
                    {item.stock <= item.minStock && (
                      <Badge variant="destructive" className="text-xs">
                        Bajo
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell className="text-right">${item.costPrice.toFixed(2)}</TableCell>
                <TableCell className="text-right">${item.sellingPrice.toFixed(2)}</TableCell>
                <TableCell className="text-right font-medium">${item.value.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end">
        <div className="rounded-md border px-4 py-2">
          <div className="text-sm text-muted-foreground">Valor Total del Inventario (Costo)</div>
          <div className="text-xl font-bold">${totalValue.toFixed(2)}</div>
        </div>
      </div>
    </div>
  )
}
