"use client"

import { useState } from "react"
import { Calendar, DollarSign, Package, Tag } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Tipo para el producto
interface Product {
  id: string
  code: string
  name: string
  description: string
  category: string
  stock: number
  minStock: number
  price: number
  costPrice: number
  unit: string
  location: string
  supplier: string
  taxable: boolean
  active: boolean
  createdAt: string
  updatedAt: string
}

// Datos de ejemplo para movimientos
const movements = [
  {
    id: "1",
    type: "entrada",
    quantity: 10,
    date: "2023-04-20T14:45:00",
    reference: "OC-2023-001",
    notes: "Compra inicial",
  },
  {
    id: "2",
    type: "salida",
    quantity: 2,
    date: "2023-04-25T09:30:00",
    reference: "FAC-2023-042",
    notes: "Venta a cliente",
  },
  {
    id: "3",
    type: "entrada",
    quantity: 5,
    date: "2023-05-05T11:20:00",
    reference: "OC-2023-008",
    notes: "Reposición de stock",
  },
  {
    id: "4",
    type: "salida",
    quantity: 3,
    date: "2023-05-10T16:15:00",
    reference: "FAC-2023-056",
    notes: "Venta a cliente",
  },
  {
    id: "5",
    type: "ajuste",
    quantity: -1,
    date: "2023-05-12T10:00:00",
    reference: "AJ-2023-002",
    notes: "Producto dañado",
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

export function ProductDetails({ product }: { product: Product }) {
  const [activeTab, setActiveTab] = useState("general")

  return (
    <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList>
        <TabsTrigger value="general">Información General</TabsTrigger>
        <TabsTrigger value="inventory">Inventario</TabsTrigger>
        <TabsTrigger value="movements">Movimientos</TabsTrigger>
      </TabsList>

      <TabsContent value="general" className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Detalles Básicos</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Código</dt>
                  <dd className="text-sm font-semibold">{product.code}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Nombre</dt>
                  <dd className="text-sm font-semibold">{product.name}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-sm font-medium text-muted-foreground">Descripción</dt>
                  <dd className="text-sm">{product.description}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Categoría</dt>
                  <dd className="text-sm">
                    <Badge variant="outline">{product.category}</Badge>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Unidad de Medida</dt>
                  <dd className="text-sm">{product.unit}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Estado</dt>
                  <dd className="text-sm">
                    <Badge variant={product.active ? "default" : "secondary"}>
                      {product.active ? "Activo" : "Inactivo"}
                    </Badge>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Impuestos</dt>
                  <dd className="text-sm">{product.taxable ? "Sujeto a impuestos" : "Exento de impuestos"}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Precios y Stock</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 flex items-center gap-2 rounded-lg border p-3">
                  <div className="rounded-full bg-primary/10 p-2 text-primary">
                    <Package className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Stock Actual</p>
                    <p className="text-2xl font-bold">
                      {product.stock} {product.unit}
                    </p>
                  </div>
                  {product.stock <= product.minStock && (
                    <Badge variant="destructive" className="ml-auto">
                      Bajo Stock
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-2 rounded-lg border p-3">
                  <div className="rounded-full bg-primary/10 p-2 text-primary">
                    <DollarSign className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Precio de Venta</p>
                    <p className="text-xl font-bold">${product.price.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-lg border p-3">
                  <div className="rounded-full bg-primary/10 p-2 text-primary">
                    <Tag className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Precio de Compra</p>
                    <p className="text-xl font-bold">${product.costPrice.toFixed(2)}</p>
                  </div>
                </div>

                <div className="col-span-2">
                  <Separator className="my-2" />
                  <dl className="grid grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Stock Mínimo</dt>
                      <dd className="text-sm">
                        {product.minStock} {product.unit}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Ubicación</dt>
                      <dd className="text-sm">{product.location || "No especificada"}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Proveedor</dt>
                      <dd className="text-sm">{product.supplier || "No especificado"}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Margen</dt>
                      <dd className="text-sm">
                        {product.costPrice > 0
                          ? `${(((product.price - product.costPrice) / product.costPrice) * 100).toFixed(2)}%`
                          : "N/A"}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Información Adicional</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-primary/10 p-2 text-primary">
                  <Calendar className="h-4 w-4" />
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Fecha de Creación</dt>
                  <dd className="text-sm">{formatDate(product.createdAt)}</dd>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-primary/10 p-2 text-primary">
                  <Calendar className="h-4 w-4" />
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Última Actualización</dt>
                  <dd className="text-sm">{formatDate(product.updatedAt)}</dd>
                </div>
              </div>
            </dl>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="inventory" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Historial de Stock</CardTitle>
            <CardDescription>Evolución del stock a lo largo del tiempo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full rounded-md border p-4">
              <div className="flex h-full items-center justify-center">
                <p className="text-muted-foreground">Gráfico de evolución de stock (pendiente de implementar)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="movements" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Movimientos del Producto</CardTitle>
            <CardDescription>Historial de entradas, salidas y ajustes</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Cantidad</TableHead>
                  <TableHead>Referencia</TableHead>
                  <TableHead>Notas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {movements.map((movement) => (
                  <TableRow key={movement.id}>
                    <TableCell>{formatDate(movement.date)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          movement.type === "entrada"
                            ? "success"
                            : movement.type === "salida"
                              ? "destructive"
                              : "outline"
                        }
                      >
                        {movement.type === "entrada" ? "Entrada" : movement.type === "salida" ? "Salida" : "Ajuste"}
                      </Badge>
                    </TableCell>
                    <TableCell className={movement.quantity < 0 ? "text-destructive" : ""}>
                      {movement.quantity > 0 ? `+${movement.quantity}` : movement.quantity}
                    </TableCell>
                    <TableCell>{movement.reference}</TableCell>
                    <TableCell>{movement.notes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
