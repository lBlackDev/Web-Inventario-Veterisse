import { AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ProductsProps } from "@/type"

// Datos de ejemplo para productos con bajo stock

interface InventorySumaryProps extends ProductsProps {
}

export function InventorySummary({products}: InventorySumaryProps) {

  const lowStockProducts = products.filter((product) => product.stock < 10 )

  console.log(products)


  // TODO Implemnentar: Respuesta al no tener stock bajos
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-1">
          <CardTitle>Productos con Bajo Stock</CardTitle>
          <CardDescription>Productos que necesitan reabastecimiento pronto</CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-1 rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-600">
          <AlertCircle className="h-3.5 w-3.5" />
          <span>{lowStockProducts.length} productos</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {lowStockProducts.slice(0, 5).map((product) => {
            const minStock = 10
            return (
            <div key={product.id} className="grid gap-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{product.name}</div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {product.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">Stock mínimo: {minStock}</span>
                  </div>
                </div>
                <div className="font-medium">{product.stock} unidades</div>
              </div>
              <Progress
                value={(product.stock / minStock) * 100}
                className="h-2 "
                indicatorClassName={
                  product.stock < minStock * 0.3
                    ? "bg-destructive"
                    : product.stock < minStock * 0.6
                      ? "bg-amber-500"
                      : "bg-amber-400"
                }
              />
            </div>
          )})}
        </div>
      </CardContent>
    </Card>
  )
}
